import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BookGenerationRequest {
  genre: string;
  style: string;
  theme: string;
  targetAudience: string;
  pageCount?: number;
  additionalNotes?: string;
}

export interface BookStructure {
  title: string;
  subtitle?: string;
  description: string;
  genre: string;
  pages: Array<{
    number: number;
    title: string;
    content: string;
    wordCount: number;
    summary?: string;
  }>;
  totalWordCount: number;
  estimatedReadingTime: string;
  keywords: string[];
  coverPrompt?: string;
}

export async function generateBookStructure(request: BookGenerationRequest): Promise<BookStructure> {
  const pageCount = request.pageCount || 8;
  
  const prompt = `Du bist ein professioneller Buchautor mit jahrelanger Erfahrung im ${request.genre}-Genre.

AUFTRAG: Erstelle ein vollständiges ${request.genre} mit folgenden Vorgaben:
- Genre: ${request.genre}
- Stil: ${request.style}
- Thema: ${request.theme}
- Zielgruppe: ${request.targetAudience}
- Seitenanzahl: ${pageCount}
${request.additionalNotes ? `- Besondere Wünsche: ${request.additionalNotes}` : ''}

QUALITÄTSANFORDERUNGEN:
- Jede Seite sollte 300-500 Wörter haben
- Verwende lebendige, ansprechende Sprache
- Schaffe emotionale Verbindungen zu den Lesern
- Achte auf logischen Aufbau und Spannungsbogen

Antworte im folgenden JSON-Format:
{
  "title": "Einprägsamer Buchtitel",
  "subtitle": "Optionaler Untertitel",
  "description": "2-3 Sätze Buchbeschreibung",
  "genre": "${request.genre}",
  "pages": [
    {
      "number": 1,
      "title": "Kapitel-/Seitentitel",
      "content": "Vollständiger Seiteninhalt mit mindestens 300 Wörtern...",
      "wordCount": 350,
      "summary": "Kurze Zusammenfassung dieser Seite"
    }
  ],
  "totalWordCount": ${pageCount * 350},
  "estimatedReadingTime": "${Math.ceil((pageCount * 350) / 200)} Minuten",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "coverPrompt": "Beschreibung für KI-Cover-Generierung"
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "Du bist ein professioneller Buchautor. Antworte IMMER auf Deutsch und im exakten JSON-Format. Erstelle vollständige, qualitativ hochwertige Inhalte."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('Keine Antwort von OpenAI erhalten');
    }

    // Clean and parse JSON
    const cleanResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    return JSON.parse(cleanResponse);
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Fehler bei der Buchgenerierung');
  }
}

export async function generateChatResponse(message: string, context?: any): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du bist der freundliche KI-Assistent von Writora. Hilf Nutzern beim Erstellen von Büchern. Antworte auf Deutsch, prägnant und hilfreich."
        },
        {
          role: "user",
          content: context ? `${JSON.stringify(context)}\n\n${message}` : message
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return completion.choices[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.';
  } catch (error) {
    console.error('Chat API Error:', error);
    return 'Es gab einen technischen Fehler. Bitte versuche es erneut. 🔄';
  }
}