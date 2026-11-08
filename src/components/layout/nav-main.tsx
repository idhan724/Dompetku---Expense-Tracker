import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChartColumnIncreasing,
  LayoutDashboard,
  LayoutGrid,
  Receipt,
} from "lucide-react";

function NavMain() {
  const navData = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
    },
    {
      title: "Transactions",
      icon: Receipt,
      url: "/transactions",
    },
    {
      title: "Categories",
      icon: LayoutGrid,
      url: "/categories",
    },
    {
      title: "Analytics",
      icon: ChartColumnIncreasing,
      url: "/analytics",
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
       <SidebarMenu>
      {navData.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton render={<a href={item.url} />} tooltip={item.title}>
            {item.icon && <item.icon />}
              <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    </SidebarGroup>
   
  );
}

export default NavMain;
