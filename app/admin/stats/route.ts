// app/api/admin/stats/route.ts
export async function GET() {
  // Fetch stats from Supabase + Stripe API
  const stats = await getAdminStats();
  return NextResponse.json(stats);
}