import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

interface Experience {
  role: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  tags?: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Peer Tutoring Leader",
    org: "Academic Success Center, University of Texas at Arlington",
    location: "Arlington, TX",
    period: "January 2026 – Present",
    bullets: [
      "Led weekly study sessions for groups of students to solve difficult calculus problems for engineers",
      "Coordinated with faculty and other leaders to hit program targets and session milestones",
      "Explained complex technical processes and methods in simpler terms to assist peers",
      "Managed group workflows to ensure all team members stay on track and finish content on time",
    ],
    tags: ["Leadership", "Tutoring", "Communication"],
  },
  {
    role: "Creative Spaces Student Assistant",
    org: "Fablab, University of Texas at Arlington",
    location: "Arlington, TX",
    period: "January 2026 – Present",
    bullets: [
      "Provided technical guidance on translating digital CAD designs into physical prototypes using shop tools",
      "Guided peers through the iterative design process for complex projects like custom mechanical components",
      "Facilitated safety orientation and equipment training, ensuring 100% compliance with safety protocols",
    ],
    tags: ["Fabrication", "CAD", "Training"],
  },
  {
    role: "Web Development Intern",
    org: "Aide Ascent",
    location: "Kathmandu, Nepal",
    period: "Nov 2024 – Mar 2025",
    bullets: [
      "Collaborated on the creation of 20+ website components to enhance functionality and user experience",
      "Developed and optimized responsive, client-centric websites for design and performance",
      "Supported the testing, debugging, and improvement of internal and client-facing platforms",
      "Documented development processes and created guides for clients to maintain websites independently",
    ],
    tags: ["React", "Web Dev", "QA"],
  },
  {
    role: "Publishing House Intern",
    org: "Samman Publishing House",
    location: "Kathmandu, Nepal",
    period: "Oct 2024 – Nov 2024",
    bullets: [
      "Assisted in creating and editing manuscripts for 5 published books and reports",
      "Conducted research to support content development for organized reports",
      "Coordinated with senior editors to ensure timely delivery of reports and publications",
    ],
    tags: ["Editing", "Research"],
  },
  {
    role: "IT Head",
    org: "Leo Club of Kathmandu Sagarmatha Central",
    location: "Nepal",
    period: "Aug 2023 – Aug 2024",
    bullets: [
      "Oversaw member database management and system updates",
      "Designed promotional materials and managed social media presence for events",
      "Introduced digital tools that streamlined communication between 50+ members",
    ],
    tags: ["IT", "Social Media", "Database"],
  },
  {
    role: "President",
    org: "Global School of Science IT Club",
    location: "Baneshwor, Nepal",
    period: "Sep 2023 – Mar 2024",
    bullets: [
      "Organized and led IT-related events, workshops and competitions for over 300 participants",
      "Managed partnerships and secured sponsorships from external companies",
      "Mentored junior members in using tech tools for academic and extracurricular projects",
      "Collaborated with non-profits to host and manage student-oriented events",
    ],
    tags: ["Leadership", "Event Management", "Mentoring"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-card/30">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 animate-fade-in-up">
          <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto animate-fade-in-up delay-100">
          A timeline of my professional and leadership journey.
        </p>

        {/* Timeline */}
        <div className="relative timeline-connector space-y-10 pl-10 md:pl-12">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="relative animate-fade-in-up" style={{ animationDelay: `${0.15 * i}s` }}>
              {/* Dot */}
              <div className="absolute -left-10 md:-left-12 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary ring-4 ring-primary/20">
                <Briefcase className="h-4 w-4" />
              </div>

              <Card className="bg-card/60 border-border/40 hover:border-primary/30 transition-colors duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle className="text-lg">{exp.role}</CardTitle>
                    <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exp.org} · {exp.location}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {exp.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}