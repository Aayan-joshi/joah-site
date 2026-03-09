import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Code } from "lucide-react";

const SOFT_SKILLS = [
  "Communication",
  "Teamwork",
  "Critical Thinking",
  "Adaptability",
  "Leadership",
  "Time Management",
  "Creativity",
  "Responsibility",
  "Conflict Resolution",
  "Networking",
];

const TECH_SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TailwindCSS",
  "C",
  "Java",
  "Python",
  "Windows",
  "macOS",
  "Linux",
  "Microsoft Office",
  "Adobe Creative Suite",
  "Excel",
  "Hardware Troubleshooting",
  "Software Troubleshooting",
  "Microsoft Teams",
  "Time Clock Plus",
  "Autodesk Fusion",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 animate-fade-in-up">
          <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto animate-fade-in-up delay-100">
          What I bring to the table.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Soft Skills */}
          <Card className="bg-card/60 border-border/40 animate-fade-in-up delay-200">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lightbulb className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Soft Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="px-3 py-1 text-sm hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Skills */}
          <Card className="bg-card/60 border-border/40 animate-fade-in-up delay-300">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Code className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Technical Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {TECH_SKILLS.map((s) => (
                  <Badge
                    key={s}
                    variant="outline"
                    className="px-3 py-1 text-sm hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                  >
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}