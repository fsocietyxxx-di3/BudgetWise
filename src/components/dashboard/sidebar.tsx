import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Separator } from "@/components/ui/separator"
import { Logo } from '@/components/logo';
import {
  LayoutDashboard,
  Wallet,
  Settings,
  BarChart,
  CircleHelp,
} from 'lucide-react';

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-10 w-full items-center justify-center px-2 group-data-[collapsible=icon]:hidden">
          <Logo />
        </div>
        <div className="hidden h-10 w-full items-center justify-center group-data-[collapsible=icon]:flex">
           <Wallet className="h-6 w-6 text-accent" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive tooltip="Dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Budgets">
              <Wallet />
              <span>Budgets</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reports">
              <BarChart />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
           <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help">
              <CircleHelp />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-2" />
        <div className="px-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden space-y-1">
          <p className="font-semibold text-foreground">Created by:</p>
          <p>Jemrex Estrellado</p>
          <a
            href="https://www.facebook.com/share/1GyG2P8SN7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Facebook
          </a>
           <p>+63 9935961796</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
