import React from "react";
import Sidebar from "./Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
};

export default MainLayout;
