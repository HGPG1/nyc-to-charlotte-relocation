"use client";

import { useState, useCallback } from "react";

/* âââ tiny helpers âââ */
const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = (n: number) => `${Math.round(n)}%`;

/* âââ Rent-to-Mortgage Calculator âââ */
function Calculator() {
  const [rent, setRent] = useState(3500);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [tax, setTax] = useState(1.03);
  const [insurance, setInsurance] = useState(150);

  const calc = useCallback(() => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    const downPct = down / 100;

    // What monthly P&I payment equals current rent minus tax/ins?
    const piTarget = rent - (tax / 100) * (rent * 12) / 12 - insurance;
    const piPayment = Math.max(piTarget, rent * 0.6);

    // What home price can that payment support?
    const loanAmount =
      monthlyRate > 0
        ? (piPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
        : piPayment * numPayments;

    const homePrice = loanAmount / (1 - downPct);
    const downPayment = homePrice * downPct;
    const monthlyPI =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        : loanAmount / numPayments;
    const monthlyTax = (homePrice * (tax / 100)) / 12;
    const totalMonthly = monthlyPI + monthlyTax + insurance;
    const savings = rent - totalMonthly;

    return { homePrice, downPayment, loanAmount, monthlyPI, monthlyTax, totalMonthly, savings };
  }, [rent, down, rate, term, tax, insurance]);

  const r = calc();

  return (
    <section id="calculator" className="py-20 px-4" style={{ background: "#F0F0F0" }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
        >
          Rent-to-Mortgage Calculator
        </h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#2A384C" }}>
          See how your NYC rent could translate to homeownership in Charlotte.
          Adjust the inputs below to explore your buying power.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Inputs */}
          <div className="rounded-2xl p-8 shadow-lg" style={{ background: "#FFFFFF" }}>
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
            >
              Your Current Situation
            </h3>

            <label className="block mb-1 font-semibold text-sm" style={{ color: "#2A384C" }}>
              Monthly NYC Rent
            </label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="range"
                min={1500}
                max={8000}
                step={100}
                value={rent}
                onChange={(e) => setRent(+e.target.value)}
                className="flex-1 accent-[#2A384C]"
              />
              <span
                className="font-bold text-lg min-w-[90px] text-right"
                style={{ color: "#2A384C" }}
              >
                {fmt(rent)}
              </span>
            </div>

            <label className="block mb-1 font-semibold text-sm" style={{ color: "#2A384C" }}>
              Down Payment
            </label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="range"
                min={3}
                max={30}
                step={1}
                value={down}
                onChange={(e) => setDown(+e.target.value)}
                className="flex-1 accent-[#2A384C]"
              />
              <span
                className="font-bold text-lg min-w-[50px] text-right"
                style={{ color: "#2A384C" }}
              >
                {pct(down)}
              </span>
            </div>

            <label className="block mb-1 font-semibold text-sm" style={{ color: "#2A384C" }}>
              Interest Rate
            </label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="range"
                min={4}
                max={9}
                step={0.125}
                value={rate}
                onChange={(e) => setRate(+e.target.value)}
                className="flex-1 accent-[#2A384C]"
              />
              <span
                className="font-bold text-lg min-w-[60px] text-right"
                style={{ color: "#2A384C" }}
              >
                {rate.toFixed(2)}%
              </span>
            </div>

            <label className="block mb-1 font-semibold text-sm" style={{ color: "#2A384C" }}>
              Loan Term
            </label>
            <div className="flex gap-3 mb-4">
              {[15, 20, 30].map((t) => (
                <button
                  key={t}
                  onClick={() => setTerm(t)}
                  className="px-5 py-2 rounded-lg font-semibold transition-all"
                  style={{
                    background: term === t ? "#2A384C" : "#D1D9DF",
                    color: term === t ? "#FFFFFF" : "#2A384C",
                  }}
                >
                  {t} yr
                </button>
              ))}
            </div>

            <label className="block mb-1 font-semibold text-sm" style={{ color: "#2A384C" }}>
              Property Tax Rate (Charlotte avg â 1.03%)
            </label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.01}
                value={tax}
                onChange={(e) => setTax(+e.target.value)}
                className="flex-1 accent-[#2A384C]"
              />
              <span
                className="font-bold text-lg min-w-[60px] text-right"
                style={{ color: "#2A384C" }}
              >
                {tax.toFixed(2)}%
              </span>
            </div>

            <label className="block mb-1 font-semibold text-sm" style={{ color: "#2A384C" }}>
              Monthly Insurance
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={50}
                max={400}
                step={10}
                value={insurance}
                onChange={(e) => setInsurance(+e.target.value)}
                className="flex-1 accent-[#2A384C]"
              />
              <span
                className="font-bold text-lg min-w-[70px] text-right"
                style={{ color: "#2A384C" }}
              >
                {fmt(insurance)}
              </span>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl p-8 shadow-lg text-white" style={{ background: "#2A384C" }}>
            <h3
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: "Sansita, serif" }}
            >
              Your Charlotte Buying Power
            </h3>

            <div className="space-y-5">
              <ResultRow label="Estimated Home Price" value={fmt(r.homePrice)} highlight />
              <ResultRow label="Down Payment" value={fmt(r.downPayment)} />
              <ResultRow label="Loan Amount" value={fmt(r.loanAmount)} />

              <div className="border-t border-white/20 pt-5">
                <p className="text-sm opacity-70 mb-3">Monthly Payment Breakdown</p>
                <ResultRow label="Principal & Interest" value={fmt(r.monthlyPI)} />
                <ResultRow label="Property Tax" value={fmt(r.monthlyTax)} />
                <ResultRow label="Insurance" value={fmt(insurance)} />
              </div>

              <div className="border-t border-white/20 pt-5">
                <ResultRow label="Total Monthly Payment" value={fmt(r.totalMonthly)} highlight />
                <div className="mt-3 rounded-xl p-4" style={{ background: "rgba(160,178,194,0.2)" }}>
                  <p className="text-sm opacity-70">Compared to your NYC rent</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: "Sansita, serif" }}>
                    {r.savings > 0
                      ? `You save ${fmt(r.savings)}/mo`
                      : `${fmt(Math.abs(r.savings))}/mo more`}
                  </p>
                  {r.savings > 0 && (
                    <p className="text-sm opacity-70 mt-1">
                      That&apos;s {fmt(r.savings * 12)} per year â and you&apos;re building equity!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={highlight ? "font-semibold text-lg" : "text-sm opacity-80"}>{label}</span>
      <span
        className={highlight ? "text-2xl font-bold" : "font-semibold"}
        style={highlight ? { fontFamily: "Sansita, serif" } : {}}
      >
        {value}
      </span>
    </div>
  );
}

