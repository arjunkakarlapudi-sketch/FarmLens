import { NextResponse } from 'next/server';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { brandName, email } = body;
  if (!brandName || !email) {
    return NextResponse.json({ error: 'Brand name and email are required.' }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  // Log the request (always visible in Vercel logs)
  console.log(`[Brand Request] Brand: "${brandName}" | Email: ${email} | Time: ${new Date().toISOString()}`);

  // Send to webhook if configured (e.g. Zapier → Google Sheets)
  const webhookUrl = process.env.BRAND_REQUEST_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          email,
          timestamp: new Date().toISOString(),
          source: 'FarmLens Brand Request',
        }),
      });
    } catch (err) {
      // Don't fail the request if webhook fails — still confirm to user
      console.error('Webhook error:', err?.message);
    }
  }

  return NextResponse.json({
    success: true,
    message: `Thanks — we'll email you when ${brandName} is rated.`,
  });
}
