import React, { useEffect } from "react";
import "./ButtonUp.css";

const ButtonUp = () => {
  useEffect(() => {
    const $btnUp = document.getElementById("up");

    if (!$btnUp) {
      console.error("Button element not found!");
      return;
    }

    const handleScroll = () => {
      const y = window.scrollY;
      console.log(y);
      if (y >= 50) {
        $btnUp.classList.remove("hide");
        $btnUp.classList.add("active");
      } else {
        $btnUp.classList.add("hide");
        $btnUp.classList.remove("active");
      }
    };
    handleScroll();

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

  return (
    <button id="up" className="btn-up active">
      Up
    </button>
  );
};

export default ButtonUp;
