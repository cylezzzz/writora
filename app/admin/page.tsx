import { AdminDashboard } from '@/components/ui/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminDashboard
        userCount={138}
        proUsers={42}
        totalRevenue={1259.99}
        onSyncClick={() => console.log('🔄 Daten aktualisieren...')}
      />
    </div>
  );
}
