import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormDisplay from "../components/FormDisplay";
import "./FormActivityPage.css";

const FormActivityPage = ({ publishedForm, setPublishedForm }) => {
  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        {/* Pasamos publishedForm y setPublishedForm como props */}
        <FormDisplay
          publishedForm={publishedForm}
          setPublishedForm={setPublishedForm}
          jsonNumber={1}
        />
      </main>
      <Footer />
    </div>
  );
};

export default FormActivityPage;
