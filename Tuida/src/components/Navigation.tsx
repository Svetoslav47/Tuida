import React, { useState } from 'react';
// import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  sections: string[];
  activeSection: number;
  setActiveSection: (index: number) => void;
}
const Navigation: React.FC<NavigationProps> = ({
  sections,
  activeSection,
  setActiveSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { language, toggleLanguage } = useLanguage();

  const handleSectionClick = (index: number) => {
    setActiveSection(index);
    setIsMobileMenuOpen(false); // Close mobile menu when section is selected
  };

  return (
    <nav className="px-6 md:px-12 lg:px-16 mb-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex space-x-8">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`text-sm tracking-wider pb-2 transition-all ${activeSection === index ? 'border-b border-black font-medium' : 'text-gray-400 hover:text-gray-800'}`}
                onClick={() => setActiveSection(index)}
              >
                {section.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="tel:+359892517200"
              className="text-sm tracking-wider pb-2 text-gray-400 hover:text-gray-800 transition-all"
            >
              +359 892 517 200
            </a>
            {/* <button
              onClick={toggleLanguage}
              className="text-sm tracking-wider pb-2 text-gray-400 hover:text-gray-800 transition-all"
            >
              {language}
            </button> */}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>

          {/* Phone Number on Mobile */}
          <a
            href="tel:+359892517200"
            className="text-sm tracking-wider text-gray-400 hover:text-gray-800 transition-all"
          >
            +359 892 517 200
          </a>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-medium">Меню</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      className={`block w-full text-left py-3 px-4 transition-all ${
                        activeSection === index 
                          ? 'border-t border-b border-black border-opacity-30 text-black' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => handleSectionClick(index)}
                    >
                      {section.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navigation;