import { NextResponse } from 'next/server';
import {
  findCompanyByBrand,
  findCompanyByProductType,
} from '@/data/companies';

export const maxDuration = 30; // give Vercel 30s before timeout

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured.' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { image } = body;
  if (!image) {
    return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
  }

  // Parse data URL → base64 + mediaType
  const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: 'Invalid image format.' }, { status: 400 });
  }
  const mediaType = match[1];
  const base64Data = match[2];

  // Call Anthropic API directly via fetch
  let detected;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 512,
        system: 'You are a food product analyzer for FarmLens, an agricultural transparency app. You analyze images of food products to identify what the product is and any visible brand names. Always return valid JSON only — no markdown, no code blocks, no other text.',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mediaType, data: base64Data },
              },
              {
                type: 'text',
                text: `Analyze this image and return ONLY a JSON object:
{
  "productType": "specific food product (e.g. 'chicken breast', 'strawberries', 'ground beef', 'bagged salad')",
  "category": "meat" or "produce" or "unknown",
  "brandDetected": "exact brand or farm name visible in image" or null,
  "confidence": "high" or "medium" or "low",
  "description": "one-sentence description of what you see"
}

Focus on: brand logos, labels, text on packaging, and the type of food. If no food is visible, use category "unknown".`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return NextResponse.json({ error: `Anthropic ${response.status}: ${errText}` }, { status: 502 });
    }

    const data = await response.json();
    const raw = data.content[0].text.trim();
    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    detected = JSON.parse(cleaned);
  } catch (err) {
    console.error('Analysis error:', err?.message ?? err);
    return NextResponse.json(
      { error: 'AI analysis failed. Please try again.' },
      { status: 502 }
    );
  }

  if (detected.category === 'unknown') {
    return NextResponse.json({
      detected,
      match: null,
      message: "We couldn't identify a food product in this image. Try a clearer photo of the product or its packaging.",
    });
  }

  // Database lookup
  let company = null;
  let matchType = 'closest';

  if (detected.brandDetected) {
    company = findCompanyByBrand(detected.brandDetected);
    if (company) matchType = 'exact';
  }

  if (!company) {
    company = findCompanyByProductType(detected.productType, detected.category);
    matchType = 'closest';
  }

  return NextResponse.json({ detected, match: { type: matchType, company } });
}
