import React, { useState, useEffect } from "react";

const CaptchaComponent = () => {
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  // URL para validar el CAPTCHA y generar uno nuevo
  const validateCaptcha = import.meta.env.VITE_API_URL + "/validate-captcha";
  const generateCaptcha = import.meta.env.VITE_API_URL + "/generate-captcha";

  // Obtener el CAPTCHA cuando el componente se monta
  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const response = await fetch(generateCaptcha, {
          credentials: "include", // Esto es para que se envíen y reciban cookies
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.text(); // El captcha es un SVG en formato texto
        setCaptchaSvg(data);
      } catch (error) {
        console.error("Error fetching CAPTCHA:", error);
      }
    };
    fetchCaptcha();
  }, [generateCaptcha]);

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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setValidationMessage(data.message);
    } catch (error) {
      setValidationMessage("Captcha inválido. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <div
        className="captcha-img"
        dangerouslySetInnerHTML={{ __html: captchaSvg }}
      />
      <div className="captcha-main">
        <input
          type="text"
          value={captchaInput}
          onChange={handleCaptchaInput}
          placeholder="Introduce el CAPTCHA"
          className="captcha-input"
        />
        <button className="captcha-button" onClick={handleCaptchaValidation}>
          Validar CAPTCHA
        </button>
        {validationMessage && <p>{validationMessage}</p>}
      </div>
    </div>
  );
};

export default CaptchaComponent;
