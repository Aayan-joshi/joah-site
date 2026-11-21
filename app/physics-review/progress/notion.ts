type RichText = { type: string; plain_text: string };
type Block = {
  id: string;
  type: string;
  to_do?: { rich_text: RichText[]; checked: boolean };
  paragraph?: { rich_text: RichText[] };
};
type BlockList = { results: Block[]; next_cursor: string | null };
export const scoreSpecs = {
  diagnostic: { title: "Diagnostic score", total: 8 },
  mock: { title: "Mock score", total: 16 },
} as const;
export type ScoreKind = keyof typeof scoreSpecs;
export type ProgressChange =
  | { day: string; checked: boolean }
  | { kind: ScoreKind; score: number };

const dates = [
  ...Array.from({ length: 10 }, (_, i) => [`11-${i + 21}`, `Nov ${i + 21}`] as const),
  ...Array.from({ length: 8 }, (_, i) => [`12-0${i + 1}`, `Dec ${i + 1}`] as const),
];
const isId = (value: string) =>
  /^(?:[a-f0-9]{32}|[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})$/i.test(value);
const plain = (items: RichText[]) => items.map((item) => item.plain_text).join("");

export function configuration() {
  const page = process.env.PHYSICS_NOTION_PAGE_ID;
  const token = process.env.PHYSICS_NOTION_TOKEN;
  return page && token && isId(page) ? { page, token } : null;
}
type Configuration = NonNullable<ReturnType<typeof configuration>>;

export function parseChange(value: unknown): ProgressChange | null {
  if (!value || typeof value !== "object") return null;
  if ("day" in value && "checked" in value && typeof value.checked === "boolean") {
    const day = dates.find(([date]) => date === value.day)?.[0];
    return day ? { day, checked: value.checked } : null;
  }
  if ("kind" in value && "score" in value &&
      (value.kind === "diagnostic" || value.kind === "mock") &&
      typeof value.score === "number" && Number.isInteger(value.score) &&
      value.score >= 0 && value.score <= scoreSpecs[value.kind].total) {
    return { kind: value.kind, score: value.score };
  }
  return null;
}

async function notion<T>(config: Configuration, path: string, patch?: object): Promise<T> {
  const result = await fetch(`https://api.notion.com/v1/blocks/${path}`, {
    cache: "no-store",
    method: patch ? "PATCH" : "GET",
    headers: {
      "Authorization": `Bearer ${config.token}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json",
    },
    body: patch ? JSON.stringify(patch) : undefined,
    signal: AbortSignal.timeout(8000),
  });
  if (!result.ok) throw new Error("Notion progress request failed");
  return result.json() as Promise<T>;
}

async function tracker(config: Configuration) {
  const blocks: Block[] = [];
  let cursor: string | null = null;
  do {
    const params = new URLSearchParams({ page_size: "100" });
    if (cursor) params.set("start_cursor", cursor);
    const list = await notion<BlockList>(config, `${config.page}/children?${params}`);
    blocks.push(...list.results);
    cursor = list.next_cursor;
  } while (cursor);

  const days = new Map<string, Block>();
  for (const block of blocks) {
    if (!block.to_do || !isId(block.id)) continue;
    const title = plain(block.to_do.rich_text);
    const day = dates.find(([, label]) => title.startsWith(`${label} · `))?.[0];
    if (day) days.set(day, block);
  }
  const scores = Object.fromEntries(
    (Object.keys(scoreSpecs) as ScoreKind[]).map((kind) => {
      const { title, total } = scoreSpecs[kind];
      const pattern = new RegExp(`^${title} · (___|[0-9]+) / ${total}$`);
      const block = blocks.find((item) =>
        item.paragraph && isId(item.id) && pattern.test(plain(item.paragraph.rich_text))
      );
      const value = block?.paragraph && plain(block.paragraph.rich_text).match(pattern)?.[1];
      return [kind, { block, value: value && value !== "___" ? Number(value) : null }];
    })
  ) as Record<ScoreKind, { block?: Block; value: number | null }>;
  if (days.size !== dates.length || !scores.diagnostic.block || !scores.mock.block) {
    throw new Error("The progress tracker does not match its expected layout");
  }
  return { days, scores };
}

export async function readProgress(config: Configuration) {
  const { days, scores } = await tracker(config);
  return {
    days: Object.fromEntries(Array.from(days, ([day, block]) => [day, block.to_do?.checked ?? false])),
    scores: { diagnostic: scores.diagnostic.value, mock: scores.mock.value },
    trackerUrl: `https://www.notion.so/${config.page.replaceAll("-", "")}`,
  };
}

export async function writeProgress(config: Configuration, change: ProgressChange) {
  const { days, scores } = await tracker(config);
  if ("day" in change) {
    const block = days.get(change.day);
    if (!block?.to_do) throw new Error("Session checkbox is missing");
    if (block.to_do.checked === change.checked) return;
    await notion(config, block.id, { to_do: { checked: change.checked } });
    return;
  }
  const row = scores[change.kind];
  if (!row.block) throw new Error("Score entry is missing");
  if (row.value === change.score) return;
  const { title, total } = scoreSpecs[change.kind];
  await notion(config, row.block.id, {
    paragraph: {
      rich_text: [
        { type: "text", text: { content: title }, annotations: { bold: true } },
        { type: "text", text: { content: ` · ${change.score} / ${total}` } },
      ],
    },
  });
}
