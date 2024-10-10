import React, { useState, useEffect } from "react";

const CaptchaComponent = ({
  handleSubmit,
  buttonClassName,
  captchaInputClassName,
}) => {
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const validateCaptcha = import.meta.env.VITE_API_URL + "/validate-captcha";
  const generateCaptcha = import.meta.env.VITE_API_URL + "/generate-captcha";

  const fetchCaptcha = async () => {
    try {
      const response = await fetch(generateCaptcha, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      setCaptchaSvg(data);
    } catch (error) {
      console.error("Error fetching CAPTCHA:", error);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleCaptchaInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCaptchaInput(e.target.value);
  };

  const handleCaptchaValidation = async () => {
    try {
      const response = await fetch(validateCaptcha, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          captcha: captchaInput,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        alert("Captcha incorrecto. Inténtalo de nuevo.");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        handleSubmit();
        setCaptchaInput("");
      } else {
        alert("Captcha incorrecto. Inténtalo de nuevo.");
        setCaptchaInput("");
        fetchCaptcha();
      }
    } catch (error) {
      console.log("Ha ocurrido un error", error);
      setCaptchaInput("");
      fetchCaptcha();
    }
  };

  return (
    <div className="captcha-main">
      <div
        className="captcha-img"
        dangerouslySetInnerHTML={{ __html: captchaSvg }}
      />
      <input
        type="text"
        value={captchaInput}
        onChange={handleCaptchaInput}
        placeholder="Introduce el CAPTCHA"
        className={captchaInputClassName}
      />
      {/* Este botón ahora estará justo debajo del campo de entrada del captcha */}
      <button
        className={buttonClassName}
        onClick={(e) => {
          e.preventDefault();
          handleCaptchaValidation();
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default CaptchaComponent;
