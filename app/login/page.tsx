'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Chrome } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Placeholder login logic
    setTimeout(() => {
      window.location.href = '/studio';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Writora
            </span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Willkommen zurück</CardTitle>
            <CardDescription className="text-gray-600">
              Melde dich an, um deine Bücher zu erstellen
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
              variant="outline"
            >
              <Chrome className="h-5 w-5 mr-3" />
              {isLoading ? 'Anmeldung läuft...' : 'Mit Google anmelden'}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Neu bei Writora?{' '}
                <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
                  Jetzt kostenlos starten
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}