import Link from 'next/link';

export const metadata = {
  title: 'Methodology — FarmLens',
  description: 'How FarmLens rates food brands and farms.',
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-black text-emerald-700 text-xl tracking-tight">FarmLens</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/methodology" className="text-sm font-semibold text-emerald-700 border-b-2 border-emerald-700 pb-0.5">
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

      <main className="max-w-3xl mx-auto px-4 py-10 pb-20">

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900">FarmLens Rating Methodology</h1>
          <p className="text-slate-500 mt-2 text-sm">How we research, score, and grade every brand in our database.</p>
        </div>

        <div className="space-y-10">

          {/* Purpose */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Purpose</h2>
            <p className="text-slate-600 leading-relaxed">
              FarmLens rates food brands and farms to give consumers honest, source-backed information about the products they buy. We rate based on publicly available records, third-party certifications, and reputable news sources. We do not rate brands based on their own marketing.
            </p>
          </section>

          {/* What We Rate */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">What We Currently Rate</h2>
            <p className="text-slate-600 leading-relaxed">
              FarmLens currently rates national and regional food brands commonly found in major grocery stores. We are expanding to include local farms supplying Austin-area grocery stores, and eventually farms that opt into direct verification through FarmLens.
            </p>
          </section>

          {/* Five Categories */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">The Five Categories</h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Every brand or farm is scored on five categories, each on a 0–100 scale. The categories differ slightly between meat/dairy/egg brands and produce brands.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Meat */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <h3 className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">Meat, Dairy & Egg Brands</h3>
                <ul className="space-y-2">
                  {[
                    ['Food Safety', '25%'],
                    ['Animal Welfare', '25%'],
                    ['Environmental Impact', '16.67%'],
                    ['Employee Treatment', '16.67%'],
                    ['Transparency', '16.67%'],
                  ].map(([label, weight]) => (
                    <li key={label} className="flex justify-between items-center text-sm">
                      <span className="text-slate-700 font-medium">{label}</span>
                      <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded-lg">{weight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Produce */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <h3 className="font-black text-slate-800 mb-3 text-sm uppercase tracking-wide">Produce Brands</h3>
                <ul className="space-y-2">
                  {[
                    ['Food Safety', '25%'],
                    ['Pesticide Use', '25%'],
                    ['Environmental Impact', '16.67%'],
                    ['Employee Treatment', '16.67%'],
                    ['Transparency', '16.67%'],
                  ].map(([label, weight]) => (
                    <li key={label} className="flex justify-between items-center text-sm">
                      <span className="text-slate-700 font-medium">{label}</span>
                      <span className="text-emerald-700 font-black bg-emerald-50 px-2 py-0.5 rounded-lg">{weight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* What Each Measures */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">What Each Category Measures</h2>
            <div className="space-y-3">
              {[
                ['Food Safety', 'FDA warning letters, USDA inspection records, product recalls within the last five years, and documented contamination events.'],
                ['Animal Welfare', 'Third-party certifications (Certified Humane, Animal Welfare Approved, Global Animal Partnership), documented housing and slaughter practices, and any reported violations.'],
                ['Pesticide Use', 'USDA Organic certification, third-party pesticide residue testing, and documented practices around synthetic pesticide use.'],
                ['Environmental Impact', 'Water use, soil practices, packaging, and documented sustainability certifications (Regenerative Organic, Rainforest Alliance, and similar).'],
                ['Employee Treatment', 'Department of Labor violations, OSHA records, documented labor practices, and reported worker conditions.'],
                ['Transparency', 'Whether the brand publishes sourcing information, supply chain details, and responds to public inquiries about their practices.'],
              ].map(([title, desc]) => (
                <div key={title} className="bg-white rounded-xl border border-slate-100 px-5 py-4 shadow-sm">
                  <p className="text-sm font-black text-slate-800 mb-1">{title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why These Weights */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Why These Weights</h2>
            <p className="text-slate-600 leading-relaxed">
              Food Safety and either Animal Welfare or Pesticide Use are weighted highest because they represent the most direct health and ethical risks to consumers. The remaining categories are weighted equally.
            </p>
          </section>

          {/* Letter Grade Scale */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Overall Letter Grade</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Category scores are combined using the weights above to produce a 0–100 overall score, which converts to a letter grade:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                ['A', '90–100', 'bg-green-600'],
                ['B', '80–89', 'bg-lime-600'],
                ['C', '70–79', 'bg-amber-500'],
                ['D', '60–69', 'bg-orange-500'],
                ['F', 'Below 60', 'bg-red-600'],
              ].map(([grade, range, bg]) => (
                <div key={grade} className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 px-4 py-3 shadow-sm">
                  <span className={`${bg} text-white font-black text-lg w-9 h-9 rounded-xl flex items-center justify-center`}>{grade}</span>
                  <span className="text-slate-600 text-sm font-medium">{range}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Sources */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Sources We Use</h2>
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <ul className="space-y-2">
                {[
                  'U.S. Department of Agriculture (USDA) inspection and certification databases',
                  'U.S. Food and Drug Administration (FDA) warning letters and recall records',
                  'Occupational Safety and Health Administration (OSHA) violation records',
                  'Department of Labor wage and hour violation records',
                  'Certified Humane, Animal Welfare Approved, Global Animal Partnership',
                  'USDA Organic, Regenerative Organic Certified, Rainforest Alliance',
                  'Reuters, Associated Press, ProPublica, and other reputable news outlets',
                  'Peer-reviewed research where applicable',
                ].map((source) => (
                  <li key={source} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
                We do not use a brand's own marketing materials, press releases, or self-published sustainability reports as primary sources.
              </p>
            </div>
          </section>

          {/* Our Process */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Our Process</h2>
            <p className="text-slate-600 leading-relaxed">
              Each rating is researched using AI-assisted lookup of the sources listed above. Every rating is reviewed and verified by a human before being published. We retain source links for every rating in our internal database and can provide them on request.
            </p>
          </section>

          {/* Direct Verification */}
          <section>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-6 py-5">
              <h2 className="text-lg font-black text-emerald-900 mb-2">Direct Verification <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full ml-1 align-middle">Coming Soon</span></h2>
              <p className="text-emerald-800 text-sm leading-relaxed">
                In the future, FarmLens will offer farms the option to participate in direct verification, where we work with the farm to document their practices firsthand. Direct verification will be clearly labeled in the app so users can distinguish it from public-records ratings. Participation in direct verification will not change a farm's score in either direction — it only adds detail and confidence to the existing rating.
              </p>
            </div>
          </section>

          {/* Appeals */}
          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-3">Appeals</h2>
            <p className="text-slate-600 leading-relaxed">
              If a brand or farm believes their rating is inaccurate, they can submit a written appeal to us. We commit to reviewing every appeal within 14 days. Appeals must include specific evidence — documentation, certifications, or sources — supporting the requested change. We do not change ratings based on opinion or pressure alone.
            </p>
          </section>

          {/* Limitations */}
          <section>
            <div className="bg-slate-100 rounded-2xl px-6 py-5">
              <h2 className="text-lg font-black text-slate-700 mb-2">Limitations</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our ratings are based on publicly available information. A brand may have practices that are not reflected in public records, either better or worse than what we can document. We update ratings as new information becomes available, but there may be a lag between a real-world change and an updated score.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
