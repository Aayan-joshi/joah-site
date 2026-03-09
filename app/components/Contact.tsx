import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "aayan.joshi@uta.edu",
    href: "mailto:aayan.joshi@uta.edu",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "(682) 377-3776",
    href: "tel:+16823773776",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/aayan-joshi",
    href: "https://linkedin.com/in/aayan-joshi",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "Arlington, TX",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in-up">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground mb-14 max-w-xl mx-auto animate-fade-in-up delay-100">
          I&apos;m always open to new opportunities, collaborations, or just a friendly hello. Feel free to reach out!
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {CONTACT_ITEMS.map((item, i) => (
            <Card
              key={item.label}
              className="bg-card/60 border-border/40 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * i + 0.2}s` }}
            >
              <CardContent className="flex items-center gap-4 py-5 px-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 animate-fade-in-up delay-500">
          <a href="mailto:aayan.joshi@uta.edu">
            <Mail className="mr-2 h-4 w-4" />
            Send Me an Email
          </a>
        </Button>
      </div>
    </section>
  );
}