import { useEffect, useRef, useState } from "react";

export function usePopInOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      
      
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.0000000000000000000000000000001}
    );
    observer.observe(node);
    // return () => observer.disconnect();
    // return;
    };
  }, []);

  return { ref, isVisible };
} 