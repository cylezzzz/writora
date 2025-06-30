// Hybrid Onboarding Strategy für Writora

// 1. CUSTOM ONBOARDING FLOW (Erste Experience)
// components/onboarding/OnboardingFlow.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, ArrowRight, BookOpen, Target } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    bookIdea: '',
    genre: '',
    targetAudience: '',
    experience: ''
  });

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Willkommen bei Writora! 🎉',
      description: 'Lass uns dein erstes KI-Buch erstellen',
      component: <WelcomeStep />
    },
    {
      id: 'book-idea',
      title: 'Deine Buchidee',
      description: 'Erzähl uns von deiner Idee',
      component: <BookIdeaStep userData={userData} setUserData={setUserData} />
    },
    {
      id: 'genre-selection',
      title: 'Genre auswählen',
      description: 'Welches Genre passt am besten?',
      component: <GenreStep userData={userData} setUserData={setUserData} />
    },
    {
      id: 'book-generation',
      title: 'Buch wird erstellt...',
      description: 'Die KI arbeitet an deinem Buch',
      component: <GenerationStep userData={userData} />
    },
    {
      id: 'wow-moment',
      title: 'Dein erstes Buch ist fertig! 📚',
      description: 'Schau dir dein Werk an',
      component: <WowMomentStep userData={userData} />
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Writora</span>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <Badge className="bg-blue-100 text-blue-700 mb-2">
            Schritt {currentStep + 1} von {steps.length}
          </Badge>
          
          <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </CardHeader>
        
        <CardContent>
          {steps[currentStep].component}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Zurück
            </Button>
            
            <Button 
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              disabled={currentStep === steps.length - 1}
            >
              Weiter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 2. WOW-MOMENT COMPONENT (Trigger für Upgrade)
function WowMomentStep({ userData }: { userData: any }) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🎉 Dein "{userData.bookIdea}" ist fertig!
        </h3>
        
        <p className="text-gray-600 mb-6">
          8 Seiten, 2.400 Wörter, geschätzte Lesezeit: 12 Minuten
        </p>

        {/* Mini Book Preview */}
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-6">
          {[1,2,3,4,5,6,7,8].map((page) => (
            <div key={page} className="aspect-[3/4] bg-white border-2 border-gray-200 rounded shadow-sm p-1">
              <div className="text-xs text-gray-500">S.{page}</div>
              <div className="h-1 bg-gray-200 rounded mb-1"></div>
              <div className="h-1 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
            <BookOpen className="mr-2 h-4 w-4" />
            Buch im Studio öffnen
          </Button>
          
          <Button variant="outline" className="w-full" onClick={() => setShowUpgrade(true)}>
            <Target className="mr-2 h-4 w-4" />
            Mehr Bücher erstellen (Pro)
          </Button>
        </div>
      </div>

      {/* Upgrade Modal Trigger */}
      {showUpgrade && (
        <UpgradeModal onClose={() => setShowUpgrade(false)} />
      )}
    </div>
  );
}

// 3. UPGRADE MODAL (Mit Stripe Embedded)
function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upgrade zu Pro</CardTitle>
          <p className="text-gray-600">Erstelle unbegrenzt viele Bücher</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">€19,99</div>
                <div className="text-sm text-gray-600">pro Monat</div>
              </div>
            </div>

            {/* Hier kommt Stripe Embedded Checkout */}
            <StripeEmbeddedCheckout />
            
            <div className="text-center">
              <Button variant="ghost" onClick={onClose}>
                Später entscheiden
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 4. STRIPE EMBEDDED CHECKOUT COMPONENT
function StripeEmbeddedCheckout() {
  // Stripe Embedded Checkout Integration
  return (
    <div className="stripe-embedded-checkout">
      {/* Hier wird Stripe's Embedded Checkout geladen */}
      <div id="stripe-checkout" className="min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Checkout wird geladen...</p>
        </div>
      </div>
    </div>
  );
}

// 5. STRIPE INTEGRATION BACKEND
// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await request.json();

    // Erstelle Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card', 'sepa_debit', 'sofort'],
      line_items: [
        {
          price: priceId, // price_1ProMonthly oder price_1ProYearly
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/studio`,
      customer_email: session.user.email!,
      locale: 'de',
      automatic_tax: {
        enabled: true,
      },
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ 
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id 
    });

  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

// 6. STRIPE WEBHOOK HANDLER
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Update user to Pro
      await supabaseAdmin
        .from('users')
        .update({
          role: 'pro',
          subscription_status: 'active',
          books_limit: -1, // Unlimited
          stripe_customer_id: session.customer as string
        })
        .eq('id', session.metadata?.userId);
      
      break;

    case 'invoice.payment_succeeded':
      // Renew subscription
      break;

    case 'invoice.payment_failed':
      // Handle failed payment
      break;
  }

  return NextResponse.json({ received: true });
}

// 7. STRIPE PRODUCTS SETUP (In Stripe Dashboard)
/*
PRODUKTE ERSTELLEN:

1. Writora Pro Monthly
   - Preis: €19,99/Monat
   - Recurring: monthly
   - Price ID: price_1ProMonthly

2. Writora Pro Yearly  
   - Preis: €143,88/Jahr (40% Rabatt)
   - Recurring: yearly
   - Price ID: price_1ProYearly

3. Writora Enterprise
   - Preis: €149/Monat
   - Recurring: monthly
   - Price ID: price_1Enterprise
*/

// 8. ONBOARDING TRIGGER COMPONENTS
function WelcomeStep() {
  return (
    <div className="text-center space-y-4">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-6">
        <Sparkles className="h-12 w-12 text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900">
        Bereit für dein erstes KI-Buch?
      </h3>
      
      <p className="text-gray-600">
        In den nächsten 3 Minuten erstellen wir gemeinsam dein erstes Buch. 
        Komplett kostenlos, kein Haken!
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl mb-2">💭</div>
          <div className="text-sm text-gray-600">Idee teilen</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-sm text-gray-600">KI arbeitet</div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">📚</div>
          <div className="text-sm text-gray-600">Buch fertig</div>
        </div>
      </div>
    </div>
  );
}

function BookIdeaStep({ userData, setUserData }: any) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Worum soll dein Buch gehen?
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={4}
        placeholder="Z.B. Ein spannender Krimi über einen verschwundenen Künstler in Paris..."
        value={userData.bookIdea}
        onChange={(e) => setUserData({...userData, bookIdea: e.target.value})}
      />
      <p className="text-sm text-gray-500">
        💡 Tipp: Je detaillierter, desto besser wird dein Buch!
      </p>
    </div>
  );
}

function GenreStep({ userData, setUserData }: any) {
  const genres = [
    { id: 'krimi', name: 'Krimi', icon: '🕵️', desc: 'Spannung & Ermittlung' },
    { id: 'roman', name: 'Roman', icon: '📖', desc: 'Emotionen & Charaktere' },
    { id: 'kinderbuch', name: 'Kinderbuch', icon: '👶', desc: 'Für junge Leser' },
    { id: 'sachbuch', name: 'Sachbuch', icon: '📘', desc: 'Wissen & Tipps' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">Wähle das passende Genre für deine Idee:</p>
      
      <div className="grid grid-cols-2 gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setUserData({...userData, genre: genre.id})}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              userData.genre === genre.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">{genre.icon}</div>
            <div className="font-medium text-gray-900">{genre.name}</div>
            <div className="text-sm text-gray-600">{genre.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function GenerationStep({ userData }: any) {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Die KI schreibt dein Buch...
        </h3>
        <p className="text-gray-600">
          Basierend auf: "{userData.bookIdea}"
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div>✅ Genre-Struktur wird erstellt...</div>
        <div>✅ Charaktere werden entwickelt...</div>
        <div>⏳ Kapitel werden geschrieben...</div>
        <div>⏳ Finale Überarbeitung...</div>
      </div>
    </div>
  );
}

export { OnboardingFlow, WelcomeStep, BookIdeaStep, GenreStep, GenerationStep, WowMomentStep };
export { OnboardingFlow, WelcomeStep, BookIdeaStep, GenreStep, GenerationStep, WowMomentStep };