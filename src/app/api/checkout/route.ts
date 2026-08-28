import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { planId, billingInterval = 'monthly', successUrl, cancelUrl } = await req.json();

    const planPrices: Record<string, { monthly: number; yearly: number; name: string }> = {
      starter: { monthly: 4900, yearly: 47000, name: 'G3 Starter Blueprint Plan' },
      studio_pro: { monthly: 19900, yearly: 190000, name: 'G3 Studio Pro Tier' },
      enterprise: { monthly: 79900, yearly: 760000, name: 'G3 Enterprise Developer Suite' },
    };

    const selected = planPrices[planId] || planPrices['studio_pro'];
    const amount = billingInterval === 'yearly' ? selected.yearly : selected.monthly;

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selected.name,
              description: `Full access to architectural drawings, BIM models, and priority studio consultations (${billingInterval}).`,
            },
            unit_amount: amount,
            recurring: {
              interval: billingInterval === 'yearly' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${origin}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${origin}/pricing?payment=cancelled`,
      customer_email: user?.email,
      metadata: {
        userId: user?.id || 'guest',
        planId,
        billingInterval,
      },
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
