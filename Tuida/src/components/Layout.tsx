import React from 'react';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="w-full min-h-screen bg-white text-gray-800 flex flex-col overflow-hidden">
      <header className="px-6 py-8 md:px-12 lg:px-16">
        <h1 className="text-2xl font-light tracking-wider">TUIDA</h1>
      </header>
      <main className="flex-1 flex flex-col relative">{children}</main>
    </div>;
};
export default Layout;