import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact — FarmLens',
  description: 'Get in touch with FarmLens.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-black text-emerald-700 text-xl tracking-tight">FarmLens</span>
          </Link>
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

      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Contact</h1>
        <p className="text-slate-500 mb-10">Questions, feedback, rating appeals, or press inquiries.</p>

        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-black text-slate-800 mb-1">General Questions</h2>
            <p className="text-slate-500 text-sm mb-3">Feedback about the app, suggestions for brands to add, or anything else.</p>
            <p className="text-sm text-slate-400 italic">Contact email coming soon.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-black text-slate-800 mb-1">Rating Appeals</h2>
            <p className="text-slate-500 text-sm mb-3">
              If you represent a brand and believe your rating is inaccurate, you can submit an appeal with documentation.
              We review every appeal within 14 days. See our{' '}
              <Link href="/methodology#appeals" className="text-emerald-700 hover:underline font-medium">
                full appeals policy
              </Link>.
            </p>
            <p className="text-sm text-slate-400 italic">Appeals email coming soon.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-black text-slate-800 mb-1">Press & Media</h2>
            <p className="text-slate-500 text-sm">
              For press inquiries or interview requests, please reach out directly.
            </p>
            <p className="text-sm text-slate-400 italic mt-2">Press email coming soon.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
