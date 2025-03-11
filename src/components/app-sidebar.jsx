// AppSidebar.jsx
"use client";

import {
  AudioWaveform,
  Banknote,
  ChartColumnBig,
  Command,
  GalleryVerticalEnd,
  HandCoins,
  TicketCheck,
  TrendingUpDown,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is the sample data with complete teams array
const data = {
  user: {
    name: "Admin",
    email: "admin@codesis.io",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Project 1",
      logo: GalleryVerticalEnd, // Using the imported icon component directly
      plan: "project 1",
    },
    {
      name: "Project 2",
      logo: AudioWaveform,
      plan: "project 2",
    },
    {
      name: "Project 3",
      logo: Command,
      plan: "project 3",
    },
  ],
  navMain: [
    {
      title: "Pass Rates",
      url: "#pass-rates",
      icon: TicketCheck,
      isActive: true,
    },
    {
      title: "Revenue Sales",
      url: "#revenue-sales",
      icon: Banknote,
    },
    {
      title: "Payouts",
      url: "#payout",
      icon: HandCoins,
    },
    {
      title: "Payout Forecasting",
      url: "#forecasted-payout",
      icon: TrendingUpDown,
    },
    {
      title: "Daily Stats",
      url: "#daily-stats",
      icon: ChartColumnBig,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
