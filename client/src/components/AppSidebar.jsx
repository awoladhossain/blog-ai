import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteIndex,
} from "@/helpers/RouteName";
import { getAllCategories } from "@/redux/api/categoryAPI";
import {
  BookmarkPlus,
  BookOpenText,
  ChartColumnStacked,
  HousePlus,
  MessageCircle,
  Rss,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const { category: categories, loading } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
            <SidebarMenuItem>
              <Link to={RouteBlog}>
                <SidebarMenuButton>
                  <MessageCircle />
                  <span>Comments</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {/* anothes group */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categories?.map((category) => (
              <SidebarMenuItem key={category._id}>
                <Link to={RouteBlogByCategory(category.slug)}>
                  <SidebarMenuButton>
                    <BookmarkPlus />
                    <span>{category.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
