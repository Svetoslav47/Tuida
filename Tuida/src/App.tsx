import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import YourHome from "./pages/YourHome";
import Houses from "./pages/Houses";
import Us from "./pages/Us";
import Progress from "./pages/Progress";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import { usePopInOnScroll } from "./hooks/usePopInOnScroll";
import { LanguageProvider } from "./context/LanguageContext";
import Gallery from "./pages/Gallery";

export function App() {
    const [activeSection, setActiveSection] = useState(0);
    const sections = [
        {
            id: 0,
            title: "Твоят дом",
            component: <YourHome />,
        },
        {
            id: 1,
            title: "Къщите",
            component: <Houses />,
        },
        {
            id: 2,
            title: "Прогрес",
            component: <Progress />,
        },
        {
            id: 3,
            title: "Галерия",
            component: <Gallery />,
        },
        {
            id: 4,
            title: "Контакти",
            component: <Us />,
        }
    ];
    // Create an array of hooks for each section
    const popInHooks = sections.map(() => usePopInOnScroll());
    return (
      <LanguageProvider>
      <Routes>
        <Route path="/" element={<Layout>
            <Navigation
                sections={sections.map((s) => s.title)}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />
            <div
                className="w-full h-full transition-transform duration-500 flex"
                style={{
                    transform: `translateX(-${activeSection * 100}%)`,
                }}
            >
                {sections.map((section, idx) => {
                    const { ref, isVisible } = popInHooks[idx];
                    return (
                        <div
                            key={section.id}
                            ref={ref}
                            className={`min-w-full h-full ${isVisible ? "pop-in" : "pop-in-hidden"}`}
                        >
                            {section.component}
                        </div>
                    );
                })}
            </div>
        </Layout>} />
        <Route path="/:houseName" element={<Home />} />
        </Routes>
        </LanguageProvider>
    );
}
