// app/admin/page.tsx - nur für Admin-Role zugänglich
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export default async function AdminPage() {
  const session = await getServerSession();
  
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/');
  }
  
  return <AdminDashboard />;
}