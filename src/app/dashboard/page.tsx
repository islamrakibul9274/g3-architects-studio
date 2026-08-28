import React from 'react';
import { ClientDashboard } from '@/components/dashboard/ClientDashboard';

export default function DashboardPage() {
  return (
    <div className="pt-24 pb-20 bg-stone-50/40 min-h-screen">
      <ClientDashboard />
    </div>
  );
}
