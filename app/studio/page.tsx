'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Send, Download, Palette, Settings, User, Plus, Edit3, Eye, Trash2, Sparkles, Crown, Zap, MessageCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface BookPage {
  id: string;
  pageNumber: number;
  title: string;
  content: string;
  wordCount: number;
}

export default function StudioPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Willkommen bei Writora! 🎉 Ich bin dein KI-Assistent und helfe dir dabei, dein Buch zu erstellen. Erzähl mir von deiner Buchidee - welches Genre schwebt dir vor? Ein spannender Krimi, ein herzerwärmendes Kinderbuch, oder vielleicht ein informativer Ratgeber? 📚✨',
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [bookPages, setBookPages] = useState<BookPage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendChatMessage = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          context: bookPages.length > 0 ? `Aktuelles Buch hat ${bookPages.length} Seiten` : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden der Nachricht');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Chat-Fehler:', error);
      return 'Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Anfrage. Bitte versuche es erneut.';
    }
  };

  const generateBook = async (genre: string, style: string, theme: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre,
          style,
          theme,
          targetAudience: 'Allgemein'
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler bei der Buchgenerierung');
      }

      const bookStructure = await response.json();
      
      // Convert chapters to pages
      const pages: BookPage[] = bookStructure.chapters.map((chapter: any) => ({
        id: `page-${chapter.number}`,
        pageNumber: chapter.number,
        title: chapter.title,
        content: chapter.content,
        wordCount: chapter.wordCount
      }));

      setBookPages(pages);

      // Add success message
      const successMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🎉 Perfekt! Ich habe dein Buch "${bookStructure.title}" mit ${bookStructure.chapters.length} Kapiteln erstellt. Du kannst jetzt rechts auf jede Seite klicken, um sie zu bearbeiten, oder mir weitere Änderungswünsche mitteilen. Was möchtest du als nächstes tun?`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      console.error('Buchgenerierung-Fehler:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Entschuldigung, es gab einen Fehler bei der Buchgenerierung. Bitte versuche es erneut oder beschreibe deine Idee anders.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Check if user wants to generate a book
    const lowerMessage = userMessage.toLowerCase();
    if ((lowerMessage.includes('krimi') || lowerMessage.includes('kinderbuch') || lowerMessage.includes('roman') || lowerMessage.includes('sachbuch')) && bookPages.length === 0) {
      // Extract genre and generate book
      let genre = 'Roman';
      if (lowerMessage.includes('krimi')) genre = 'Krimi';
      else if (lowerMessage.includes('kinderbuch')) genre = 'Kinderbuch';
      else if (lowerMessage.includes('sachbuch')) genre = 'Sachbuch';
      
      setIsTyping(false);
      await generateBook(genre, 'Spannend', userMessage);
      return;
    }

    // Get AI response
    const aiResponse = await sendChatMessage(userMessage);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePageClick = async (pageId: string) => {
    setSelectedPage(pageId);
    const page = bookPages.find(p => p.id === pageId);
    if (page) {
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `Du hast "${page.title}" (Seite ${page.pageNumber}) ausgewählt. Was möchtest du auf dieser Seite ändern? Du kannst mir sagen:\n\n• "Ändere den Titel zu..."\n• "Schreibe den Inhalt spannender"\n• "Füge mehr Details hinzu"\n• "Mach es kürzer/länger"\n\nOder beschreibe einfach, was geändert werden soll! ✏️`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const quickActions = [
    { text: "Schreibe einen spannenden Krimi", icon: "🕵️", gradient: "from-red-500 to-pink-500" },
    { text: "Erstelle ein Kinderbuch über Freundschaft", icon: "👶", gradient: "from-yellow-400 to-orange-500" },
    { text: "Beginne einen Fantasy-Roman", icon: "🧙", gradient: "from-purple-500 to-indigo-600" },
    { text: "Schreibe einen Ratgeber", icon: "📘", gradient: "from-blue-500 to-cyan-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Writora Studio
                </span>
                <div className="text-xs text-gray-500 -mt-1">KI-Bucherstellung</div>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200/50 shadow-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Free Plan
              </Badge>
              <Badge variant="outline" className="text-xs border-gray-300">
                {bookPages.length > 0 ? '1/1' : '0/1'} Bücher
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              disabled={bookPages.length === 0}
              className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              disabled={bookPages.length === 0}
              className="border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
            >
              <Palette className="h-4 w-4 mr-2" />
              Cover
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Demo User</div>
                  <div className="text-xs text-gray-500">Free Account</div>
                </div>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm">
                <Crown className="h-3 w-3 mr-1" />
                Upgrade
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-88px)]">
        {/* Chat Section */}
        <div className="w-1/2 flex flex-col bg-white/70 backdrop-blur-sm border-r border-gray-200/50">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200/50 bg-white/50">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">KI-Assistent</h3>
                <p className="text-xs text-gray-500">Bereit für deine Buchidee</p>
              </div>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-200/50' 
                      : 'bg-white border border-gray-200/50 text-gray-800 shadow-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    <div className={`text-xs mt-3 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {(isTyping || isGenerating) && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200/50 rounded-2xl px-5 py-4 shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {isGenerating ? (
                          <span className="flex items-center">
                            <Zap className="h-3 w-3 mr-1" />
                            Erstelle dein Buch...
                          </span>
                        ) : (
                          'Schreibt...'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && bookPages.length === 0 && (
            <div className="px-6 py-5 border-t border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <p className="text-sm text-gray-700 font-medium">Schnellstart - Wähle eine Idee:</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputValue(action.text);
                      inputRef.current?.focus();
                    }}
                    className="text-xs justify-start h-auto py-3 px-4 bg-white/80 hover:bg-white border-gray-200/50 hover:border-gray-300 transition-all duration-200 hover:shadow-sm group"
                  >
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-white text-xs">{action.icon}</span>
                    </div>
                    <span className="text-left">{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200/50 bg-white/50">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Beschreibe deine Buchidee oder stelle eine Frage..."
                  className="pr-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80 backdrop-blur-sm shadow-sm"
                  disabled={isTyping || isGenerating}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || isGenerating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-sm hover:shadow-md transition-all duration-200"
                size="lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center">
              <span>Drücke Enter zum Senden • Shift+Enter für neue Zeile</span>
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 bg-gradient-to-br from-slate-50/50 to-gray-100/30 flex flex-col">
          <div className="p-6 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Dein Buch</h2>
                  <p className="text-sm text-gray-600">
                    {bookPages.length > 0 ? (
                      <>
                        {bookPages.length} Seiten · {bookPages.reduce((acc, page) => acc + page.wordCount, 0).toLocaleString()} Wörter
                      </>
                    ) : (
                      'Noch keine Seiten erstellt'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={bookPages.length === 0}
                  className="border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Seite
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={bookPages.length === 0}
                  className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {bookPages.length > 0 ? (
              <div className="grid grid-cols-2 gap-5">
                {bookPages.map((page) => (
                  <Card
                    key={page.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group ${
                      selectedPage === page.id 
                        ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-100/50 scale-105' 
                        : 'hover:shadow-lg shadow-sm'
                    } bg-white/80 backdrop-blur-sm border-gray-200/50`}
                    onClick={() => handlePageClick(page.id)}
                  >
                    <CardContent className="p-5">
                      <div className="aspect-[3/4] bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 rounded-xl mb-4 p-4 overflow-hidden shadow-inner relative group-hover:shadow-md transition-all duration-300">
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-xs font-bold">{page.pageNumber}</span>
                          </div>
                        </div>
                        <div className="text-xs font-semibold text-gray-900 mb-3 line-clamp-2 leading-relaxed">
                          {page.title}
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-6 leading-relaxed">
                          {page.content}
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="h-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs border-gray-300 bg-white/50">
                            Seite {page.pageNumber}
                          </Badge>
                          <span className="text-xs text-gray-500 font-medium">
                            {page.wordCount} Wörter
                          </span>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-blue-100 hover:text-blue-600">
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                  <BookOpen className="h-16 w-16 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-700">Bereit für dein erstes Buch?</h3>
                <p className="text-sm text-center max-w-md leading-relaxed text-gray-600 mb-6">
                  Erzähle mir links im Chat von deiner Buchidee und ich erstelle sofort die ersten Seiten für dich. 
                  Von Krimis bis Kinderbüchern - alles ist möglich!
                </p>
                <div className="flex items-center space-x-6 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span>KI-gestützt</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span>Sofort bereit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-400" />
                    <span>Professionell</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}