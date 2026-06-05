'use client';

import { useState } from 'react';
import Link from 'next/link';
import { companies, gradeColors } from '@/data/companies';
import Footer from '@/components/Footer';

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <div className="text-3xl mb-2">✓</div>
        <p className="text-white font-bold">You're on the list.</p>
        <p className="text-emerald-300 text-sm mt-1">We'll email you when the full product launches.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/10 text-white placeholder-emerald-300"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-60 shrink-0"
        >
          {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-300 text-xs text-center">Something went wrong — please try again.</p>
      )}
    </div>
  );
}

function GradePill({ grade }) {
  const colors = gradeColors[grade];
  return (
    <span className={`${colors.bg} ${colors.text} text-sm font-black px-3 py-1 rounded-lg inline-block`}>
      {grade}
    </span>
  );
}

function SampleCard({ company }) {
  const colors = gradeColors[company.overallGrade];
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col">
      <div className={`${colors.bg} px-4 py-3 flex items-center gap-3`}>
        <span className={`${colors.text} text-4xl font-black w-12 h-12 rounded-xl flex items-center justify-center bg-black/10`}>
          {company.overallGrade}
        </span>
        <div className="text-white">
          <div className="font-bold text-sm leading-tight">{company.name}</div>
          <div className="text-xs opacity-75">{company.location}</div>
        </div>
      </div>
      <div className="px-4 py-3 flex-1">
        <p className="text-slate-500 text-xs leading-relaxed">{company.highlights[0]}</p>
      </div>
    </div>
  );
}

const SAMPLE_IDS = ['bell-evans', 'hormel-foods', 'tyson-foods'];

