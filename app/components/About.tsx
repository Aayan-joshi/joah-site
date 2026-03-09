import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, BookOpen } from "lucide-react";

const COURSES = [
  {
    title: "Web Design and Development",
    org: "Broadway Infosys",
    period: "Jan 2019 – Aug 2024",
  },
  {
    title: "AI Training – ANAIS 5th Edition",
    org: "NAAMII AI School",
    period: "Dec 2024 – Jan 2025",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 animate-fade-in-up">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto animate-fade-in-up delay-100">
          A quick look at who I am, my education, and training.
        </p>

        {/* Objective */}
        <Card className="mb-12 bg-card/60 border-border/40 animate-fade-in-up delay-200">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-foreground/90">
              Tech-savvy and reliable Computer Science undergraduate with strong
              interpersonal and problem-solving skills. Experienced in
              troubleshooting software/hardware issues, guiding users with
              technology use, and maintaining digital equipment. Known for
              delivering helpful, courteous customer service in both individual
              and team settings.
            </p>
          </CardContent>
        </Card>

        {/* Education & Courses grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <Card className="bg-card/60 border-border/40 animate-fade-in-up delay-300">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Education</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-foreground">
                Bachelor&apos;s of Science in Computer Science
              </h4>
              <p className="text-muted-foreground mt-1">
                The University of Texas at Arlington
              </p>
              <Badge variant="secondary" className="mt-3">
                Expected August 2029
              </Badge>
            </CardContent>
          </Card>

          {/* Courses */}
          <Card className="bg-card/60 border-border/40 animate-fade-in-up delay-400">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Training & Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {COURSES.map((c, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-foreground">{c.title}</h4>
                  <p className="text-sm text-muted-foreground">{c.org}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">
                    {c.period}
                  </p>
                  {i < COURSES.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}