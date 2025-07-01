// app/admin/stats/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Platzhalter-Antwort
  return NextResponse.json({
    message: "Admin-Stats-API ist in Arbeit.",
    stripeRevenue: 0,
    userCount: 0,
  });
}
