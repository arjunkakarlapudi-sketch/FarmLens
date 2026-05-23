import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FarmLens — Food Transparency AI',
  description: 'FarmLens rates food brands using public records — USDA, FDA, and independent certifications — so you can see what\'s really behind the products you buy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Cloudflare Web Analytics — replace token with your own from dash.cloudflare.com/analytics */}
        {process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN}"}`}
          />
        )}
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
