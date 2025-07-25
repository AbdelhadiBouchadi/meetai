import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardNavbar from '@/modules/dashboard/ui/views/dashboard-navbar';
import DashboardSidebar from '@/modules/dashboard/ui/views/dashboard-sidebar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <SidebarProvider className="">
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-muted">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
