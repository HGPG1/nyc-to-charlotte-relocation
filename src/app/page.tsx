"use client";

import { useState, useCallback, FormEvent } from "react";
import Image from "next/image";

/* ─── helpers ─── */
const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

/* ─── SVG Icons for "Why" cards ─── */
function DollarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function TrendingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function HomeFilledIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" stroke="#2a384c" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ─── Logo Component ─── */
function Logo({ size = "normal" }: { size?: "normal" | "small" }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/hgpg-logo.png"
        alt="Home Grown Property Group"
        width={size === "small" ? 32 : 44}
        height={size === "small" ? 32 : 44}
        className="object-contain"
      />
    </div>
  );
}

/* ─── Calculator Section ─── */
function Calculator() {
  const [rent, setRent] = useState(5137);

  const calc = useCallback(() => {
    // Charlotte mortgage ≈ 75% of NYC rent
    const charlotteMortgage = Math.round(rent * 0.75);
    const monthlySavings = rent - charlotteMortgage;
    const annualSavings = monthlySavings * 12;
    // Estimated home price based on ~300× monthly mortgage
    const homePrice = Math.round(charlotteMortgage * 300);
    return { charlotteMortgage, monthlySavings, annualSavings, homePrice };
  }, [rent]);

  const { charlotteMortgage, monthlySavings, annualSavings, homePrice } = calc();

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('/images/modern-home-interior.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/85" />
      <div className="relative max-w-3xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-3"
          style={{ fontFamily: "Sansita, serif", color: "#2a384c" }}
        >
          See What Your Rent Buys in Charlotte
        </h2>
        <p className="text-center text-lg mb-10" style={{ color: "#6b7280" }}>
          Enter your current NYC rent to see your potential savings
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <label
            className="block font-semibold text-lg mb-3"
            style={{ color: "#2a384c" }}
          >
            Your Current Monthly Rent
          </label>
          <div className="relative mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold" style={{ color: "#a0b2c2" }}>
              $
            </span>
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(Number(e.target.value) || 0)}
              className="w-full border-2 rounded-xl pl-10 pr-4 py-4 text-xl font-semibold focus:outline-none focus:border-[#2a384c] transition-colors"
              style={{ borderColor: "#d1d9df", color: "#2a384c" }}
              placeholder="5137"
            />
          </div>

          {/* Results Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border-2 rounded-xl p-5" style={{ borderColor: "#d1d9df" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "#6b7280" }}>
                Charlotte Mortgage
              </p>
              <p className="text-3xl font-bold" style={{ color: "#2a384c" }}>
                {fmt(charlotteMortgage)}
              </p>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                per month
              </p>
            </div>
            <div className="border-2 rounded-xl p-5" style={{ borderColor: "#d1d9df" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "#6b7280" }}>
                Monthly Savings
              </p>
              <p className="text-3xl font-bold" style={{ color: "#a0b2c2" }}>
                {fmt(monthlySavings)}
              </p>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                every month
              </p>
            </div>
            <div className="border-2 rounded-xl p-5" style={{ borderColor: "#d1d9df" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "#6b7280" }}>
                Annual Savings
              </p>
              <p className="text-3xl font-bold" style={{ color: "#2a384c" }}>
                {fmt(annualSavings)}
              </p>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                per year
              </p>
            </div>
          </div>

          {/* Estimated Home Price */}
          <div
            className="rounded-xl p-6 flex items-start gap-4"
            style={{ background: "#2a384c" }}
          >
            <div className="mt-1">
              <HomeFilledIcon />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">
                Estimated Home Price
              </p>
              <p
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "Sansita, serif" }}
              >
                {fmt(homePrice)}
              </p>
              <p className="text-sm text-white/60 mt-1">
                Based on your current rent payment, you could afford a home in
                this price range in Charlotte
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Card ─── */
function WhyCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border rounded-2xl p-8 hover:shadow-lg transition-shadow" style={{ borderColor: "#e5e7eb" }}>
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
        style={{ background: "#f0f0f0", color: "#a0b2c2" }}
      >
        {icon}
      </div>
      <h3
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "Sansita, serif", color: "#2a384c" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
        {description}
      </p>
    </div>
  );
}

