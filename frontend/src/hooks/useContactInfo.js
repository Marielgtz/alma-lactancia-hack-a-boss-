import { useState, useEffect } from "react";
import axios from "axios";

const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/get-home-data`)
      .then((response) => {
        const { generalSettings } = response.data.form;
        setContactInfo(generalSettings);
        //console.log(response.data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, [API_BASE_URL]);

  return contactInfo;
};

export default useContactInfo;
