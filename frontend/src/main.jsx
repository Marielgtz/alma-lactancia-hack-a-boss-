import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

function ScrollToTopButton() {
  useEffect(() => {
    const $btnUp = document.getElementById("up");

    console.log('$btnUp:', $btnUp);

    if (!$btnUp) {
      console.error('Button element not found!');
      return;
    }

    const handleScroll = () => {
      const y = window.scrollY;
      if (y >= 100) {
        $btnUp.classList.remove("hide");
        $btnUp.classList.add("active");
      } else {
        $btnUp.classList.add("hide");
        $btnUp.classList.remove("active");
      }
    };

    const handleClick = () => {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    };

    window.addEventListener("scroll", handleScroll);
    $btnUp.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      $btnUp.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ScrollToTopButton />
  </React.StrictMode>
);