/* âââ Cost Comparison Card âââ */
function CostCard({ item, nyc, clt }: { item: string; nyc: string; clt: string }) {
  return (
    <div className="rounded-xl p-6 shadow-md" style={{ background: "#FFFFFF" }}>
      <h4 className="font-bold text-lg mb-3" style={{ color: "#2A384C" }}>{item}</h4>
      <div className="flex justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide" style={{ color: "#A0B2C2" }}>NYC</p>
          <p className="font-bold text-lg" style={{ color: "#2A384C" }}>{nyc}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide" style={{ color: "#A0B2C2" }}>Charlotte</p>
          <p className="font-bold text-lg" style={{ color: "#2A384C" }}>{clt}</p>
        </div>
      </div>
    </div>
  );
}

/* âââ Neighborhood Card âââ */
function NeighborhoodCard({
  name,
  vibe,
  price,
  description,
}: {
  name: string;
  vibe: string;
  price: string;
  description: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border-l-4"
      style={{ background: "#FFFFFF", borderLeftColor: "#A0B2C2" }}
    >
      <h4
        className="text-xl font-bold mb-1"
        style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
      >
        {name}
      </h4>
      <p className="text-sm font-medium mb-2" style={{ color: "#A0B2C2" }}>
        {vibe} Â· Median {price}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "#2A384C" }}>{description}</p>
    </div>
  );
}

