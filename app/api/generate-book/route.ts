import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Erstmal mock response
    return NextResponse.json({
      title: "Test Buch",
      pages: [
        {
          number: 1,
          title: "Kapitel 1",
          content: "Das ist ein Test-Kapitel...",
          wordCount: 250
        }
      ],
      totalWordCount: 250
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Fehler bei der Buchgenerierung' },
      { status: 500 }
    );
  }
}