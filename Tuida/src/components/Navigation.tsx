import React from 'react';
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
  return <nav className="px-6 md:px-12 lg:px-16 mb-8">
      <div className="flex space-x-8">
        {sections.map((section, index) => <button key={index} className={`text-sm tracking-wider pb-2 transition-all ${activeSection === index ? 'border-b border-black font-medium' : 'text-gray-400 hover:text-gray-800'}`} onClick={() => setActiveSection(index)}>
            {section.toUpperCase()}
          </button>)}
      </div>
    </nav>;
};
export default Navigation;