import React, { useState } from 'react';
import Layout from './components/Layout';
import YourHome from './pages/YourHome';
import Us from './pages/Us';
import Progress from './pages/Progress';
import Navigation from './components/Navigation';
export function App() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [{
    id: 0,
    title: 'Your Home',
    component: <YourHome />
  }, {
    id: 1,
    title: 'Us',
    component: <Us />
  }, {
    id: 2,
    title: 'Progress',
    component: <Progress />
  }];
  return <Layout>
      <Navigation sections={sections.map(s => s.title)} activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="w-full h-full transition-transform duration-500 flex" style={{
      transform: `translateX(-${activeSection * 100}%)`
    }}>
        {sections.map(section => <div key={section.id} className="min-w-full h-full">
            {section.component}
          </div>)}
      </div>
    </Layout>;
}