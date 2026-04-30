/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-green-600', 'bg-lime-600', 'bg-amber-500', 'bg-orange-500', 'bg-red-600',
    'bg-green-50', 'bg-lime-50', 'bg-amber-50', 'bg-orange-50', 'bg-red-50',
    'text-green-800', 'text-lime-800', 'text-amber-800', 'text-orange-800', 'text-red-800',
    'border-green-600', 'border-lime-600', 'border-amber-500', 'border-orange-500', 'border-red-600',
    'text-white',
  ],
  plugins: [],
};