/* âââ FAQ Item âââ */
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b py-5 cursor-pointer"
      style={{ borderColor: "#D1D9DF" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-lg" style={{ color: "#2A384C" }}>{q}</h4>
        <span className="text-2xl" style={{ color: "#A0B2C2" }}>
          {open ? "â" : "+"}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-sm leading-relaxed" style={{ color: "#2A384C" }}>{a}</p>
      )}
    </div>
  );
}

/* âââ MAIN PAGE âââ */
export default function Home() {
  return (
    <main>
      {/* âââ Navigation âââ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md"
        style={{ background: "rgba(42,56,76,0.95)" }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#" className="text-white font-bold text-xl" style={{ fontFamily: "Sansita, serif" }}>
            Home Grown Property Group
          </a>
          <div className="hidden md:flex gap-6 text-sm">
            {["Why Charlotte", "Cost of Living", "Calculator", "Neighborhoods", "Jobs", "FAQ", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </nav>

      {/* âââ Hero âââ */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-4"
        style={{
          background: "linear-gradient(135deg, #2A384C 0%, #3a4f6a 50%, #2A384C 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] mb-4" style={{ color: "#A0B2C2" }}>
            Your Complete Relocation Guide
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "Sansita, serif" }}
          >
            NYC to Charlotte
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Trade the subway for sweet tea. Discover why thousands of New Yorkers are making
            Charlotte their new home â and how your rent check could become a mortgage payment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#calculator"
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: "#A0B2C2", color: "#2A384C" }}
            >
              Try the Calculator
            </a>
            <a
              href="#why-charlotte"
              className="px-8 py-4 rounded-xl font-bold text-lg border-2 text-white hover:bg-white/10 transition-all"
              style={{ borderColor: "#A0B2C2" }}
            >
              Explore the Guide
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" fill="none" stroke="#A0B2C2" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* âââ Why Charlotte âââ */}
      <section id="why-charlotte" className="py-20 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
          >
            Why Charlotte?
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#2A384C" }}>
            Charlotte is one of the fastest-growing cities in America â and for good reason.
            Here&apos;s what draws New Yorkers south.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "ð°",
                title: "50% Lower Cost of Living",
                desc: "Your dollar stretches dramatically further. A $3,500/mo NYC apartment translates to a 3-bedroom home with a yard in Charlotte.",
              },
              {
                icon: "âï¸",
                title: "218 Sunny Days Per Year",
                desc: "Mild winters, gorgeous falls, and long summers. No more shoveling sidewalks at 6 AM or paying $200 to store your winter coat.",
              },
              {
                icon: "ð¢",
                title: "Booming Job Market",
                desc: "Charlotte is the #2 banking center in the US. Bank of America, Wells Fargo, Truist, and hundreds of tech companies call it home.",
              },
              {
                icon: "ð¡",
                title: "Space to Breathe",
                desc: "Average home size in Charlotte is 2,200 sq ft vs. 750 sq ft in NYC. Garages, backyards, and home offices are the norm.",
              },
              {
                icon: "ð",
                title: "Top-Rated Schools",
                desc: "Charlotte-Mecklenburg Schools plus excellent private and charter options. South Charlotte and Fort Mill are especially popular with families.",
              },
              {
                icon: "ð",
                title: "20-Minute Commutes",
                desc: "Average commute is 26 minutes by car. No more hour-long subway rides standing in a packed train.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6 hover:shadow-lg transition-shadow"
                style={{ background: "#F0F0F0" }}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#2A384C" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* âââ Cost of Living Comparison âââ */}
      <section id="cost-of-living" className="py-20 px-4" style={{ background: "#D1D9DF" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
          >
            Cost of Living Comparison
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#2A384C" }}>
            Real numbers, real savings. See how everyday expenses stack up.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CostCard item="1-Bedroom Apartment (City)" nyc="$3,500/mo" clt="$1,450/mo" />
            <CostCard item="3-Bedroom Home (Mortgage)" nyc="$5,200/mo" clt="$2,100/mo" />
            <CostCard item="Groceries (Monthly)" nyc="$650" clt="$425" />
            <CostCard item="Dinner for Two" nyc="$120" clt="$65" />
            <CostCard item="Monthly Transit / Gas" nyc="$132" clt="$150" />
            <CostCard item="Childcare (Monthly)" nyc="$2,800" clt="$1,200" />
            <CostCard item="Gym Membership" nyc="$120/mo" clt="$45/mo" />
            <CostCard item="State Income Tax" nyc="Up to 10.9%" clt="4.5% flat" />
            <CostCard item="Average Home Price" nyc="$750,000+" clt="$380,000" />
          </div>
          <p className="text-center text-sm mt-8 opacity-70" style={{ color: "#2A384C" }}>
            Sources: Bureau of Labor Statistics, Zillow, Numbeo, 2025 data
          </p>
        </div>
      </section>

      {/* âââ Calculator âââ */}
      <Calculator />

      {/* âââ Neighborhoods âââ */}
      <section id="neighborhoods" className="py-20 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
          >
            Neighborhoods New Yorkers Love
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#2A384C" }}>
            Whether you want urban energy, suburban calm, or small-town charm â Charlotte
            has your neighborhood.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <NeighborhoodCard
              name="South End"
              vibe="Brooklyn Vibes"
              price="$450K"
              description="Walkable, brewery-filled, and connected by the LYNX light rail. South End is where NYC transplants feel most at home. Street art, rooftop bars, and new construction condos everywhere you look."
            />
            <NeighborhoodCard
              name="NoDa (North Davidson)"
              vibe="Williamsburg Energy"
              price="$380K"
              description="Charlotte's arts district. Live music venues, galleries, craft cocktail bars, and a thriving creative community. More affordable than South End with serious character."
            />
            <NeighborhoodCard
              name="Dilworth / Myers Park"
              vibe="Upper West Side Elegance"
              price="$750K"
              description="Tree-lined streets, historic homes, top-rated schools, and walkable to Uptown. This is where Charlotte's established families live. Think Park Slope meets Georgetown."
            />
            <NeighborhoodCard
              name="Ballantyne / South Charlotte"
              vibe="Family-Friendly Suburbs"
              price="$550K"
              description="Excellent schools, master-planned communities, pools, parks, and every retail convenience imaginable. Perfect for families who want space and a strong community."
            />
            <NeighborhoodCard
              name="Fort Mill, SC"
              vibe="Best of Both Worlds"
              price="$420K"
              description="Just across the SC border (15 min to Uptown Charlotte). No state income tax in SC, nationally ranked schools, and brand-new construction. Huge draw for NYC families."
            />
            <NeighborhoodCard
              name="Indian Land / Waxhaw"
              vibe="Country Meets Convenience"
              price="$380K"
              description="More land, newer builds, and a small-town feel with easy access to Charlotte. Perfect for those craving space, good schools, and a slower pace without sacrificing convenience."
            />
            <NeighborhoodCard
              name="Plaza Midwood"
              vibe="East Village Eclectic"
              price="$425K"
              description="Diverse, funky, and full of personality. Independent restaurants, vintage shops, and a vibrant nightlife scene. One of Charlotte's most walkable neighborhoods."
            />
            <NeighborhoodCard
              name="Uptown Charlotte"
              vibe="Midtown Manhattan (Compact)"
              price="$400K"
              description="Charlotte's downtown core. High-rises, the Panthers stadium, the Spectrum Center, museums, and a growing food scene. Walkable and transit-connected."
            />
          </div>
        </div>
      </section>

      {/* âââ Job Market âââ */}
      <section id="jobs" className="py-20 px-4" style={{ background: "#F0F0F0" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
          >
            Charlotte Job Market
          </h2>
          <p className="text-center text-lg mb-12 max-w-2xl mx-auto" style={{ color: "#2A384C" }}>
            Charlotte isn&apos;t just affordable â it&apos;s a career accelerator.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8 shadow-md" style={{ background: "#FFFFFF" }}>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
              >
                Top Industries
              </h3>
              <ul className="space-y-3">
                {[
                  "Banking & Finance â Bank of America HQ, Wells Fargo East Coast HQ, Truist HQ",
                  "Technology â Microsoft, Google, Apple, Honeywell, Red Ventures, LendingTree",
                  "Healthcare â Atrium Health (Advocate), Novant Health",
                  "Energy â Duke Energy HQ, Nucor, Trane Technologies",
                  "Motorsports â NASCAR HQ and 90% of all racing teams",
                  "Logistics â Charlotte Douglas Airport is a major American Airlines hub",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm" style={{ color: "#2A384C" }}>
                    <span style={{ color: "#A0B2C2" }}>â¸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8 shadow-md" style={{ background: "#FFFFFF" }}>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
              >
                By the Numbers
              </h3>
              <div className="space-y-6">
                {[
                  { stat: "3.2%", label: "Unemployment rate (below national avg)" },
                  { stat: "#2", label: "Largest banking center in the US" },
                  { stat: "100+", label: "Fortune 500 & Fortune 1000 companies in metro" },
                  { stat: "15%", label: "Job growth over past 5 years" },
                  { stat: "$62K", label: "Median household income" },
                  { stat: "Remote-Friendly", label: "Many employers offer hybrid/remote work" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-4">
                    <span
                      className="text-3xl font-bold"
                      style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
                    >
                      {item.stat}
                    </span>
                    <span className="text-sm" style={{ color: "#A0B2C2" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* âââ Relocation Timeline âââ */}
      <section className="py-20 px-4" style={{ background: "#2A384C" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "Sansita, serif" }}
          >
            Your Relocation Timeline
          </h2>
          <p className="text-lg mb-12 text-white/70">
            A month-by-month guide to making the move.
          </p>
          <div className="space-y-0">
            {[
              {
                month: "3-6 Months Before",
                tasks: "Research neighborhoods. Get pre-approved for a mortgage. Connect with a Charlotte real estate agent. Start exploring remote work options with your employer.",
              },
              {
                month: "2-3 Months Before",
                tasks: "Plan a visit to tour neighborhoods and homes. Start the home search. Begin decluttering your NYC apartment (you won't need all that stuff).",
              },
              {
                month: "1-2 Months Before",
                tasks: "Make an offer and close on your Charlotte home. Give notice to your NYC landlord. Book movers. Notify utilities and update your address.",
              },
              {
                month: "Moving Month",
                tasks: "Final walkthrough of your new home. Coordinate movers. Set up Charlotte utilities, internet, and services. Get your NC driver's license within 60 days.",
              },
              {
                month: "First 90 Days",
                tasks: "Explore your new neighborhood. Join local groups and communities. Register kids for school. Find your go-to restaurants, gym, and coffee shop.",
              },
            ].map((step, i) => (
              <div key={step.month} className="flex gap-6 text-left">
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: "#A0B2C2", color: "#2A384C" }}
                  >
                    {i + 1}
                  </div>
                  {i < 4 && (
                    <div className="w-0.5 flex-1" style={{ background: "#A0B2C2", opacity: 0.3 }} />
                  )}
                </div>
                <div className="pb-8">
                  <h4 className="font-bold text-lg text-white" style={{ fontFamily: "Sansita, serif" }}>
                    {step.month}
                  </h4>
                  <p className="text-sm text-white/70 mt-1">{step.tasks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* âââ FAQ âââ */}
      <section id="faq" className="py-20 px-4" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ fontFamily: "Sansita, serif", color: "#2A384C" }}
          >
            Frequently Asked Questions
          </h2>
          <FAQ
            q="Is Charlotte really that much cheaper than NYC?"
            a="Yes. On average, the cost of living in Charlotte is about 47% lower than New York City. Housing is the biggest difference â you can buy a 3-bedroom home in Charlotte for what you'd pay for a studio condo in Manhattan. Groceries, dining, childcare, and taxes are all significantly cheaper."
          />
          <FAQ
            q="What about salaries? Will I take a pay cut?"
            a="Some industries adjust salaries for cost of living, but many remote roles maintain NYC-level pay. Even with a 10-15% salary reduction, your purchasing power in Charlotte is dramatically higher. A $150K salary in Charlotte gives you the lifestyle of a $250K salary in NYC."
          />
          <FAQ
            q="Do I need a car in Charlotte?"
            a="For most people, yes. Charlotte is a car-friendly city. The LYNX light rail connects South End to Uptown and is expanding, but having a car gives you the most flexibility. The good news: gas is cheaper, parking is free almost everywhere, and there's no parallel parking stress."
          />
          <FAQ
            q="What's the weather like?"
            a="Charlotte has four distinct seasons. Summers are warm and humid (85-95Â°F), winters are mild (35-50Â°F) with occasional ice storms but very little snow. Spring and fall are absolutely gorgeous â think 60-75Â°F with blue skies."
          />
          <FAQ
            q="How's the food scene compared to NYC?"
            a="Charlotte's food scene has exploded in the last decade. You'll find incredible BBQ, Southern cuisine, and a growing international food scene. It's not NYC-level variety yet, but the quality is excellent and prices are half. Plus, you can actually get a reservation."
          />
          <FAQ
            q="What about the airport? Can I still get to NYC easily?"
            a="Charlotte Douglas International Airport (CLT) is an American Airlines hub with direct flights to all three NYC airports. Flight time is about 2 hours. You can be back in Manhattan for dinner with same-day travel."
          />
          <FAQ
            q="Should I buy in NC or SC (Fort Mill area)?"
            a="Both are great options. South Carolina has no state income tax on the first $0-$3,460 and a lower overall rate. Fort Mill specifically has outstanding schools. North Carolina has a flat 4.5% state income tax. Your best choice depends on your commute, school preferences, and tax situation. We can help you figure this out."
          />
        </div>
      </section>

      {/* âââ Contact CTA âââ */}
      <section
        id="contact"
        className="py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #2A384C 0%, #3a4f6a 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Sansita, serif" }}
          >
            Ready to Make the Move?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Home Grown Property Group specializes in helping New York transplants find their
            perfect Charlotte home. Whether you&apos;re 6 months out or ready to move next week,
            we&apos;re here to help.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8 max-w-lg mx-auto">
            <a
              href="tel:9802619222"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all hover:scale-105"
              style={{ background: "#A0B2C2", color: "#2A384C" }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              980-261-9222
            </a>
            <a
              href="mailto:brian@homegrownpropertygroup.com"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border-2 text-white hover:bg-white/10 transition-all"
              style={{ borderColor: "#A0B2C2" }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email Us
            </a>
          </div>
          <p className="text-sm text-white/50">
            Home Grown Property Group Â· Charlotte, NC Â· Real Broker, LLC
          </p>
        </div>
      </section>

      {/* âââ Footer âââ */}
      <footer className="py-8 px-4" style={{ background: "#1a2535" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            Â© {new Date().getFullYear()} Home Grown Property Group. All rights reserved.
          </p>
          <p className="text-xs text-white/30 max-w-lg text-center md:text-right">
            This guide is for informational purposes only. Housing prices, rates, and market
            data are approximations and may change. Contact us for current market information.
          </p>
        </div>
      </footer>
    </main>
  );
}
