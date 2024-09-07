'use client'

import { useState, useEffect } from "react";

export const useScrollEnd = () => {
  const [scrolledEnd, setScrolledEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = document.documentElement.scrollTop + document.documentElement.offsetHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight) { // Slight offset for precision
        setScrolledEnd(true);
      } else {
        setScrolledEnd(false);
      }
    };

    window.addEventListener("scroll", handleScroll);  // Add the listener only once

    return () => window.removeEventListener("scroll", handleScroll);  // Clean up
  }, []);  // Empty dependency array to run only once

  return scrolledEnd;  // Return the state directly
};
