import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormDisplay from "../components/FormDisplay";
import "./FormActivityPage.css";

const FormActivityPage = ({ publishedForm, setPublishedForm }) => {

  const formList = Array.from({ length: 4 }, () => {
    return {}
})

  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        {/* Pasamos publishedForm y setPublishedForm como props */}
        <ul>
          {formList.map((_, index) => {
            return (
              <li key={index}>
                <FormDisplay
                  publishedForm={publishedForm[index] && publishedForm[index]}
                  setPublishedForm={setPublishedForm}
                  jsonNumber={index + 1}
                />
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default FormActivityPage;
