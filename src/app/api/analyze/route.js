import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import {
  findCompanyByBrand,
  findCompanyByProductType,
} from '@/data/companies';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured. See setup instructions.' },
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

  // Parse data URL  →  base64 + mediaType
  const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ error: 'Invalid image format.' }, { status: 400 });
  }
  const mediaType = match[1];
  const base64Data = match[2];

  // Call Claude Vision
  let detected;
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: [
        {
          type: 'text',
          text: 'You are a food product analyzer for FarmLens, an agricultural transparency app. You analyze images of food products to identify what the product is and any visible brand names. Always return valid JSON only — no markdown, no code blocks, no other text.',
          cache_control: { type: 'ephemeral' },
        },
      ],
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
    });

    const raw = message.content[0].text.trim();
    // Strip markdown code fences if Claude included them
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
    detected = JSON.parse(cleaned);
  } catch (err) {
    console.error('Claude API error:', err?.message ?? err);
    const msg = err?.status === 401
      ? 'Invalid API key. Check your ANTHROPIC_API_KEY in Vercel settings.'
      : err?.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : 'AI analysis failed. Please try again.';
    return NextResponse.json({ error: msg }, { status: 502 });
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
