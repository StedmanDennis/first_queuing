

import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
export default function AppSidebar(){


    return (<Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem><SidebarMenuButton>Queuers</SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuButton>Schools</SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuButton><Link href="/manage/teams">Teams</Link></SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuButton>Fields</SidebarMenuButton></SidebarMenuItem>
            <SidebarMenuItem><SidebarMenuButton>Schedules</SidebarMenuButton></SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>)
}