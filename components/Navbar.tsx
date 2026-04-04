"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LINKS = [
  { label: "Créations",    href: "#nos-creations" },
  { label: "Témoignages",  href: "#temoignages"   },
  { label: "Tarifs",       href: "#tarifs"        },
  { label: "Processus",    href: "#services"       },
  { label: "Contact",      href: "#contact"        },
];

export default function Navbar() {
  const navRef  = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  /* Scroll effect */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      nav.style.background      = scrolled ? "rgba(5,7,16,0.88)"  : "transparent";
      nav.style.backdropFilter  = scrolled ? "blur(18px) saturate(1.4)" : "none";
      nav.style.borderBottomColor = scrolled ? "rgba(255,255,255,0.06)" : "transparent";
      nav.style.boxShadow       = scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position:   "fixed",
          top:        0,
          left:       0,
          right:      0,
          zIndex:     1000,
          height:     "68px",
          display:    "flex",
          alignItems: "center",
          padding:    "0 28px",
          background: "transparent",
          borderBottom: "1px solid transparent",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", flexShrink: 0, zIndex: 1 }}
        >
          <Image src="/logo_CC.png" alt="CC Création" width={80} height={32} style={{ objectFit: "contain", opacity: 0.9 }} priority />
        </a>

        {/* Desktop links — centered */}
        <div
          className="nav-links-desktop"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {LINKS.map(link => (
            <NavLink key={link.href} href={link.href} onClick={handleClick}>{link.label}</NavLink>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={e => handleClick(e, "#contact")}
          className="nav-cta-desktop"
          style={{
            padding: "9px 20px",
            borderRadius: "100px",
            background: "#fff",
            color: "#050810",
            fontFamily: "var(--font-inter),sans-serif",
            fontWeight: 500,
            fontSize: "0.8rem",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#e2ebff"; el.style.boxShadow = "0 0 28px rgba(255,255,255,0.15)"; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = "#fff"; el.style.boxShadow = "none"; }}
        >
          Démarrer un projet
        </a>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            width: "40px",
            height: "40px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            cursor: "pointer",
            padding: 0,
            zIndex: 1,
          }}
          aria-label="Menu"
        >
          <span style={{
            display: "block", width: "18px", height: "1.5px",
            background: "#fff",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
          }} />
          <span style={{
            display: "block", width: "18px", height: "1.5px",
            background: "#fff",
            transition: "opacity 0.3s ease",
            opacity: open ? 0 : 1,
          }} />
          <span style={{
            display: "block", width: "18px", height: "1.5px",
            background: "#fff",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="nav-mobile-menu"
        style={{
          position: "fixed",
          top: "68px",
          left: 0,
          right: 0,
          zIndex: 999,
          background: "rgba(5,7,16,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "24px 28px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          transform: open ? "translateY(0)" : "translateY(-110%)",
          opacity: open ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => handleClick(e, link.href)}
            style={{
              fontFamily: "var(--font-inter),sans-serif",
              fontWeight: 400,
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              padding: "14px 0",
              borderBottom: i < LINKS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >
            {link.label}
          </a>
        ))}

        {/* Mobile CTA */}
        <a
          href="#contact"
          onClick={e => handleClick(e, "#contact")}
          style={{
            marginTop: "16px",
            padding: "14px 20px",
            borderRadius: "100px",
            background: "#fff",
            color: "#050810",
            fontFamily: "var(--font-inter),sans-serif",
            fontWeight: 500,
            fontSize: "0.9rem",
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          Démarrer un projet
        </a>
      </div>
    </>
  );
}

function NavLink({ href, children, onClick }: {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <a
      href={href}
      onClick={e => onClick(e, href)}
      style={{
        fontFamily:  "var(--font-inter),sans-serif",
        fontWeight:  400,
        fontSize:    "0.82rem",
        color:       "rgba(255,255,255,0.55)",
        textDecoration: "none",
        padding:     "8px 14px",
        borderRadius: "8px",
        letterSpacing: "0.01em",
        transition:  "color 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.color = "rgba(255,255,255,0.55)"; el.style.background = "transparent"; }}
    >
      {children}
    </a>
  );
}
