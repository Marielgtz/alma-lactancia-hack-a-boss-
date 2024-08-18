import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

function ScrollToTopButton() {
  useEffect(() => {
    const $btnUp = document.getElementById("up");

    console.log('$btnUp:', $btnUp);

    if (!$btnUp) {
      $btnUp.addEventListener("click", (e) => {
        console.log('Button clicked', e);
      })
      console.error('Button element not found!');
      return;
    }

    const handleScroll = () => {
      const y = window.scrollY;
      console.log('Current scroll position:', y);
      if (y >= 50) {
        console.log('Adding active class');
        $btnUp.classList.remove("hide");
        $btnUp.classList.add("active");
      } else {
        console.log('Removing active class');
        $btnUp.classList.add("hide");
        $btnUp.classList.remove("active");
      }
    };

    const handleClick = (e) => {
      console.log('Click event detected');
      if (e.target === $btnUp || e.target.matches(".fa-arrow-up")) {
        console.log('Scrolling to top');
        window.scrollTo({
          behavior: "smooth",
          top: 0,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

// Render React application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ScrollToTopButton />
  </React.StrictMode>
);
