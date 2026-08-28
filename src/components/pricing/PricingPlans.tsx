'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';

export const PricingPlans: React.FC = () => {
  const { user } = useAuth();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Blueprint',
      badge: 'ARCHITECTURAL ACCESS',
      description: 'Ideal for independent developers, interior planners, and private homeowners exploring spatial feasibility.',
      monthlyPrice: 49,
      yearlyPrice: 470,
      features: [
        'High-resolution 2D CAD vector floorplans (.DWG & .PDF)',
        'Standard material & finish spec sheets',
        'Unlimited Groq AI Space Planner simulations',
        'Public Live Studio collaboration channel',
        'Community design archive access',
      ],
      cta: 'Subscribe to Starter',
      popular: false,
    },
    {
      id: 'studio_pro',
      name: 'Studio Pro Tier',
      badge: 'MOST POPULAR · RESIDENTIAL & COMMERCIAL',
      description: 'Complete 3D BIM data, Passivhaus energy calculations, and direct design principal reviews.',
      monthlyPrice: 199,
      yearlyPrice: 1900,
      features: [
        'Everything in Starter Blueprint',
        'Full 3D BIM models (.RVT Revit & .IFC format)',
        'Passivhaus thermal mass & acoustic calculations',
        'Monthly 45-minute 1-on-1 private video review',
        'Priority queue in Live Studio consultations',
        'Cloudinary high-res site photo asset locker',
        'Direct email dispatch confirmation via Resend',
      ],
      cta: 'Get Studio Pro',
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Developer',
      badge: 'URBAN MASTERPLANS & CIVIC',
      description: 'Dedicated architectural partner assignment, on-site feasibility coordination, and custom structural engineering.',
      monthlyPrice: 799,
      yearlyPrice: 7600,
      features: [
        'Everything in Studio Pro',
        'Dedicated G3 Senior Partner assigned (e.g. Elena Vance)',
        'Custom masterplan zoning & hydrodynamic modeling',
        'Bi-weekly structural engineering alignment meetings',
        'Unlimited BIM & CAD team downloads',
        'Custom procurement assistance for travertine & mass timber',
        'SLA 4-hour direct response guarantee',
      ],
      cta: 'Start Enterprise Developer',
      popular: false,
    },
  ];

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          billingInterval,
          successUrl: `${window.location.origin}/dashboard?payment=success`,
          cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start Stripe checkout session');
      }
    } catch (err: any) {
      console.error(err);
      alert('Checkout error: ' + err.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  const faqs = [
    {
      q: 'Can I upgrade or cancel my subscription at any time?',
      a: 'Yes. All plans can be adjusted or cancelled at any time from your Client Dashboard with zero penalty.',
    },
    {
      q: 'What file formats are provided for blueprints and models?',
      a: 'We provide AutoCAD (.DWG), Adobe Vector (.PDF), Autodesk Revit (.RVT), and OpenBIM (.IFC) compliant packages.',
    },
    {
      q: 'Are the architectural consultations conducted by real registered architects?',
      a: 'Yes. Every session is led by our licensed FAIA/AIA principals and certified Passivhaus engineers.',
    },
    {
      q: 'Do you offer custom one-off commissions without a recurring plan?',
      a: 'Yes. You can book an individual project consultation directly through our Contact & Booking page.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-stone-100 border border-stone-200 text-xs font-mono text-stone-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>STRIPE SECURE CHECKOUT</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Architectural Subscriptions & BIM Plans
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Gain direct access to CAD blueprints, full 3D BIM models, and continuous consultation with G3 design partners.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span
            className={`text-sm font-medium cursor-pointer ${
              billingInterval === 'monthly' ? 'text-stone-950 font-bold' : 'text-stone-500'
            }`}
            onClick={() => setBillingInterval('monthly')}
          >
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-stone-900 rounded-full p-1 transition-colors relative"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                billingInterval === 'yearly' ? 'translate-x-7 bg-amber-400' : 'translate-x-0'
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium cursor-pointer flex items-center gap-1.5 ${
              billingInterval === 'yearly' ? 'text-stone-950 font-bold' : 'text-stone-500'
            }`}
            onClick={() => setBillingInterval('yearly')}
          >
            Annual Billing
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
        {plans.map((plan) => {
          const price = billingInterval === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
          const isCurrentPlan = user?.subscription?.plan === plan.id && user?.subscription?.status === 'active';

          return (
            <div
              key={plan.id}
              className={`rounded-xl p-8 flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'bg-white border-2 border-stone-900 shadow-elevated ring-1 ring-stone-900/10'
                  : 'bg-white border border-stone-200 shadow-subtle hover:border-stone-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-stone-900 text-amber-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Recommended Tier
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold block mb-1">
                    {plan.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900">{plan.name}</h3>
                  <p className="text-stone-600 text-xs mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-stone-900 font-mono">${price}</span>
                  <span className="text-xs text-stone-500 font-mono">
                    /{billingInterval === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase text-stone-400 font-semibold block">
                    INCLUDED SPECIFICATIONS:
                  </span>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-stone-100">
                {isCurrentPlan ? (
                  <div className="w-full py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-center font-bold text-xs rounded">
                    Current Active Subscription
                  </div>
                ) : (
                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={loadingPlan === plan.id}
                    className={`w-full py-3.5 rounded font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                      plan.popular
                        ? 'bg-stone-900 hover:bg-stone-800 text-white'
                        : 'bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-900'
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting Stripe...</span>
                      </>
                    ) : (
                      <>
                        <span>{plan.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-8 pt-8 border-t border-stone-200">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-stone-900">Frequently Asked Questions</h3>
          <p className="text-stone-600 text-sm">Everything you need to know about G3 plans and deliverables.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                {faq.q}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