/* ─── Lead Form ─── */
function LeadForm({
  showPhone = false,
  buttonText = "Get My Free Relocation Guide",
  privacyText = "We respect your privacy. No spam, ever.",
}: {
  showPhone?: boolean;
  buttonText?: string;
  privacyText?: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, connect to CRM / email service
    alert(
      `Thank you, ${firstName}! We'll send your Relocation Playbook to ${email}.`
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-semibold text-sm mb-1.5" style={{ color: "#2a384c" }}>
          First Name{showPhone && " *"}
        </label>
        <input
          type="text"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-[#2a384c] transition-colors"
          style={{ borderColor: "#d1d9df" }}
        />
      </div>
      <div>
        <label className="block font-semibold text-sm mb-1.5" style={{ color: "#2a384c" }}>
          Email Address{showPhone && " *"}
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-[#2a384c] transition-colors"
          style={{ borderColor: "#d1d9df" }}
        />
      </div>
      {showPhone && (
        <div>
          <input
            type="tel"
            placeholder="(555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-[#2a384c] transition-colors"
            style={{ borderColor: "#d1d9df" }}
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full py-4 rounded-lg font-bold text-lg text-white transition-all hover:opacity-90"
        style={{ background: "#2a384c" }}
      >
        {buttonText}
      </button>
      <p className="text-center text-sm" style={{ color: "#9ca3af" }}>
        🔒 {privacyText}
      </p>
    </form>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main style={{ fontFamily: "Inter, sans-serif" }}>
      {/* ── Sticky Header ── */}
      <header
        className="border-b sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
        style={{ borderColor: "#e5e7eb" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <Logo />
          <a
            href="#lead-form"
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "#2a384c" }}
          >
            Get the Playbook
          </a>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/charlotte-skyline.jpg"
            alt="Charlotte Skyline"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(42,56,76,0.88) 0%, rgba(42,56,76,0.75) 50%, rgba(42,56,76,0.88) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}
            >
              For NYC Renters Moving to Charlotte
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: "Sansita, serif" }}
            >
              Stop Paying
              <br />
              <span style={{ color: "#a0b2c2" }}>$5,137/Month</span>
              <br />
              in Rent
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              Own a beautiful 4-bedroom Charlotte home for less than your
              Manhattan studio costs.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <span style={{ color: "#a0b2c2" }}>
                  <CheckIcon />
                </span>
                157 people move here daily
              </span>
              <span className="flex items-center gap-2">
                <span style={{ color: "#a0b2c2" }}>
                  <CheckIcon />
                </span>
                #4 fastest-growing metro
              </span>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/80 mt-3">
              <span className="flex items-center gap-2">
                <span style={{ color: "#a0b2c2" }}>
                  <CheckIcon />
                </span>
                76% are renters like you
              </span>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-3"
                style={{
                  background: "#f0f0f0",
                  color: "#2a384c",
                }}
              >
                FREE DOWNLOAD
              </span>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "Sansita, serif", color: "#2a384c" }}
              >
                Get the Free NYC to Charlotte
                <br />
                Relocation Playbook
              </h2>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                Neighborhood guides, cost breakdowns & insider tips —
                delivered instantly.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <Calculator />

      {/* ── Why New Yorkers Choose Charlotte ── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-3"
            style={{ fontFamily: "Sansita, serif", color: "#2a384c" }}
          >
            Why New Yorkers Choose Charlotte
          </h2>
          <p className="text-center text-lg mb-12" style={{ color: "#6b7280" }}>
            Join the 157 people who move here every day for better quality of
            life
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <WhyCard
              icon={<DollarIcon />}
              title="Lower Cost of Living"
              description="Charlotte costs 28% less than NYC. Keep your remote job, slash your expenses, and actually save money every month."
            />
            <WhyCard
              icon={<TrendingIcon />}
              title="Booming Job Market"
              description="37,600 jobs added in 2025. #4 fastest-growing metro nationally. Major companies are relocating here."
            />
            <WhyCard
              icon={<MapPinIcon />}
              title="Great Neighborhoods"
              description="Walkable areas like Dilworth and South End offer the urban vibe you love—with actual space and greenery."
            />
            <WhyCard
              icon={<HomeIcon />}
              title="Build Equity"
              description="Stop enriching your landlord. Every payment builds your wealth. Charlotte home values up 7.7% this year."
            />
            <WhyCard
              icon={<UsersIcon />}
              title="Growing NYC Community"
              description="You won't be alone. Thousands of New Yorkers have already made the move and love it here."
            />
            <WhyCard
              icon={<CheckCircleIcon />}
              title="Better Quality of Life"
              description="Less traffic, more space, better weather. Work-life balance that's actually balanced."
            />
          </div>
        </div>
      </section>

      {/* ── Full-Width Neighborhood Image ── */}
      <section className="py-0">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image
            src="/images/charlotte-neighborhood.webp"
            alt="Beautiful Charlotte Neighborhood"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Bottom CTA / Lead Form ── */}
      <section
        id="lead-form"
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #2a384c 0%, #a0b2c2 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Sansita, serif" }}
          >
            Get the Free NYC to Charlotte Relocation Playbook
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Download our comprehensive relocation guide with neighborhood
            comparisons, cost breakdowns, and insider tips.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <LeadForm
              showPhone
              privacyText="We respect your privacy. Your information will never be shared."
            />
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12" style={{ background: "#2a384c" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/images/hgpg-logo.png"
                alt="Home Grown Property Group"
                width={40}
                height={40}
                className="object-contain brightness-0 invert opacity-80"
              />
            </div>
            <p className="text-white/60 text-sm max-w-xs">
              Helping New Yorkers find their dream homes in Charlotte, NC.
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm">
              © 2026 Home Grown Property Group. All rights reserved.
            </p>
            <p className="text-white/40 text-sm mt-1">Real Broker, LLC</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
