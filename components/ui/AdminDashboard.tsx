import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Crown, 
  DollarSign, 
  RefreshCw,
  TrendingUp,
  BookOpen,
  Calendar,
  Activity
} from 'lucide-react';

interface AdminDashboardProps {
  userCount: number;
  proUsers: number;
  totalRevenue: number;
  onSyncClick: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  userCount,
  proUsers,
  totalRevenue,
  onSyncClick
}) => {
  const freeUsers = userCount - proUsers;
  const conversionRate = userCount > 0 ? (proUsers / userCount * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Übersicht über Nutzer und Einnahmen</p>
        </div>
        <Button onClick={onSyncClick} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Daten aktualisieren
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamte Nutzer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        {/* Pro Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pro Nutzer</CardTitle>
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{proUsers}</div>
            <p className="text-xs text-muted-foreground">
              {conversionRate}% Conversion Rate
            </p>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monatsumsatz</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        {/* Free Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Nutzer</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{freeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Potenzielle Upgrades
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};