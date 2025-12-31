"use client"
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-yellow-600 text-white p-3 rounded-full shadow-lg 
                     hover:bg-yellow-700 hover:transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default BackToTop;
