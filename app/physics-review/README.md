# Physics review route

The route uses the existing admin session. Set explicit `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and a `JWT_SECRET` of at least 32 characters in the deployment environment. Visit `/admin` to sign in, then open `/physics-review`.

For shared progress, configure these server-only variables:

- `PHYSICS_NOTION_PAGE_ID` identifies the existing private review tracker page.
- `PHYSICS_NOTION_TOKEN` is a Notion connection token with read and update content capabilities. Connect it to the tracker page. Keep the token in the hosting secret store.

The tracker page has one to-do for each date, titled with the date followed by ` · `, and separate paragraphs in the form `Diagnostic score · ___ / 8` and `Mock score · ___ / 16`. The website reads and updates those blocks. Mistake notes and flashcard ratings stay in the browser.

Before promoting a deployment, verify that a signed-out request to each route returns 401, that a signed-in request shows the review, and that toggling a session or completing a quiz updates its corresponding Notion block. The private tracker links to the original review PDFs.
