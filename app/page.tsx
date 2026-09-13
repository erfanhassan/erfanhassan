import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import FloatingDock from "@/components/FloatingDock";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import LogoMarquee from "@/components/LogoMarquee";
import MyAIProjects from "@/components/MyAIProjects";
import About from "@/components/About";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Erfan Hassan",
      "url": "https://erfanhassan.sonictch.com",
      "jobTitle": "Founder & AI Automation Engineer",
      "description": "Building custom AI agents and workflow automation systems to reduce business overhead.",
      "sameAs": [
        "https://www.linkedin.com/in/erfan-hassan",
        "https://twitter.com/erfanhassan",
        "https://github.com/erfanhassan"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "SonicTch AI Automation Agency",
      "url": "https://erfanhassan.sonictch.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Floating Bottom Dock (replaces top navbar) */}
      <FloatingDock />

      {/* ── Scrollytelling Hero Section ─────────────────────────────────── */}
      {/*
        Both ScrollyCanvas and Overlay are positioned relative to this
        wrapper div. ScrollyCanvas creates the 500vh scroll space and the
        sticky canvas. Overlay sits on top (absolute, pointer-events-none)
        and layers the parallax text over the canvas.
      */}
      <main id="main-content" className="relative">
        <div className="relative">
          <ScrollyCanvas />
          <Overlay />
        </div>

        {/* ── Logo Marquee ────────────────────────────────────────────── */}
        <LogoMarquee />

        {/* ── Projects & Content & Footer ─────────────────────────────────── */}
        <Projects />
        <MyAIProjects />
        <About />
        <Footer />
      </main>
    </>
  );
}
