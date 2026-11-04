"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { navLinks, offices } from "@/data/company";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  // The menu is open only for the route it was opened on, so navigating closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = useCallback((v: boolean | ((x: boolean) => boolean)) => {
    setOpenFor((cur) => {
      const was = cur === pathname;
      const next = typeof v === "function" ? v(was) : v;
      return next ? pathname : null;
    });
  }, [pathname]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, [setOpen]);

  // Scroll lock, Escape to close, and a simple focus trap while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const all = [menuButtonRef.current, ...Array.from(focusables)].filter(Boolean) as HTMLElement[];
      const first = all[0];
      const last = all[all.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the panel.
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus());
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          solid ? "bg-navy-900/95 shadow-[0_1px_0_0_rgb(198_164_106/0.25)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-wide flex h-[4.5rem] items-center justify-between lg:h-20">
          <Logo />

          <ul className="hidden items-center gap-8 xl:gap-10 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "link-underline py-2 text-[0.8rem] font-medium tracking-[0.06em] transition-colors",
                    isActive(l.href) ? "text-gold-300" : "text-ivory-100/85 hover:text-ivory-50",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/contact?type=consultation#enquiry" className="btn btn-gold !min-h-11 !px-5 !text-[0.7rem]">
              Request Consultation
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-12 w-12 items-center justify-center text-ivory-50 lg:hidden"
          >
            {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-navy-900 lg:hidden"
          >
            <div className="grid-motif pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="container-wide relative flex min-h-full flex-col pb-10 pt-6">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-gold-500/15"
                  >
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center justify-between font-serif text-[1.75rem] tracking-tight",
                        isActive(l.href) ? "text-gold-300" : "text-ivory-50",
                      )}
                    >
                      {l.label}
                      <ArrowRight size={18} className="opacity-50" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Link href="/contact?type=consultation#enquiry" className="btn btn-gold w-full">
                  Request Consultation
                </Link>
                {offices.map((o) => (
                  <a key={o.id} href={o.phoneHref} className="btn btn-outline-light w-full">
                    <Phone size={15} /> {o.label} · {o.phoneDisplay}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
