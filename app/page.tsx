import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Check, 
  Star,
  Crown,
  Zap,
  Users,
  Clock,
  X
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface UserData {
  bookIdea: string;
  genre: string;
  targetAudience: string;
  experience: string;
}

export default function WritoraOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    bookIdea: '',
    genre: '',
    targetAudience: '',
    experience: ''
  });
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
      component: <GenerationStep userData={userData} isGenerating={isGenerating} />
    },
    {
      id: 'wow-moment',
      title: 'Dein erstes Buch ist fertig! 📚',
      description: 'Schau dir dein Werk an',
      component: <WowMomentStep userData={userData} setShowUpgrade={setShowUpgrade} />
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 2) { // Before generation step
      setIsGenerating(true);
      // Simulate book generation
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep(currentStep + 1);
      }, 3000);
    } else {
      setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return userData.bookIdea.trim().length > 20;
      case 2: return userData.genre !== '';
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Writora
            </span>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <Badge className="bg-blue-100 text-blue-700 mb-2">
            Schritt {currentStep + 1} von {steps.length}
          </Badge>
          
          <CardTitle className="text-xl text-gray-900">{steps[currentStep].title}</CardTitle>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </CardHeader>
        
        <CardContent>
          <div className="min-h-[400px]">
            {steps[currentStep].component}
          </div>
          
          {currentStep !== 3 && ( // Hide buttons during generation
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Zurück
              </Button>
              
              <Button 
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={currentStep === steps.length - 1 || !canProceed()}
              >
                {currentStep === 2 ? 'Buch erstellen' : 'Weiter'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <UpgradeModal onClose={() => setShowUpgrade(false)} />
      )}
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-6 animate-pulse">
        <Sparkles className="h-12 w-12 text-white" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Bereit für dein erstes KI-Buch?
        </h3>
        
        <p className="text-gray-600 max-w-md mx-auto">
          In den nächsten 3 Minuten erstellen wir gemeinsam dein erstes Buch. 
          Komplett kostenlos, kein Haken!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl mb-2">💭</div>
          <div className="text-sm font-medium text-gray-700">Idee teilen</div>
          <div className="text-xs text-gray-500 mt-1">30 Sekunden</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl mb-2">🤖</div>
          <div className="text-sm font-medium text-gray-700">KI arbeitet</div>
          <div className="text-xs text-gray-500 mt-1">2 Minuten</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-sm font-medium text-gray-700">Buch fertig</div>
          <div className="text-xs text-gray-500 mt-1">Sofort lesen</div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-yellow-800">
          <Star className="h-4 w-4 inline mr-2" />
          Über 10,000 Autoren haben bereits ihr erstes Buch erstellt
        </p>
      </div>
    </div>
  );
}