export default function HomePage() {
  const sampleCompanies = SAMPLE_IDS.map((id) => companies.find((c) => c.id === id)).filter(Boolean);

  const meatCount = companies.filter((c) => c.category === 'meat').length;
  const produceCount = companies.filter((c) => c.category === 'produce').length;
  const fCount = companies.filter((c) => c.overallGrade === 'F').length;
  const bPlusCount = companies.filter((c) => ['A', 'B'].includes(c.overallGrade)).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* MVP banner */}
      <div className="bg-amber-50 border-b border-amber-200 text-center px-4 py-2">
        <p className="text-amber-800 text-xs font-medium">
          🚧 This is an early demo — the full FarmLens product is in development.{' '}
          <a href="#waitlist" className="underline font-bold hover:text-amber-900">Join the waitlist</a> to be notified when it launches.
        </p>
      </div>

      {/* Nav */}
      <nav className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-black text-emerald-700 text-xl tracking-tight">FarmLens</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/methodology" className="text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors">
              Methodology
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors">
              Contact
            </Link>
            <Link
              href="/scan"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Start Scanning →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-emerald-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="text-sm font-semibold text-emerald-300 uppercase tracking-widest mb-4">
            Food Transparency AI
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Know what's in your food.
            <br />
            <span className="text-emerald-400">Before you buy it.</span>
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl mt-6 max-w-xl mx-auto leading-relaxed">
            FarmLens rates food brands using public records — USDA, FDA, and independent certifications — so you can see what's really behind the products you buy.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/scan"
              className="bg-white text-emerald-900 font-black px-8 py-4 rounded-2xl text-lg hover:bg-emerald-50 transition-colors shadow-lg"
            >
              📷 Scan a Product
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-emerald-800 text-white">
        <div className="max-w-3xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-black">{meatCount}</div>
            <div className="text-xs text-emerald-300 font-medium">Meat Companies</div>
          </div>
          <div>
            <div className="text-2xl font-black">{produceCount}</div>
            <div className="text-xs text-emerald-300 font-medium">Produce Companies</div>
          </div>
          <div>
            <div className="text-2xl font-black text-red-300">{fCount}</div>
            <div className="text-xs text-emerald-300 font-medium">Companies Failing</div>
          </div>
          <div>
            <div className="text-2xl font-black text-lime-300">{bPlusCount}</div>
            <div className="text-xs text-emerald-300 font-medium">B or Better</div>
          </div>
        </div>
      </section>

      {/* Waitlist — above How It Works */}
      <section id="waitlist" className="bg-emerald-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 text-center">
          <h2 className="text-2xl font-black mb-2">Get notified when the real thing comes out.</h2>
          <p className="text-emerald-300 text-sm mb-8 max-w-md mx-auto">
            This is an early demo. The full FarmLens — with more brands, local farms, and direct verification — is in development. Leave your email and we'll tell you when it's ready.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📷', step: '1', title: 'Take a Photo', desc: 'Snap the product, its packaging, or the brand label. The more of the label you capture, the more accurate the match.' },
            { icon: '🤖', step: '2', title: 'AI Analyzes It', desc: `Our AI identifies the product type and any visible brand. It searches our database of ${companies.length} rated companies.` },
            { icon: '📊', step: '3', title: 'Get Your Grade', desc: 'See an A–F letter grade with a full breakdown: food safety, labor, environment, animal welfare, and transparency.' },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">Step {item.step}</div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample results */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Real Grades. Real Research.</h2>
          <p className="text-slate-500 text-center text-sm mb-8">
            Compiled from FDA, CDC, USDA FSIS, OSHA, DOJ, EWG, ProPublica, the New York Times, and more.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {sampleCompanies.map((company) => (
              <SampleCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* What we grade */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-10">What We Grade</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: '🧬', title: 'Food Safety', desc: 'Recalls, outbreaks, deaths attributed to products, and regulatory enforcement history.' },
            { icon: '🌱', title: 'Environment', desc: 'GHG emissions, water pollution, deforestation, pesticide runoff, and sustainability commitments.' },
            { icon: '🐄', title: 'Animal Welfare', desc: 'Third-party certifications, antibiotic use, confinement practices, and welfare commitments.' },
            { icon: '👷', title: 'Labor Practices', desc: 'Worker injuries, wages, COVID-19 response, harassment settlements, union relations, and child labor.' },
            { icon: '🔍', title: 'Transparency', desc: 'Third-party certifications, sustainability reporting quality, and supply chain disclosure.' },
            { icon: '🌿', title: 'Pesticide Use', desc: 'For produce: EWG Dirty Dozen data, residue testing, organic certifications, and farmworker exposure.' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="text-2xl shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grade scale */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-xl font-black text-center mb-8">The Grade Scale</h2>
          <div className="space-y-3 max-w-lg mx-auto">
            {[
              { grade: 'A', label: 'Outstanding', desc: 'A leader in food safety, labor, and environmental standards.' },
              { grade: 'B', label: 'Above Average', desc: 'Meaningfully better than industry norms with room to improve.' },
              { grade: 'C', label: 'Industry Average', desc: 'Some positives but notable documented concerns.' },
              { grade: 'D', label: 'Below Average', desc: 'Significant documented violations or serious deficiencies.' },
              { grade: 'F', label: 'Failing', desc: 'Disqualifying violations: deaths, criminal conduct, or catastrophic failures.' },
            ].map(({ grade, label, desc }) => (
              <div key={grade} className="flex items-center gap-4">
                <GradePill grade={grade} />
                <div>
                  <span className="font-bold text-sm text-white">{label} — </span>
                  <span className="text-slate-400 text-sm">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Label Decoder */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Label Decoder</h2>
        <p className="text-slate-500 text-center text-sm mb-8">What these common claims legally mean — and what they don't.</p>
        <div className="space-y-4">
          {[
            {
              label: '"Natural"',
              verdict: 'Sounds meaningful. Isn\'t.',
              verdictColor: 'bg-red-50 text-red-700',
              content: 'On meat and poultry, USDA regulates "natural" to mean only that the product contains no artificial ingredients or added color and is minimally processed. It says nothing about how the animal was raised, what it was fed, or whether it received antibiotics or hormones. This is one of the clearest examples of a label that sounds meaningful but legally guarantees almost nothing about the animal\'s life or the farm\'s practices.',
            },
            {
              label: '"Grass-Fed" vs. "Grass-Finished"',
              verdict: 'Depends on the exact wording.',
              verdictColor: 'bg-amber-50 text-amber-700',
              content: '"Grass-fed" alone does not guarantee the animal ate only grass its entire life. Many cattle marketed as grass-fed are grain-finished in their final months — which changes the nutritional profile and the farming model. The claim that matches what most people assume "grass-fed" means is "100% grass-fed" or "grass-finished." If a label says "grass-fed" without "finished" or "100%," the animal may have spent its last months in a feedlot.',
            },
            {
              label: '"No Hormones Added" / "Raised Without Hormones"',
              verdict: 'Meaningful on beef. Theater on chicken and pork.',
              verdictColor: 'bg-amber-50 text-amber-700',
              content: 'USDA already prohibits the use of hormones in raising pigs and chickens — so "no hormones added" on poultry or pork is marketing a legal baseline as though it\'s a special commitment. It means nothing beyond what every product in that category already is by law. On beef, it is a real distinction: growth hormones are permitted in cattle, so a verified "no hormones" claim on beef reflects an actual choice the producer made.',
            },
            {
              label: '"No Antibiotics" / "Raised Without Antibiotics"',
              verdict: 'Meaningful only if a certifier backs it.',
              verdictColor: 'bg-amber-50 text-amber-700',
              content: 'USDA\'s officially approved claims are "raised without antibiotics" and "no antibiotics ever." The phrase "antibiotic-free" is not an officially approved USDA label claim and is sometimes used loosely. Without third-party verification — such as USDA Process Verified, Certified Humane, or Global Animal Partnership — there is no independent audit confirming the claim. When you see this label, the question to ask is: who verified it?',
            },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <h3 className="font-black text-slate-900">{item.label}</h3>
                <span className={`${item.verdictColor} text-xs font-bold px-3 py-1 rounded-full shrink-0`}>{item.verdict}</span>
              </div>
              <div className="px-5 py-4">
                <p className="text-slate-600 text-sm leading-relaxed">{item.content}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-400 text-center pt-2">Sources: USDA Food Safety and Inspection Service (FSIS), USDA Agricultural Marketing Service (AMS)</p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-3">Ready to know what's in your food?</h2>
        <p className="text-slate-500 mb-8">Start scanning products at the grocery store, at home, or anywhere.</p>
        <Link
          href="/scan"
          className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-black px-10 py-4 rounded-2xl text-xl transition-colors shadow-lg"
        >
          📷 Scan Now — It's Free
        </Link>
      </section>

      <Footer />
    </div>
  );
}
