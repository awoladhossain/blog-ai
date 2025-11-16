import { Outlet } from "react-router-dom";
import AppSidebar from "../AppSidebar";
import Footer from "../Footer";
import TopBar from "../TopBar";
import { SidebarProvider } from "../ui/sidebar";

const Layout = () => {
  return (
    // top bar
    // side bar
    <SidebarProvider>
      <TopBar />
      <AppSidebar />
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-45px)]">
          <Outlet />
        </div>

        {/* footer */}
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
