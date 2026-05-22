'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { gradeColors, gradeDescriptions } from '@/data/companies';

// ─── Helpers ────────────────────────────────────────────────────────────────

function gradeLabel(grade) {
  return gradeColors[grade] ?? gradeColors['C'];
}

function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
          else { w = Math.round((w * maxDim) / h); h = maxDim; }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
    };
  });
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function GradeBadge({ grade, size = 'lg' }) {
  const colors = gradeLabel(grade);
  const sizeClass = size === 'lg'
    ? 'text-7xl w-32 h-32'
    : 'text-2xl w-10 h-10';
  return (
    <div className={`${colors.bg} ${colors.text} ${sizeClass} rounded-2xl flex items-center justify-center font-black shadow-lg`}>
      {grade}
    </div>
  );
}

function SubGrade({ label, grade }) {
  const colors = gradeLabel(grade);
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-slate-600 text-sm font-medium">{label}</span>
      <span className={`${colors.bg} ${colors.text} text-xs font-bold px-2.5 py-1 rounded-lg`}>
        {grade}
      </span>
    </div>
  );
}

function ResultCard({ detected, match }) {
  const { company, type: matchType } = match;
  const colors = gradeLabel(company.overallGrade);

  return (
    <div className="space-y-4">
      {/* Match type banner */}
      <div className={`text-sm font-medium px-4 py-2 rounded-xl ${matchType === 'exact' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
        {matchType === 'exact'
          ? `✓ Brand identified: "${detected.brandDetected}"`
          : detected.brandDetected
          ? `~ "${detected.brandDetected}" is not yet in our database — showing closest match for "${detected.productType}"`
          : `~ No brand visible in photo — showing closest match for "${detected.productType}"`}
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header with grade */}
        <div className={`${colors.bg} px-6 py-5 flex items-center gap-5`}>
          <GradeBadge grade={company.overallGrade} />
          <div className="text-white">
            <div className="text-xl font-bold leading-tight">{company.name}</div>
            <div className="text-sm opacity-80 mt-0.5">{company.location}</div>
            <div className="text-xs opacity-70 mt-1">{company.description}</div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Grade description */}
          <div className={`${colors.light} ${colors.lightText} rounded-xl px-4 py-3 text-sm font-medium`}>
            <span className="font-bold">{company.overallGrade}: </span>
            {gradeDescriptions[company.overallGrade]}
          </div>

          {/* Summary */}
          <p className="text-slate-600 text-sm leading-relaxed">{company.summary}</p>

          {/* Sub-ratings */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2">Rating Breakdown</h3>
            <div>
              {Object.entries(company.ratings).map(([label, grade]) => (
                <SubGrade key={label} label={label} grade={grade} />
              ))}
            </div>
          </div>

          {/* Key findings */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2">Key Findings</h3>
            <ul className="space-y-2">
              {company.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consumer advice */}
          <div className="bg-slate-50 rounded-xl px-4 py-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">What This Means For You</h3>
            <p className="text-slate-700 text-sm">{company.consumerAdvice}</p>
          </div>

          {/* Source note */}
          <p className="text-xs text-slate-400 text-center">
            Research compiled from FDA, CDC, USDA FSIS, OSHA, EPA, DOJ, EWG, ProPublica, NYT, The Guardian, Reuters &amp; more. Grades current as of April 2026.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ScanPage() {
  const [preview, setPreview] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, HEIC, etc.)');
      return;
    }
    setError(null);
    setResult(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    const compressed = await compressImage(file);
    setCompressedImage(compressed);
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    if (!compressedImage) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: compressedImage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed.');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setCompressedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-black text-emerald-700 text-lg tracking-tight">FarmLens</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/methodology" className="text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors">
              Methodology
            </Link>
            {(preview || result) && (
              <button onClick={handleReset} className="text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors">
                ← New scan
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 pb-20 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Scan Your Food</h1>
          <p className="text-slate-500 text-sm mt-1">
            Upload a photo of any food product or its packaging. Include the brand label for the most accurate results.
          </p>
        </div>

        {/* Upload area or preview */}
        {!preview ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/30'
            }`}
          >
            <div className="text-5xl mb-4">📷</div>
            <p className="font-semibold text-slate-700">Drop a photo here</p>
            <p className="text-sm text-slate-400 mt-1">or tap to upload from your camera roll</p>
            <p className="text-xs text-slate-300 mt-3">JPG, PNG, HEIC, WEBP supported</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Image preview */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <img src={preview} alt="Preview" className="w-full max-h-72 object-contain bg-slate-50" />
            </div>

            {/* Analyze button */}
            {!result && !loading && (
              <button
                onClick={handleAnalyze}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-sm"
              >
                Analyze This Food →
              </button>
            )}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 flex flex-col items-center gap-3 shadow-sm">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin" />
            <p className="text-slate-600 font-medium">AI is analyzing your photo…</p>
            <p className="text-slate-400 text-sm">Identifying product and brand</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-red-700 text-sm">
            <span className="font-semibold">Error: </span>{error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-4">
            {/* Detected info */}
            <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 shadow-sm">
              <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Detected</p>
              <p className="text-slate-800 font-semibold capitalize">{result.detected.productType}</p>
              <p className="text-slate-400 text-xs mt-0.5">{result.detected.description}</p>
            </div>

            {result.match ? (
              <ResultCard detected={result.detected} match={result.match} />
            ) : (
              <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 text-amber-700 text-sm">
                {result.message}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
