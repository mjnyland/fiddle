import React from "react";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-page-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full overflow-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
