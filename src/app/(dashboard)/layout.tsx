import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSiderbar from '@/modules/dashboard/ui/views/dashboard-sidebar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <SidebarProvider className="">
      <DashboardSiderbar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
