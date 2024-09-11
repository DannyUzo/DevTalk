'use client'

import { useState, useEffect } from "react";

export const useScrollEnd = () => {
  const [scrolledEnd, setScrolledEnd] = useState(false);

  useEffect(() => {
    const handleScrollEnd = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = 100; // 100px before the bottom
      const bottomPosition = document.documentElement.offsetHeight - threshold;
    
      console.log("Scroll Position:", scrollPosition);
      console.log("Bottom Position:", bottomPosition);
    
      if (scrollPosition >= bottomPosition) {
        setScrolledEnd(true);
      } else {
        setScrolledEnd(false);
      }
    };
    
    window.addEventListener("scroll", handleScrollEnd);  // Add the listener only once

    return () => window.removeEventListener("scroll", handleScrollEnd);  // Clean up
  }, []);  // Empty dependency array to run only once

  return scrolledEnd;  // Return the state directly
};
