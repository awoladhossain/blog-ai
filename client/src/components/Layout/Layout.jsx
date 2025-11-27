import { Outlet } from "react-router-dom";
import AppSidebar from "../AppSidebar";
import Footer from "../Footer";
import TopBar from "../TopBar";
import { SidebarProvider } from "../ui/sidebar";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user: profileUser } = useSelector((state) => state.user);
  return (
    <SidebarProvider>
      <TopBar profileUser={profileUser} />
      <AppSidebar />
      <main className="w-full bg-background text-foreground">
        <div className="w-full min-h-[calc(100vh-45px)]  ">
          <Outlet />
        </div>

        {/* footer */}
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
