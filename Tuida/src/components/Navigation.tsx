import React from 'react';
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
  // const { language, toggleLanguage } = useLanguage();
  return <nav className="px-6 md:px-12 lg:px-16 mb-8 flex justify-between items-center">
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center">
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
        {/* <button
          onClick={toggleLanguage}
          className="text-sm tracking-wider pb-2 text-gray-400 hover:text-gray-800 transition-all"
        >
          {language}
        </button> */}
      </div>
    </div>
  </nav>
};
export default Navigation;