import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e1efe6] via-[#f0f7f3] to-[#d4ddd8] animate-gradient" />

      {/* Floating orbs — soft gold and purple tints */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#efcb68]/15 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#160c28]/5 blur-3xl animate-float delay-200" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-[#efcb68]/10 blur-2xl animate-pulse-glow" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-medium tracking-widest uppercase text-[#160c28] animate-fade-in-up">
          Welcome to my portfolio
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up delay-100 text-[#000411]">
          Hi, I&apos;m{" "}
          <span className="gradient-text">Aayan Joshi</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-[#000411]/80 animate-fade-in-up delay-200">
          Computer Engineering Student · Builder · Leader
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm text-[#000411]/70 animate-fade-in-up delay-300">
          Tech-savvy undergraduate at UT Arlington with a passion for creating
          innovative solutions and leading collaborative projects.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">

            {/* TODO: Add link to resume */}
            <a href="/Resume - March 1.pdf" download>
              Download Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-[#160c28]/20 text-[#160c28] hover:bg-[#160c28]/5">
            <a href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="mt-16 inline-flex flex-col items-center text-muted-foreground/50 hover:text-[#160c28] transition-colors animate-fade-in delay-600"
        >
          <span className="text-xs mb-2 tracking-wider uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}