import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BookGenerationRequest {
  genre: string;
  style: string;
  theme: string;
  targetAudience: string;
  additionalNotes?: string;
}

export interface BookStructure {
  title: string;
  chapters: {
    number: number;
    title: string;
    content: string;
    wordCount: number;
  }[];
  totalWordCount: number;
}

export async function generateBookStructure(request: BookGenerationRequest): Promise<BookStructure> {
  const prompt = `
Du bist ein professioneller Buchautor und hilfst dabei, ein ${request.genre} zu erstellen.

Details:
- Genre: ${request.genre}
- Stil: ${request.style}
- Thema: ${request.theme}
- Zielgruppe: ${request.targetAudience}
${request.additionalNotes ? `- Zusätzliche Notizen: ${request.additionalNotes}` : ''}

Erstelle eine Buchstruktur mit 6-8 Kapiteln. Jedes Kapitel sollte etwa 200-300 Wörter haben.

Antworte im folgenden JSON-Format:
{
  "title": "Buchtitel",
  "chapters": [
    {
      "number": 1,
      "title": "Kapiteltitel",
      "content": "Kapitelinhalt...",
      "wordCount": 250
    }
  ],
  "totalWordCount": 1500
}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Du bist ein professioneller Buchautor, der dabei hilft, hochwertige Bücher zu erstellen. Antworte immer auf Deutsch und im angegebenen JSON-Format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('Keine Antwort von OpenAI erhalten');
    }

    return JSON.parse(response);
  } catch (error) {
    console.error('Fehler bei der Buchgenerierung:', error);
    throw new Error('Fehler bei der Buchgenerierung');
  }
}

export async function generateChatResponse(message: string, context?: string): Promise<string> {
  const systemPrompt = `
Du bist der KI-Assistent von Writora, einer Plattform für KI-gestützte Bucherstellung.

Deine Aufgaben:
- Hilf Nutzern beim Erstellen von Büchern durch natürliche Unterhaltung
- Stelle gezielte Fragen, um die Buchidee zu entwickeln
- Gib konkrete Vorschläge für Verbesserungen
- Erkläre, wie Nutzer ihre Bücher bearbeiten können
- Sei freundlich, professionell und hilfreich

Antworte immer auf Deutsch und halte deine Antworten prägnant aber hilfreich.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        ...(context ? [{
          role: "assistant",
          content: `Kontext: ${context}`
        }] : []),
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return completion.choices[0]?.message?.content || 'Entschuldigung, ich konnte keine Antwort generieren.';
  } catch (error) {
    console.error('Fehler bei der Chat-Antwort:', error);
    return 'Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Anfrage.';
  }
}