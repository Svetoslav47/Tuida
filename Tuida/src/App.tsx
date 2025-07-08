import { useEffect, useState } from "react";
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
import Location from "./pages/Location";

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
            title: "Локация",
            component: <Location />,
        },
        {
            id: 5,
            title: "Контакти",
            component: <Us />,
        }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {
        scrollToTop();
    }, []);

    // Create individual hooks for each section
    const popInHook0 = usePopInOnScroll();
    const popInHook1 = usePopInOnScroll();
    const popInHook2 = usePopInOnScroll();
    const popInHook3 = usePopInOnScroll();
    const popInHook4 = usePopInOnScroll();
    const popInHook5 = usePopInOnScroll();
    
    const popInHooks = [popInHook0, popInHook1, popInHook2, popInHook3, popInHook4, popInHook5];
    


    return (
      <LanguageProvider>
      <Routes>
        <Route path="/" element={<Layout onLogoClick={() => setActiveSection(0)}>
            <Navigation
                sections={sections.map((s) => s.title)}
                activeSection={activeSection}
                setActiveSection={(idx) => {
                    setActiveSection(idx);
                    scrollToTop();
                }}
            />
            <div
                className="w-full h-fit transition-transform duration-500 flex"
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
                            className={`min-w-full ${isVisible ? "pop-in" : "pop-in-hidden"}`}
                            style={{
                                height: `${idx === activeSection ? "fit-content" : "100vh"}`,
                            }}
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
