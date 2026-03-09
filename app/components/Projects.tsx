import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Cpu, Rocket } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "This very site! Built with Next.js, Tailwind CSS, and shadcn/ui to showcase my work, skills, and experience in a modern, responsive design.",
    tags: ["Next.js", "Tailwind", "shadcn/ui", "TypeScript"],
    icon: <Globe className="h-5 w-5" />,
  },
  {
    title: "Custom Macropad Firmware",
    description:
      "Designed and programmed custom firmware for a 4×4 matrix macropad using Arduino, featuring configurable key mappings and layer support.",
    tags: ["Arduino", "C++", "Hardware", "Firmware"],
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    title: "More Coming Soon",
    description:
      "I'm always building and experimenting with new ideas. Stay tuned for more projects as I continue my CS journey at UT Arlington!",
    tags: ["Ideas", "In Progress"],
    icon: <Rocket className="h-5 w-5" />,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-card/30">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 animate-fade-in-up">
          <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Things I&apos;ve built and am working on.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <Card
              key={p.title}
              className="bg-card/60 border-border/40 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 animate-fade-in-up"
              style={{ animationDelay: `${0.15 * i + 0.2}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {p.icon}
                  </div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                {p.link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}