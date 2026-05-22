import Link from 'next/link';
import { companies, gradeColors } from '@/data/companies';

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
            FarmLens uses AI to give you instant A–F grades on the farms and brands behind every product you pick up — based on food safety, labor practices, environment, and animal welfare.
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

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📷', step: '1', title: 'Take a Photo', desc: 'Snap the product, its packaging, or the brand label. The more of the label you capture, the more accurate the match.' },
            { icon: '🤖', step: '2', title: 'AI Analyzes It', desc: 'Claude AI identifies the product type and any visible brand. It searches our database of 36 rated companies.' },
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

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <p className="text-slate-400 text-xs leading-relaxed max-w-xl mx-auto">
            Research compiled from FDA, CDC, USDA FSIS, OSHA, EPA, DOJ, EWG, Food &amp; Water Watch, ProPublica, the New York Times, The Guardian, Reuters, and more. Grades reflect documented public records as of April 2026. FarmLens is not affiliated with any rated company.
          </p>
          <p className="text-slate-300 text-xs mt-3">© 2026 FarmLens</p>
        </div>
      </footer>
    </div>
  );
}
