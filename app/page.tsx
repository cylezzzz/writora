'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Sparkles, Zap, Download, Users, Shield, ArrowRight, Check, Star } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const [isYearly, setIsYearly] = useState(false);

  const bookTypes = [
    { icon: '📖', name: 'Roman', desc: 'Liebesroman, Thriller, Sci-Fi, Fantasy' },
    { icon: '🕵️', name: 'Krimi', desc: 'Ermittlungen, Täterprofile, Spannung' },
    { icon: '📘', name: 'Sachbuch', desc: 'Ratgeber, Wissen, Tutorials' },
    { icon: '👶', name: 'Kinderbuch', desc: 'Einfache Sprache, Illustrationen' },
    { icon: '🧒', name: 'Malbuch', desc: 'KI-Ausmalbilder' },
    { icon: '🧑‍🏫', name: 'Fachbuch', desc: 'Wissenschaftlich, Gliederung' },
    { icon: '✍️', name: 'Tagebuch', desc: 'Interaktiv, Fragen, Übungen' },
    { icon: '🧚', name: 'Märchen', desc: 'Klassisch mit Moral' }
  ];

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-blue-500" />,
      title: 'KI-gestützte Erstellung',
      description: 'Erstelle komplette Bücher durch natürliche Unterhaltung mit fortschrittlicher KI'
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      title: 'Live-Vorschau',
      description: 'Sieh dein Buch in Echtzeit entstehen mit interaktiver Seitenvorschau'
    },
    {
      icon: <Download className="h-8 w-8 text-purple-500" />,
      title: 'KDP-Ready Export',
      description: 'Exportiere direkt für Amazon KDP mit automatischem Cover und Metadaten'
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: 'Schnelle Bearbeitung',
      description: 'Ändere jede Seite durch einfache Chat-Befehle in Sekunden'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* dein kompletter JSX-Inhalt */}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Writora
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Preise
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              Über uns
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Anmelden</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/register">Kostenlos starten</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
            🚀 Neu: KI-gestützte Bucherstellung
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            Schreibe komplette Bücher<br />
            durch einfache<br />
            <span className="text-blue-600">Unterhaltung</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Writora ist die erste Plattform, die es ermöglicht, komplette Bücher durch natürliche 
            Unterhaltung mit einer KI zu erstellen – von der ersten Idee bis zur fertigen KDP-Datei.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
              <Link href="/studio">
                Jetzt kostenlos starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Live Demo ansehen
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Kostenlos starten
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              1 Buch/Monat gratis
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Sofort loslegen
            </div>
          </div>

          {/* Demo Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm text-gray-600">Writora Studio</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 min-h-[400px]">
                <div className="p-6 border-r bg-white">
                  <h4 className="font-semibold mb-4 text-gray-800">💬 KI-Chat</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">GPT: Willkommen bei Writora! Was möchtest du schreiben?</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg ml-6">
                      <p className="text-sm text-gray-700">User: Ein Krimi mit einem dunklen Geheimnis.</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">GPT: Super! Lieber nüchtern, dramatisch oder mysteriös?</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg ml-6">
                      <p className="text-sm text-gray-700">User: Mysteriös.</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800">✅ Ich generiere die Kapitelstruktur...</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-slate-50">
                  <h4 className="font-semibold mb-4 text-gray-800">📄 Live-Vorschau</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[1,2,3,4,5,6].map((page) => (
                      <div key={page} className="aspect-[3/4] bg-white border rounded shadow-sm hover:shadow-md transition-all cursor-pointer p-2">
                        <div className="text-xs text-gray-600 mb-1">Seite {page}</div>
                        <div className="h-2 bg-gray-200 rounded mb-1"></div>
                        <div className="h-1 bg-gray-100 rounded mb-1"></div>
                        <div className="h-1 bg-gray-100 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Warum Writora?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Die einfachste Art, professionelle Bücher zu erstellen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Book Types */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Unterstützte Buchtypen</h3>
            <p className="text-gray-600 mb-8">Von Romanen bis Kinderbüchern – die KI passt sich automatisch an</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader className="text-center pb-3">
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <CardTitle className="text-base">{type.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-sm text-gray-600">
                    {type.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Einfache, faire Preise</h2>
            <p className="text-xl text-gray-600 mb-8">Starte kostenlos und upgrade nur wenn du mehr brauchst</p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>Monatlich</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 bg-gray-200 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isYearly ? 'transform translate-x-7 bg-blue-600' : ''}`}></div>
              </button>
              <span className={`${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                Jährlich 
                <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">-20%</Badge>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Free</CardTitle>
                <div className="text-4xl font-bold mb-2">€0</div>
                <CardDescription>Perfekt zum Ausprobieren</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>1 Buch pro Monat</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Alle Buchtypen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>PDF Export</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <span className="w-5 h-5 flex items-center justify-center">⚠️</span>
                  <span>Mit Wasserzeichen</span>
                </div>
                <Button className="w-full mt-8" variant="outline">
                  Kostenlos starten
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-blue-500 relative hover:shadow-xl transition-all duration-300 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Beliebt
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <div className="text-4xl font-bold mb-2">
                  €{isYearly ? '16' : '20'}
                  <span className="text-lg font-normal text-gray-500">/Monat</span>
                </div>
                <CardDescription>Für ernsthafte Autoren</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Unbegrenzte Bücher</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Alle Buchtypen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>KDP-Ready Export</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>KI-Cover Generator</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Kein Wasserzeichen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Priority Support</span>
                </div>
                <Button className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Pro werden
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold mb-2">Custom</div>
                <CardDescription>Für Verlage & Teams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Alles aus Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Team-Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>API Zugang</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>White-Label Option</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Dedicated Support</span>
                </div>
                <Button className="w-full mt-8" variant="outline">
                  Kontakt aufnehmen
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Bereit für dein erstes KI-Buch?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Starte kostenlos und erlebe, wie einfach Bucherstellung sein kann
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4" asChild>
            <Link href="/studio">
              Jetzt kostenlos starten
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Writora</span>
              </div>
              <p className="text-gray-400 mb-4">
                Die erste KI-gestützte Plattform für komplette Bucherstellung durch natürliche Unterhaltung.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produkt</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/features" className="block hover:text-white transition-colors">Features</Link>
                <Link href="/pricing" className="block hover:text-white transition-colors">Preise</Link>
                <Link href="/demo" className="block hover:text-white transition-colors">Demo</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Unternehmen</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-white transition-colors">Über uns</Link>
                <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
                <Link href="/careers" className="block hover:text-white transition-colors">Karriere</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/help" className="block hover:text-white transition-colors">Hilfe</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Kontakt</Link>
                <Link href="/privacy" className="block hover:text-white transition-colors">Datenschutz</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2024 Writora. Alle Rechte vorbehalten.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400">Made in Germany 🇩🇪</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Page;
