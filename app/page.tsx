"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowRight, Bot, CheckCircle2, Code2, ExternalLink, LayoutTemplate, Menu, MessageCircle, MoveUpRight, PenTool, RefreshCw, Rocket, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { siteConfig } from "./site-config";
const navItems = [
  ["Work", "work"],
  ["Services", "services"],
  ["Process", "process"],
  ["About", "founder"],
] as const;
const headline = ["WE BUILD DIGITAL", "EXPERIENCES THAT", "MOVE BUSINESSES", "FORWARD."];
const services = [
  ["01", "BUSINESS WEBSITES", "Premium websites designed around your brand, customers and business goals.", LayoutTemplate],
  ["02", "LANDING PAGES", "High-impact landing pages built for products, campaigns and lead generation.", Rocket],
  ["03", "WEBSITE REDESIGN", "Transform outdated digital experiences into modern, responsive and conversion-focused websites.", RefreshCw],
  ["04", "AI-POWERED SOLUTIONS", "Practical AI experiences and automation designed to solve real business problems.", Bot],
  ["05", "DIGITAL SUPPORT", "Deployment, improvements, content updates and ongoing technical support.", Code2],
] as const;
const values = [
  ["01", "LOOK BETTER", "Build credibility from the first interaction."],
  ["02", "WORK BETTER", "Create fast, intuitive experiences for customers."],
  ["03", "GROW BETTER", "Turn digital presence into a business asset."],
] as const;
const reasons = [
  ["01", "BUSINESS FIRST", "Every design decision starts with the business goal."],
  ["02", "PREMIUM BY DEFAULT", "Strong typography, thoughtful interaction and polished details."],
  ["03", "MODERN TECHNOLOGY", "Built with a modern development stack for speed and scalability."],
  ["04", "DIRECT COLLABORATION", "You work directly with the person designing and building your project."],
] as const;
const processSteps = [
  ["01", "ALIGN", "We start with the business, the audience and the opportunity."],
  ["02", "DEFINE", "We shape a clear direction, structure and visual language."],
  ["03", "BUILD", "We turn the direction into a fast, polished digital experience."],
  ["04", "LAUNCH", "We refine, deploy and leave you with a foundation built to grow."],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: prefersReducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[100] h-[2.5px] origin-left bg-gradient-to-r from-signal via-[#a3e635] to-[#c9ff64] shadow-[0_0_12px_rgba(201,255,100,0.6)]"
        style={{ scaleX }}
      />

      <nav
        aria-label="Primary navigation"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-white/10 bg-ink/85 backdrop-blur-xl shadow-lg shadow-black/20" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <a href="#" className="focus-ring flex items-center gap-3" aria-label="Vivek Tech home">
            <span className="font-display text-[15px] font-bold tracking-[-0.04em]">{siteConfig.brandName}</span>
            <span className="hidden border-l border-white/20 pl-3 text-[9px] font-medium tracking-[0.16em] text-white/45 sm:block">
              {siteConfig.descriptor}
            </span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, target]) => (
              <a key={label} href={`#${target}`} className="focus-ring text-[12px] text-white/55 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <a href="#contact" className="focus-ring hidden items-center gap-2 text-[10px] font-semibold tracking-[0.13em] text-signal md:flex">
            START A PROJECT <ArrowRight size={13} strokeWidth={1.5} />
          </a>
          <button className="focus-ring p-2 text-white md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div id="mobile-navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/10 bg-ink/95 px-6 md:hidden">
              <div className="flex flex-col py-5">
                {navItems.map(([label, target]) => (
                  <a key={label} href={`#${target}`} onClick={() => setMenuOpen(false)} className="border-b border-white/10 py-4 text-sm text-white/70 last:border-0">
                    {label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-5 flex items-center gap-2 text-[10px] font-semibold tracking-[0.13em] text-signal">START A PROJECT <ArrowRight size={13} /></a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="hero-section relative mx-auto min-h-[780px] max-w-[1440px] px-6 pb-24 pt-40 lg:px-12 lg:pt-52">
        <div className="hero-grid pointer-events-none absolute inset-x-0 top-0 h-[720px] opacity-60" />
        <div className="hero-glow pointer-events-none absolute right-[-15%] top-[20%] h-[640px] w-[700px] opacity-80" />
        <div className="hero-copy relative z-10 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="eyebrow mb-8 text-signal">
            VIVEK TECH <span className="mx-2 text-white/25">/</span> DIGITAL STUDIO
          </motion.p>
          <h1 className="font-display text-[clamp(2.7rem,11vw,8.6rem)] font-medium leading-[.91] tracking-[-0.075em]">
            {headline.map((line, index) => (
              <motion.span key={line} initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .12 * index, ease: [0.22, 1, .36, 1] }} className="block">
                {line}
              </motion.span>
            ))}
          </h1>
          <div className="mt-10 flex max-w-[500px] flex-col gap-8 sm:flex-row sm:items-end">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65, duration: .7 }} className="max-w-[350px] text-[15px] leading-7 text-white/55">
              Premium websites, digital experiences and AI-powered solutions for businesses ready to stand out.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: .7 }} className="flex shrink-0 items-center gap-2.5 rounded-full border border-signal/30 bg-signal/5 px-3 py-1.5 text-[9px] font-semibold tracking-[.15em] text-signal shadow-[0_0_15px_rgba(130,170,255,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              AVAILABLE FOR SELECT PROJECTS
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: .7 }} className="mt-10 flex flex-wrap gap-5">
            <a href="#contact" className="focus-ring group flex items-center gap-8 bg-signal px-5 py-4 text-[10px] font-bold tracking-[.13em] text-ink transition-colors hover:bg-white">
              START A PROJECT <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#work" className="focus-ring group flex items-center gap-3 border border-white/20 px-5 py-4 text-[10px] font-bold tracking-[.13em] text-white transition-colors hover:border-white/50">
              VIEW OUR WORK <ArrowDownRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: 1 }} className="hero-preview relative z-10 mt-24 ml-auto w-full max-w-[600px] lg:-mt-20 lg:mr-4">
          <div className="absolute -inset-8 bg-signal/5 blur-3xl" />
          <div className="relative overflow-hidden border border-white/15 bg-[#111513] shadow-2xl shadow-black/40">
            <div className="flex h-9 items-center justify-between border-b border-white/10 px-4">
              <div className="flex gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-white/30" /><i className="h-1.5 w-1.5 rounded-full bg-white/20" /><i className="h-1.5 w-1.5 rounded-full bg-white/10" /></div>
              <span className="text-[8px] tracking-[.14em] text-white/30">NORTH / DIGITAL PRESENCE</span>
              <MoveUpRight size={12} className="text-signal" />
            </div>
            <div className="preview-grid relative h-[250px] overflow-hidden p-7 sm:h-[310px] sm:p-10">
              <div className="absolute right-[-12%] top-[-22%] h-[280px] w-[280px] rounded-full border border-signal/30" />
              <div className="absolute right-[4%] top-[2%] h-[180px] w-[180px] rounded-full border border-signal/20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="font-display text-[clamp(1.7rem,4vw,3.2rem)] leading-none tracking-[-.07em] text-white">MAKE SPACE<br />FOR <em className="not-italic text-signal">MORE.</em></span>
                <div className="flex items-end justify-between"><span className="text-[8px] tracking-[.12em] text-white/40">01 — IDENTITY / EXPERIENCE</span><ArrowDownRight size={24} strokeWidth={1} className="text-signal" /></div>
              </div>
              <div className="absolute bottom-0 right-12 h-28 w-px bg-signal/50" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-[9px] tracking-[.14em] text-white/30"><span>SELECTED DIRECTION / 2024</span><span>SCROLL TO EXPLORE ↓</span></div>
        </motion.div>
      </section>

      <section className="principles-section border-y border-white/10" aria-label="Studio principles">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-5 px-6 py-8 lg:px-12">
          <span className="eyebrow text-white/40">A SMALL STUDIO WITH A BIG POINT OF VIEW</span>
          <div className="flex items-center gap-3 text-[12px] font-medium tracking-[.18em] text-white/80"><span className="text-signal">DESIGN</span><span className="text-white/20">×</span><span>TECHNOLOGY</span><span className="text-white/20">×</span><span>BUSINESS</span></div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-white/10 bg-[#0d0f0e] py-3.5 select-none" aria-hidden="true">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap text-[11px] font-semibold tracking-[0.2em] text-white/40">
          {[
            "HIGH-CONVERSION DIGITAL EXPERIENCES",
            "CUSTOM NEXT.JS 14 & REACT ARCHITECTURE",
            "MODERN ARTISAN CAFÉ WEBSITES",
            "HIGH-ENERGY FITNESS & GYM PLATFORMS",
            "AI AUTOMATION & INTELLIGENT TOOLS",
            "FLUID FRAMER MOTION ANIMATIONS",
            "FOUNDER-LED BESPOKE CRAFTSMANSHIP",
            "HIGH-CONVERSION DIGITAL EXPERIENCES",
            "CUSTOM NEXT.JS 14 & REACT ARCHITECTURE",
            "MODERN ARTISAN CAFÉ WEBSITES",
            "HIGH-ENERGY FITNESS & GYM PLATFORMS",
            "AI AUTOMATION & INTELLIGENT TOOLS",
            "FLUID FRAMER MOTION ANIMATIONS",
            "FOUNDER-LED BESPOKE CRAFTSMANSHIP",
          ].map((item, idx) => (
            <span key={idx} className="flex items-center gap-6">
              <span className="text-signal/80">•</span>
              <span className="transition-colors hover:text-white">{item}</span>
            </span>
          ))}
        </div>
      </section>

      <section id="intro" className="intro-section mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-44">
        <Reveal>
          <p className="eyebrow text-signal">WHAT WE DO</p>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(3rem,7.5vw,7rem)] leading-[.95] tracking-[-.07em] text-white">
            WE TURN IDEAS INTO<br />DIGITAL EXPERIENCES.
          </h2>
          <p className="mt-10 max-w-xl text-[15px] leading-7 text-white/50">
            From first concept to final deployment, we design and build modern digital products that help businesses present themselves better, communicate clearly and convert attention into action.
          </p>
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 sm:grid-cols-4 sm:gap-8">
            {[
              ["100%", "Bespoke Code", "No rigid templates or generic page builders."],
              ["< 1s", "Fast Load Times", "Engineered for speed, SEO and conversions."],
              ["Direct", "Founder-Led", "Direct access to the designer & developer."],
              ["24-48h", "Rapid Response", "Fast communication and project delivery."],
            ].map(([stat, label, desc]) => (
              <div key={label} className="border-l border-signal/30 pl-4 sm:pl-5">
                <span className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{stat}</span>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal">{label}</p>
                <p className="mt-2 text-xs leading-5 text-white/45">{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="work" className="work-section border-y border-white/10 bg-[#0d0f0e]">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-signal">SELECTED WORK</p>
            <h2 className="mt-6 font-display text-[clamp(3.2rem,7vw,7rem)] leading-[.92] tracking-[-.07em]">BUILT TO BE SEEN.</h2>
            <p className="mt-8 max-w-xl text-[15px] leading-7 text-white/50">A selection of digital experiences designed and developed by Vivek Tech.</p>
          </Reveal>

          <Reveal className="mt-20" delay={0.08}>
            <article className="group border border-white/15 bg-[#111513] transition-colors duration-500 hover:border-signal/50">
              <a href="https://demo-gym-delta.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View the Volt Fitness concept project live" className="focus-ring block overflow-hidden border-b border-white/10">
                <div className="flex h-10 items-center justify-between border-b border-white/10 px-4 text-[8px] tracking-[.14em] text-white/35">
                  <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-signal" /> LIVE PREVIEW / VOLT FITNESS</span>
                  <span className="hidden sm:block">CONCEPT PROJECT / DEMO</span>
                </div>
                <div className="relative h-[330px] overflow-hidden bg-[#151b18] sm:h-[480px]">
                  <div className="absolute inset-0 origin-top transition-transform duration-700 group-hover:scale-[1.025]">
                    <iframe title="Volt Fitness project preview" src="https://demo-gym-delta.vercel.app/" className="h-full w-full border-0" loading="lazy" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111513]/35 to-transparent" />
                </div>
              </a>
              <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-signal">01</span>
                    <span className="eyebrow border border-signal/40 px-3 py-2 text-signal">CONCEPT PROJECT</span>
                  </div>
                  <h3 className="mt-8 font-display text-4xl tracking-[-.06em] sm:text-6xl">VOLT FITNESS</h3>
                  <p className="mt-3 text-[11px] font-medium tracking-[.12em] text-white/40">PREMIUM FITNESS STUDIO WEBSITE</p>
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <p className="max-w-xl text-sm leading-7 text-white/55">A premium digital experience for a modern fitness studio, designed to showcase programs, trainers, facilities, memberships and generate direct enquiries.</p>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "Tailwind CSS", "Framer Motion"].map((tag) => <span key={tag} className="border border-white/15 px-3 py-2 text-[10px] text-white/55">{tag}</span>)}
                    </div>
                    <a href="https://demo-gym-delta.vercel.app/" target="_blank" rel="noopener noreferrer" className="focus-ring group/link flex w-fit items-center gap-3 text-[10px] font-bold tracking-[.14em] text-signal">
                      VIEW LIVE PROJECT <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="mt-8" delay={0.1}>
            <article className="group border border-white/15 bg-[#111513] transition-colors duration-500 hover:border-signal/50">
              <a href="https://demo-cafe-black.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View the Ember & Bean cafe concept project live" className="focus-ring block overflow-hidden border-b border-white/10">
                <div className="flex h-10 items-center justify-between border-b border-white/10 px-4 text-[8px] tracking-[.14em] text-white/35">
                  <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-signal" /> LIVE PREVIEW / EMBER &amp; BEAN</span>
                  <span className="hidden sm:block">CONCEPT PROJECT / DEMO</span>
                </div>
                <div className="relative h-[330px] overflow-hidden bg-[#151b18] sm:h-[480px]">
                  <div className="absolute inset-0 origin-top transition-transform duration-700 group-hover:scale-[1.025]">
                    <iframe title="Ember & Bean cafe project preview" src="https://demo-cafe-black.vercel.app/" className="h-full w-full border-0" loading="lazy" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111513]/35 to-transparent" />
                </div>
              </a>
              <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[.8fr_1.2fr]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-signal">02</span>
                    <span className="eyebrow border border-signal/40 px-3 py-2 text-signal">CONCEPT PROJECT</span>
                  </div>
                  <h3 className="mt-8 font-display text-4xl tracking-[-.06em] sm:text-6xl">EMBER &amp; BEAN</h3>
                  <p className="mt-3 text-[11px] font-medium tracking-[.12em] text-white/40">SPECIALTY COFFEE &amp; ARTISAN CAFÉ WEBSITE</p>
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <p className="max-w-xl text-sm leading-7 text-white/55">A warm, editorial digital experience crafted for a specialty coffee and artisan food café, featuring interactive food &amp; drinks menus, space showcase, guest testimonials and reservations.</p>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"].map((tag) => <span key={tag} className="border border-white/15 px-3 py-2 text-[10px] text-white/55">{tag}</span>)}
                    </div>
                    <a href="https://demo-cafe-black.vercel.app/" target="_blank" rel="noopener noreferrer" className="focus-ring group/link flex w-fit items-center gap-3 text-[10px] font-bold tracking-[.14em] text-signal">
                      VIEW LIVE PROJECT <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              ["03", "MORE EXPERIENCES IN PROGRESS", "Custom e-commerce, portfolio and SaaS demos currently in production.", "COMING SOON"],
              ["04", "BUILDING IN PUBLIC", "Experiments, AI-powered automation and creative digital tools.", "UPCOMING / EXPERIMENT"],
            ].map(([number, title, description, label], index) => (
              <Reveal key={title} delay={0.12 + index * 0.08}>
                <article className="group relative min-h-[260px] overflow-hidden border border-white/15 p-6 transition-colors duration-500 hover:border-white/35 sm:p-8">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_80%_20%,rgba(201,255,100,.1),transparent_40%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between"><span className="font-display text-sm text-white/40">{number}</span><span className="eyebrow border border-white/20 px-3 py-2 text-white/45">{label}</span></div>
                    <div><h3 className="font-display text-3xl tracking-[-.05em] text-white/80 sm:text-4xl">{title}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/40">{description}</p></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-24 border-y border-white/10 py-8" delay={0.1}>
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
              <span className="eyebrow text-white/35">CAPABILITIES / THE STACK</span>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-medium tracking-[.12em] text-white/60">
                {["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "FRAMER MOTION", "AI"].map((technology) => <span key={technology} className="transition-colors hover:text-signal">{technology}</span>)}
              </div>
            </div>
          </Reveal>

          <Reveal className="pt-28 text-center lg:pt-36">
            <p className="eyebrow text-signal">PROJECT PHILOSOPHY</p>
            <h2 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(2.8rem,6vw,6.5rem)] leading-[.94] tracking-[-.07em] text-white/90">
              GOOD DESIGN GETS ATTENTION.<br /><span className="text-white/35">GREAT EXPERIENCES EARN TRUST.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      <section id="services" className="services-section border-y border-white/10 bg-[#0d0f0e]">
        <div className="mx-auto max-w-[1440px] px-6 py-28 lg:px-12 lg:py-36">
          <Reveal className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-signal">02 / CAPABILITIES</p>
              <h2 className="mt-5 font-display text-5xl tracking-[-.06em] sm:text-7xl">WHAT WE BUILD</h2>
            </div>
            <PenTool className="mb-2 hidden text-signal/70 sm:block" size={28} strokeWidth={1} />
          </Reveal>
          <div className="border-t border-white/15">
            {services.map(([number, title, description, Icon], index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="group grid gap-6 border-b border-white/10 py-8 transition-all duration-500 hover:bg-white/[0.025] sm:grid-cols-[80px_1fr_1.2fr_40px] sm:items-center sm:px-4 lg:py-10">
                  <span className="font-display text-sm text-signal/75">{number}</span>
                  <div className="flex items-center gap-4">
                    <Icon size={20} strokeWidth={1.2} className="text-white/45 transition-colors group-hover:text-signal" />
                    <h3 className="font-display text-xl tracking-[-.03em] text-white sm:text-2xl">{title}</h3>
                  </div>
                  <p className="max-w-lg text-sm leading-6 text-white/45">{description}</p>
                  <ArrowRight size={18} strokeWidth={1.3} className="text-white/35 transition-all duration-300 group-hover:translate-x-2 group-hover:text-signal" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="value" className="value-section mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-44">
        <Reveal>
          <p className="eyebrow text-signal">03 / THE OUTCOME</p>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(3rem,7vw,6.8rem)] leading-[.94] tracking-[-.07em]">WE DON&apos;T JUST<br />BUILD WEBSITES.</h2>
        </Reveal>
        <div className="mt-20 grid gap-0 border-t border-white/15 md:grid-cols-3">
          {values.map(([number, title, description], index) => (
            <Reveal key={title} delay={index * 0.08} className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              <span className="eyebrow text-white/35">{number}</span>
              <h3 className="mt-16 font-display text-3xl tracking-[-.05em] text-signal sm:text-4xl">{title}</h3>
              <p className="mt-4 max-w-[220px] text-sm leading-6 text-white/50">{description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="about-section border-t border-white/10 bg-[#0d0f0e]">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-32 lg:grid-cols-[.8fr_1.2fr] lg:px-12 lg:py-40">
          <Reveal>
            <p className="eyebrow text-signal">04 / THE DIFFERENCE</p>
            <h2 className="mt-7 max-w-md font-display text-5xl leading-[.96] tracking-[-.06em] sm:text-7xl">WHY WORK<br />WITH US?</h2>
          </Reveal>
          <div className="border-t border-white/15">
            {reasons.map(([number, title, description], index) => (
              <Reveal key={title} delay={index * 0.06} className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[60px_1fr_1.3fr] sm:items-start">
                <span className="eyebrow text-signal/70">{number}</span>
                <h3 className="font-display text-xl tracking-[-.03em] text-white">{title}</h3>
                <p className="text-sm leading-6 text-white/45">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="legacy-section relative overflow-hidden border-t border-white/10" id="legacy-process">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(201,255,100,.12),transparent_32%)]" />
        <div className="relative mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-44">
          <Reveal>
            <p className="eyebrow text-signal">05 / HOW WE WORK</p>
            <h2 className="mt-8 max-w-4xl font-display text-[clamp(3.2rem,8vw,8rem)] leading-[.9] tracking-[-.075em]">
              CLEAR THINKING.<br /><span className="text-white/35">BETTER BUILDING.</span>
            </h2>
          </Reveal>
          <div className="mt-20 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(([number, title, description], index) => (
              <Reveal key={title} delay={index * 0.07} className="border-b border-white/15 py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0">
                <span className="eyebrow text-signal/75">{number}</span>
                <h3 className="mt-12 font-display text-2xl tracking-[-.04em]">{title}</h3>
                <p className="mt-4 max-w-[220px] text-sm leading-6 text-white/45">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="process-section border-t border-white/10 bg-[#0d0f0e]">
        <div className="mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-40">
          <Reveal>
            <p className="eyebrow text-signal">HOW WE WORK</p>
            <h2 className="mt-7 font-display text-[clamp(3.2rem,8vw,8rem)] leading-[.9] tracking-[-.075em]">FROM IDEA<br />TO LAUNCH.</h2>
          </Reveal>
          <div className="relative mt-20 grid border-t border-white/15 md:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-[-1px] hidden h-px bg-signal md:block origin-left scale-x-75" />
            {[
              ["01", "DISCOVER", "We understand your business, audience, goals and requirements."],
              ["02", "DEFINE", "We shape the structure, content direction and visual experience."],
              ["03", "BUILD", "We design, develop and refine the product using modern technologies."],
              ["04", "LAUNCH", "We test, deploy and make sure the final experience is ready for real users."],
            ].map(([number, title, description], index) => (
              <Reveal key={title} delay={index * 0.08} className="relative border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <span className="mb-10 flex h-8 w-8 items-center justify-center rounded-full border border-signal/60 bg-[#0d0f0e] font-display text-[10px] text-signal">{number}</span>
                <h3 className="font-display text-2xl tracking-[-.04em]">{title}</h3>
                <p className="mt-4 max-w-[230px] text-sm leading-6 text-white/45">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="founder-section border-t border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-32 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-12 lg:py-40">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] max-w-[360px] overflow-hidden border border-white/15 bg-[#161a18]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,255,100,.14),transparent_35%)]" />
              <div className="absolute inset-x-8 bottom-8 top-8 border border-white/10" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between border-t border-white/15 pt-4">
                <span className="eyebrow text-white/40">FOUNDER / BUILDER</span>
                <span className="font-display text-4xl text-signal/70">VA</span>
              </div>
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/30" />
            </div>
            <p className="mx-auto mt-4 max-w-[360px] text-[9px] tracking-[.12em] text-white/30">PORTRAIT PLACEHOLDER / EASILY REPLACEABLE</p>
          </Reveal>
          <Reveal>
            <p className="eyebrow text-signal">THE PERSON BEHIND VIVEK TECH.</p>
            <h2 className="mt-7 max-w-3xl font-display text-[clamp(3rem,6vw,6.5rem)] leading-[.93] tracking-[-.07em]">VIVEK<br />AKKISETTY.</h2>
            <p className="mt-5 text-[11px] font-medium tracking-[.14em] text-white/45">FOUNDER &amp; DIGITAL PRODUCT DEVELOPER</p>
            <p className="mt-8 max-w-xl text-[15px] leading-7 text-white/55">I&apos;m a developer and AI enthusiast focused on building modern digital experiences, practical AI solutions, and products that solve real-world problems.</p>
            <p className="mt-8 max-w-xl border-l border-signal pl-5 font-display text-xl leading-snug tracking-[-.03em] text-white/85">Vivek Tech was built on a simple belief: technology should not only work — it should create an experience people remember.</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {["AI & ML", "Web Development", "AI-Powered Solutions", "Product Building", "UI/UX"].map((skill) => <span key={skill} className="border border-white/15 px-3 py-2 text-[10px] text-white/55">{skill}</span>)}
            </div>
            <p className="mt-12 text-[10px] font-semibold tracking-[.17em] text-signal">BUILDING AT THE INTERSECTION OF TECHNOLOGY, DESIGN AND BUSINESS.</p>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact-section border-t border-white/10 bg-[#0d0f0e]">
        <div className="mx-auto max-w-[1440px] px-6 py-32 lg:px-12 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <p className="eyebrow text-signal">START A PROJECT</p>
              <h2 className="mt-7 font-display text-[clamp(3.1rem,6vw,6.5rem)] leading-[.92] tracking-[-.07em]">HAVE SOMETHING<br />WORTH BUILDING?</h2>
              <p className="mt-8 max-w-md text-[15px] leading-7 text-white/50">Tell us what you&apos;re working on. We&apos;ll explore how we can turn the idea into a digital experience.</p>
              <div className="mt-12 space-y-3 text-sm text-white/55">
                <a href={`mailto:${siteConfig.contactEmail}`} className="focus-ring block w-fit transition-colors hover:text-signal">{siteConfig.contactEmail}</a>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-2 w-fit transition-colors hover:text-signal">
                  <MessageCircle size={14} className="text-signal" /> {siteConfig.whatsappPhone}
                </a>
                <p>{siteConfig.location} / {siteConfig.availability}</p>
                <p className="text-xs text-white/35">{siteConfig.responseExpectation}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-5">
                <a href={`mailto:${siteConfig.contactEmail}`} className="focus-ring flex items-center gap-3 bg-signal px-5 py-4 text-[10px] font-bold tracking-[.13em] text-ink transition-colors hover:bg-white">START A PROJECT <ArrowRight size={14} /></a>
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-3 border border-white/20 px-5 py-4 text-[10px] font-bold tracking-[.13em] text-white transition-colors hover:border-signal hover:text-signal">WHATSAPP <ExternalLink size={14} /></a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {submitted ? (
                <div className="flex min-h-[520px] flex-col justify-center border border-signal/40 p-8 sm:p-12">
                  <span className="eyebrow text-signal">MESSAGE READY</span>
                  <h3 className="mt-6 font-display text-4xl tracking-[-.05em] sm:text-5xl">FORWARDED TO<br />WHATSAPP.</h3>
                  <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                    Your project details have been formatted and opened directly in WhatsApp. If it didn&apos;t open automatically, use the button below:
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    {lastWhatsappUrl && (
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring flex items-center gap-3 bg-signal px-6 py-4 text-[10px] font-bold tracking-[.13em] text-ink transition-colors hover:bg-white"
                      >
                        <MessageCircle size={15} /> OPEN WHATSAPP CHAT <ArrowRight size={14} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="focus-ring border border-white/20 px-6 py-4 text-[10px] font-bold tracking-[.14em] text-white transition-colors hover:border-signal hover:text-signal"
                    >
                      SEND ANOTHER INQUIRY
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  className="border border-white/15 p-6 sm:p-10"
                  onSubmit={(event: FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const form = event.currentTarget;
                    if (!form.checkValidity()) {
                      setFormError("Please fill out all required fields before sending.");
                      form.reportValidity();
                      return;
                    }
                    setFormError("");

                    const data = new FormData(form);
                    const name = String(data.get("name") || "").trim();
                    const phone = String(data.get("phone") || "").trim();
                    const email = String(data.get("email") || "").trim();
                    const company = String(data.get("company") || "").trim() || "N/A";
                    const projectType = String(data.get("projectType") || "").trim();
                    const timeline = String(data.get("timeline") || "").trim();
                    const budget = String(data.get("budget") || "").trim();
                    const message = String(data.get("message") || "").trim();

                    const structuredMessage =
`*🚀 NEW PROJECT INQUIRY — VIVEK TECH*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
📱 *Phone / WhatsApp:* ${phone}
📧 *Email:* ${email}
🏢 *Business / Brand:* ${company}
📌 *Project Type:* ${projectType}
⏱️ *Timeline:* ${timeline}
💰 *Estimated Budget:* ${budget}

📝 *Project Details / Requirements:*
${message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 _Sent from Vivek Tech Studio (vivektech.in)_`;

                    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(structuredMessage)}`;
                    setLastWhatsappUrl(whatsappUrl);
                    setSubmitted(true);
                    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                  }}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45">
                      YOUR NAME *
                      <input required name="name" type="text" placeholder="e.g. Alex Sharma" className="focus-ring mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-sm font-normal tracking-normal text-white placeholder:text-white/20 outline-none transition-colors focus:border-signal" />
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45">
                      PHONE / WHATSAPP NUMBER *
                      <input required name="phone" type="tel" placeholder="e.g. +91 98765 43210" className="focus-ring mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-sm font-normal tracking-normal text-white placeholder:text-white/20 outline-none transition-colors focus:border-signal" />
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45">
                      EMAIL ADDRESS *
                      <input required name="email" type="email" placeholder="e.g. alex@brand.com" className="focus-ring mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-sm font-normal tracking-normal text-white placeholder:text-white/20 outline-none transition-colors focus:border-signal" />
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45">
                      BUSINESS / BRAND NAME
                      <input name="company" type="text" placeholder="e.g. Ember Cafe / Volt Fitness" className="focus-ring mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-sm font-normal tracking-normal text-white placeholder:text-white/20 outline-none transition-colors focus:border-signal" />
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45">
                      PROJECT TYPE *
                      <select required name="projectType" defaultValue="" className="focus-ring mt-3 w-full border-b border-white/20 bg-[#0d0f0e] pb-3 text-sm font-normal tracking-normal text-white outline-none focus:border-signal">
                        <option value="" disabled>Select project type</option>
                        <option value="Business Website">Business Website</option>
                        <option value="Café / Restaurant Website">Café / Restaurant Website</option>
                        <option value="Gym / Fitness Website">Gym / Fitness Website</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="AI-Powered Solution / Automation">AI-Powered Solution / Automation</option>
                        <option value="Other Custom Project">Other Custom Project</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45">
                      TIMELINE / LAUNCH GOAL *
                      <select required name="timeline" defaultValue="" className="focus-ring mt-3 w-full border-b border-white/20 bg-[#0d0f0e] pb-3 text-sm font-normal tracking-normal text-white outline-none focus:border-signal">
                        <option value="" disabled>Select timeline</option>
                        <option value="Immediately (Within 1-2 weeks)">Immediately (Within 1-2 weeks)</option>
                        <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                        <option value="Within 1-2 months">Within 1-2 months</option>
                        <option value="Flexible / Exploring options">Flexible / Exploring options</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45 sm:col-span-2">
                      ESTIMATED BUDGET *
                      <select required name="budget" defaultValue="" className="focus-ring mt-3 w-full border-b border-white/20 bg-[#0d0f0e] pb-3 text-sm font-normal tracking-normal text-white outline-none focus:border-signal">
                        <option value="" disabled>Select budget range</option>
                        <option value="Under ₹10,000">Under ₹10,000</option>
                        <option value="₹10,000 – ₹25,000">₹10,000 – ₹25,000</option>
                        <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                        <option value="₹50,000+">₹50,000+</option>
                      </select>
                    </label>
                    <label className="text-[10px] font-semibold tracking-[.12em] text-white/45 sm:col-span-2">
                      PROJECT DETAILS / WHAT DO YOU NEED? *
                      <textarea required name="message" rows={4} placeholder="Describe what you want to build, key features (online menu, booking, contact form, animations), reference websites, etc..." className="focus-ring mt-3 w-full resize-none border-b border-white/20 bg-transparent pb-3 text-sm font-normal tracking-normal text-white placeholder:text-white/20 outline-none transition-colors focus:border-signal" />
                    </label>
                  </div>
                  {formError && <p role="alert" className="mt-5 text-xs text-red-300">{formError}</p>}
                  <button type="submit" className="focus-ring mt-8 flex items-center gap-4 bg-signal px-6 py-4 text-[10px] font-bold tracking-[.13em] text-ink transition-colors hover:bg-white">
                    <MessageCircle size={15} /> SEND PROJECT DETAILS VIA WHATSAPP <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="final-section relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,255,100,.12),transparent_38%)]" />
        <Reveal className="relative mx-auto max-w-[1440px] px-6 py-32 text-center lg:px-12 lg:py-44">
          <p className="eyebrow text-signal">THE NEXT MOVE</p>
          <h2 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(3rem,7vw,7.5rem)] leading-[.9] tracking-[-.075em]">LET&apos;S BUILD SOMETHING<br /><span className="text-white/35">PEOPLE REMEMBER.</span></h2>
          <a href="#contact" className="focus-ring mt-10 inline-flex items-center gap-4 border border-signal px-5 py-4 text-[10px] font-bold tracking-[.14em] text-signal transition-colors hover:bg-signal hover:text-ink">START A PROJECT <ArrowRight size={14} /></a>
        </Reveal>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-20">
          <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="font-display text-xl font-bold tracking-[-.04em]">{siteConfig.brandName}</p>
              <p className="eyebrow mt-2 text-signal">{siteConfig.descriptor}</p>
              <p className="mt-7 max-w-xs text-sm leading-6 text-white/45">Building digital experiences that move businesses forward.</p>
            </div>
            <div>
              <p className="eyebrow mb-5 text-white/35">NAVIGATION</p>
              <div className="grid gap-3 text-sm text-white/55">
                {[...navItems, ["Contact", "contact"] as const].map(([label, target]) => <a key={label} href={`#${target}`} className="focus-ring w-fit transition-colors hover:text-signal">{label}</a>)}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-5 text-white/35">CONNECT</p>
              <div className="grid gap-3 text-sm text-white/55">
                <a href={`mailto:${siteConfig.contactEmail}`} className="focus-ring w-fit transition-colors hover:text-signal">{siteConfig.contactEmail}</a>
                {Object.entries(siteConfig.socialLinks).map(([label, url]) => url ? <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="focus-ring w-fit capitalize transition-colors hover:text-signal">{label}</a> : <span key={label} className="capitalize text-white/25">{label} / coming soon</span>)}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-[9px] tracking-[.15em] text-white/35 sm:flex-row">
            <span>© 2026 {siteConfig.brandName}. ALL RIGHTS RESERVED.</span>
            <span>DESIGN × TECHNOLOGY × BUSINESS</span>
          </div>
        </div>
      </footer>

      {/* Floating Quick WhatsApp Action */}
      <motion.aside
        initial={{ opacity: 0, scale: 0.85, y: 16 }}
        animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.85, y: scrolled ? 0 : 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Quick WhatsApp contact"
        className={`fixed bottom-6 right-6 z-40 ${scrolled ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring group flex items-center gap-2.5 rounded-full border border-signal/40 bg-[#111513]/90 px-4 py-3 text-[11px] font-bold tracking-[0.12em] text-white shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-signal hover:bg-signal hover:text-ink hover:shadow-[0_0_24px_rgba(201,255,100,0.4)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <MessageCircle size={15} />
          <span>CHAT ON WHATSAPP</span>
        </a>
      </motion.aside>
    </main>
  );
}
