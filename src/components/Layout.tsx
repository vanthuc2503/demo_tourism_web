import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <TopBar />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