function BookIdeaStep({ userData, setUserData }: { userData: UserData, setUserData: (data: UserData) => void }) {
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (value: string) => {
    setUserData({...userData, bookIdea: value});
    setWordCount(value.trim().split(/\s+/).filter(word => word).length);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Worum soll dein Buch gehen?
        </label>
        <textarea
          className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          rows={6}
          placeholder="Z.B. Ein spannender Krimi über einen verschwundenen Künstler in Paris, der geheimnisvolle Nachrichten in seinen Gemälden hinterlassen hat..."
          value={userData.bookIdea}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">
            💡 Tipp: Je detaillierter, desto besser wird dein Buch!
          </p>
          <span className={`text-sm ${wordCount >= 15 ? 'text-green-600' : 'text-gray-400'}`}>
            {wordCount} Wörter {wordCount >= 15 && '✓'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Beispiel: Krimi</h4>
          <p className="text-sm text-blue-700">
            "Ein Detektiv in einer Kleinstadt untersucht eine Serie mysteriöser Diebstähle in Antiquitätenläden..."
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-medium text-purple-900 mb-2">Beispiel: Fantasy</h4>
          <p className="text-sm text-purple-700">
            "Eine junge Magierin entdeckt ein verbotenes Buch, das die Macht hat, die Zeit zu manipulieren..."
          </p>
        </div>
      </div>
    </div>
  );
}

function GenreStep({ userData, setUserData }: { userData: UserData, setUserData: (data: UserData) => void }) {
  const genres = [
    { id: 'krimi', name: 'Krimi', icon: '🕵️', desc: 'Spannung & Ermittlung', color: 'from-red-500 to-orange-500' },
    { id: 'roman', name: 'Roman', icon: '💕', desc: 'Emotionen & Charaktere', color: 'from-pink-500 to-rose-500' },
    { id: 'fantasy', name: 'Fantasy', icon: '🧙‍♂️', desc: 'Magie & Abenteuer', color: 'from-purple-500 to-indigo-500' },
    { id: 'kinderbuch', name: 'Kinderbuch', icon: '👶', desc: 'Für junge Leser', color: 'from-green-500 to-teal-500' },
    { id: 'sachbuch', name: 'Sachbuch', icon: '📘', desc: 'Wissen & Tipps', color: 'from-blue-500 to-cyan-500' },
    { id: 'scifi', name: 'Sci-Fi', icon: '🚀', desc: 'Zukunft & Technologie', color: 'from-gray-500 to-slate-500' }
  ];

  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600">
        Wähle das passende Genre für deine Idee:
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => setUserData({...userData, genre: genre.id})}
            className={`group p-4 border-2 rounded-xl text-center transition-all duration-200 ${
              userData.genre === genre.id
                ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:scale-102'
            }`}
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${genre.color} flex items-center justify-center text-white text-xl`}>
              {genre.icon}
            </div>
            <div className="font-medium text-gray-900">{genre.name}</div>
            <div className="text-sm text-gray-600 mt-1">{genre.desc}</div>
            {userData.genre === genre.id && (
              <Check className="h-5 w-5 text-blue-600 mx-auto mt-2" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function GenerationStep({ userData, isGenerating }: { userData: UserData, isGenerating: boolean }) {
  const [currentTask, setCurrentTask] = useState(0);
  
  const tasks = [
    'Genre-Struktur wird erstellt...',
    'Charaktere werden entwickelt...',
    'Kapitel werden geschrieben...',
    'Finale Überarbeitung...'
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentTask(prev => (prev + 1) % tasks.length);
      }, 750);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  return (
    <div className="text-center space-y-8">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Die KI schreibt dein Buch...
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Basierend auf: <em>"{userData.bookIdea.slice(0, 60)}..."</em>
        </p>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className={`flex items-center justify-center space-x-3 transition-all duration-300 ${
            index <= currentTask ? 'text-green-600' : 'text-gray-400'
          }`}>
            {index <= currentTask ? (
              <Check className="h-5 w-5" />
            ) : (
              <Clock className="h-5 w-5" />
            )}
            <span className="text-sm">{task}</span>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <BookOpen className="h-4 w-4 inline mr-2" />
          Geschätzte Buchlänge: 8-12 Seiten, ca. 2.400 Wörter
        </p>
      </div>
    </div>
  );
}

function WowMomentStep({ userData, setShowUpgrade }: { userData: UserData, setShowUpgrade: (show: boolean) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🎉 Dein Buch ist fertig!
        </h3>
        
        <p className="text-gray-600 mb-6">
          <strong>"{userData.bookIdea.split(' ').slice(0, 5).join(' ')}..."</strong><br />
          8 Seiten • 2.400 Wörter • 12 Min. Lesezeit
        </p>

        {/* Mini Book Preview */}
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-6">
          {[1,2,3,4,5,6,7,8].map((page) => (
            <div key={page} className="aspect-[3/4] bg-white border-2 border-gray-200 rounded shadow-md p-2 hover:shadow-lg transition-shadow">
              <div className="text-xs text-gray-500 mb-1">S.{page}</div>
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-200 rounded"></div>
                <div className="h-1 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg">
            <BookOpen className="mr-2 h-4 w-4" />
            Buch jetzt lesen & bearbeiten
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50" 
            onClick={() => setShowUpgrade(true)}
          >
            <Crown className="mr-2 h-4 w-4" />
            Mehr Bücher erstellen (Pro)
          </Button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Star className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Gratulation!</p>
            <p className="text-xs text-yellow-700 mt-1">
              Du hast dein erstes KI-Buch erfolgreich erstellt. Teile es mit Freunden oder erstelle weitere Bücher mit Pro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  const plans = {
    monthly: { price: '19,99', period: 'Monat', savings: null },
    yearly: { price: '143,88', period: 'Jahr', savings: '40% sparen' }
  };

  const features = [
    'Unbegrenzt Bücher erstellen',
    'Alle Genres verfügbar',
    'Erweiterte KI-Optionen',
    'PDF & EPUB Export',
    'Priority Support',
    'Kommerzielle Nutzung'
  ];

  const handleUpgrade = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Upgrade erfolgreich! (Demo)');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Crown className="h-8 w-8 text-white" />
          </div>
          
          <CardTitle className="text-xl">Upgrade zu Writora Pro</CardTitle>
          <p className="text-gray-600">Erstelle unbegrenzt viele Bücher</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plan Selection */}
          <div className="space-y-3">
            {Object.entries(plans).map(([key, plan]) => (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedPlan === key
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      €{plan.price} / {plan.period}
                    </div>
                    {plan.savings && (
                      <div className="text-sm text-green-600">{plan.savings}</div>
                    )}
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPlan === key
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === key && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Was du bekommst:</h4>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                Bereits 2,847 Pro-Autoren
              </span>
            </div>
            <p className="text-xs text-blue-700">
              Schließe dich unserer Community von erfolgreichen Autoren an
            </p>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button 
              onClick={handleUpgrade}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Wird verarbeitet...</span>
                </div>
              ) : (
                <>
                  <Crown className="mr-2 h-4 w-4" />
                  Jetzt upgraden - €{plans[selectedPlan as keyof typeof plans].price}
                </>
              )}
            </Button>
            
            <div className="text-center">
              <Button variant="ghost" onClick={onClose} className="text-sm">
                Später entscheiden
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center">
            30 Tage Geld-zurück-Garantie • Jederzeit kündbar
          </p>
        </CardContent>
      </Card>
    </div>
  );
}