import React, { useState, useEffect } from "react";

const CaptchaComponent = ({ onCaptchaValidation}) => {
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  // URL para validar el CAPTCHA y generar uno nuevo
  const validateCaptcha = import.meta.env.VITE_API_URL + "/validate-captcha";
  const generateCaptcha = import.meta.env.VITE_API_URL + "/generate-captcha";

  // Obtener el CAPTCHA cuando el componente se monta o cuando sea necesario
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Si la validación falla, genera un nuevo CAPTCHA
      if (data.success) {
        setValidationMessage("Captcha validado correctamente.");
        onCaptchaValidation(true); // Informar que el CAPTCHA fue validado correctamente
      } else {
        setValidationMessage("Captcha incorrecto. Inténtalo de nuevo.");
        onCaptchaValidation(false); // Informar que la validación falló
        setCaptchaInput(""); // Limpiar el input
        fetchCaptcha(); // Generar un nuevo CAPTCHA solo si falla
      }      
    } catch (error) {
      setValidationMessage("Error al validar el CAPTCHA. Inténtalo de nuevo.");
      onCaptchaValidation(false); // Informar que la validación falló
      setCaptchaInput(""); // Limpiar el input
      fetchCaptcha(); // Generar un nuevo CAPTCHA
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
          Validar
        </button>
        {validationMessage && <p>{validationMessage}</p>}
      </div>
    </div>
  );
};

export default CaptchaComponent;
