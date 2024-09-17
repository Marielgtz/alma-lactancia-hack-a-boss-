import { useEffect, useRef } from "react";

const useFormDisplay = (publishedForm, setPublishedForm, jsonNumber) => {
  useEffect(() => {
    const getPublishedForm = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + `/get-published-form/${jsonNumber}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Datos del formulario:", data);

          // Comprobar que 'data.form' y 'data.form.fields' existen
          if (data.form && data.form.fields) {
            setPublishedForm((prevData) => {
              const newData = Array.isArray(prevData) ? [...prevData] : [];
              newData.splice(Number(jsonNumber) - 1, 1, data.form);
              return newData;
            });
          } else {
            console.error("El formulario no contiene campos");
            setPublishedForm({ fields: [] }); // Para evitar errores posteriores
          }
        }
      } catch (error) {
        console.log("No hay datos que mostrar:", error);
      }
    };

    getPublishedForm();
  }, [jsonNumber, setPublishedForm]);

  const formRef = useRef(null);

  const sendDataHandler = async (event) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formElements = formRef.current.elements;
    const formValues = Array.from(formElements).reduce((acc, element) => {
      if (element.name) {
        acc[element.name] = element.value;
      }
      return acc;
    }, {});

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/submit-form/" + publishedForm.formName,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formValues,
            formName: publishedForm.formName,
          }),
        }
      );

      if (response.ok) {
        console.log("Datos enviados exitosamente", formValues);
        formRef.current.reset();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || response.statusText;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Ha ocurrido un error:", error);
    }
  };

  return { sendDataHandler, formRef };
};

export default useFormDisplay;
