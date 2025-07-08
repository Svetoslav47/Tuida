import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onLogoClick?: () => void;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  onLogoClick
}) => {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return <div className="w-full min-h-screen bg-white text-gray-800 flex flex-col overflow-hidden">
      <header className="px-4 sm:px-6 py-4 sm:py-8 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-6">
            <img 
              src="/logoTuida.png" 
              alt="ТУИДА Logo" 
              className="h-12 sm:h-16 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />
            <h1 
              className="text-xl sm:text-2xl md:text-3xl font-light tracking-wider cursor-pointer hover:text-gray-600 transition-colors"
              onClick={handleLogoClick}
            >
              ТУИДА
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col relative">{children}</main>
    </div>;
};
export default Layout;