import { NextRequest, NextResponse } from 'next/server';
import { generateBookStructure, BookGenerationRequest } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const bookRequest: BookGenerationRequest = await request.json();

    if (!bookRequest.genre || !bookRequest.style || !bookRequest.theme) {
      return NextResponse.json(
        { error: 'Genre, Stil und Thema sind erforderlich' },
        { status: 400 }
      );
    }

    const bookStructure = await generateBookStructure(bookRequest);

    return NextResponse.json(bookStructure);
  } catch (error) {
    console.error('Buchgenerierung API Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler bei der Buchgenerierung' },
      { status: 500 }
    );
  }
}