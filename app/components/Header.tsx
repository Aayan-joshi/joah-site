"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Logo size={32} />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                <a href={l.href}>{l.label}</a>
              </Button>
            </li>
          ))}
          <li className="ml-2">
            <Button asChild size="sm" className="bg-primary/90 hover:bg-primary">
              <a href="/Resume - March 1.pdf" download>
                Resume
              </a>
            </Button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {
        open && (
          <div className="md:hidden glass border-t border-border animate-fade-in">
            <ul className="flex flex-col p-4 gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button asChild size="sm" className="w-full bg-primary/90 hover:bg-primary">
                  <a href="/Resume - March 1.pdf" download>
                    Resume
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        )
      }
    </header >
  );
}