import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-black text-emerald-700 tracking-tight">FarmLens</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/methodology" className="text-slate-500 hover:text-emerald-700 font-medium transition-colors">
              Methodology
            </Link>
            <Link href="/contact" className="text-slate-500 hover:text-emerald-700 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/scan" className="text-slate-500 hover:text-emerald-700 font-medium transition-colors">
              Scan a Product
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-5">
          <p className="text-slate-400 text-xs leading-relaxed text-center max-w-2xl mx-auto">
            Research compiled from FDA, CDC, USDA FSIS, OSHA, EPA, DOJ, EWG, ProPublica, the New York Times, The Guardian, Reuters, and more.
            Grades reflect documented public records. FarmLens is not affiliated with any rated company.
          </p>
          <p className="text-slate-300 text-xs text-center mt-3">© 2026 FarmLens</p>
        </div>
      </div>
    </footer>
  );
}
