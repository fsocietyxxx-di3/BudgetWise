import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
        <div className="flex items-center gap-3 px-2 py-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/1/40/40" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-foreground">User</span>
            <span className="text-xs text-muted-foreground">user@budgetwise.app</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
