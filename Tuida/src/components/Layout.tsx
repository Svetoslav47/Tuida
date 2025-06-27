import React from 'react';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  return <div className="w-full min-h-screen bg-white text-gray-800 flex flex-col overflow-hidden">
      <header className="px-6 py-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            <img 
              src="/logoTuida.png" 
              alt="Tuida Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-3xl font-light tracking-wider">ТУИДА</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative">{children}</main>
    </div>;
};
export default Layout;