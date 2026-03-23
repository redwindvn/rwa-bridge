import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Why Vietnam", href: "#vietnam" },
  { label: "Solution", href: "#tokenization" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Market", href: "#market" },
  { label: "Roadmap", href: "#roadmap" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[hsl(var(--green-accent))]/10" : "bg-transparent"
    }`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="#" className="text-xl font-serif text-foreground">RWA Hub</a>
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-sans text-muted-foreground hover:text-[hsl(var(--green-accent))] transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="hidden lg:inline-flex text-sm font-sans font-medium px-5 py-2.5 rounded-lg bg-[hsl(var(--green-accent))] text-white hover:opacity-90 transition-opacity active:scale-[0.97]">
          Partner With Us
        </a>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground p-2" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-border pb-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-sm font-sans text-muted-foreground hover:text-[hsl(var(--green-accent))] transition-colors">
              {link.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a href="#contact" onClick={() => setMobileOpen(false)} className="inline-flex text-sm font-sans font-medium px-5 py-2.5 rounded-lg bg-[hsl(var(--green-accent))] text-white">
              Partner With Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
