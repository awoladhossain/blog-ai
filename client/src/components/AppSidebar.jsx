import { RouteBlog, RouteCategoryDetails, RouteIndex } from "@/helpers/RouteName";
import {
  BookOpenText,
  ChartColumnStacked,
  HousePlus,
  LayoutList,
  MessageCircle,
  Rss,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <BookOpenText className="w-10 h-10 mx-2" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to={RouteIndex}>
                <SidebarMenuButton>
                  <HousePlus />
                  <span>Home</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to={RouteCategoryDetails}>
                <SidebarMenuButton>
                  <ChartColumnStacked />
                  <span>Categories</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to={RouteBlog}>
                <SidebarMenuButton>
                  <Rss />
                  <span>Blogs</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* anothes group */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutList />
                <Link to="/">Category Items</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter /> */}
    </Sidebar>
  );
};

export default AppSidebar;
