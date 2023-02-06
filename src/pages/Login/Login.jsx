import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LOGIN_SCHEMA } from "../../utils/validationSchemas";
import { handleToast } from "../../components/Notifications";
import "./login.css";

const LoginForm = () => {
    console.log("LoginForm")
  return (
    <div className="login_container">
        <div className="login_title">
        <h2>Iniciar Sesión</h2>
        </div>
    <Formik
      initialValues={{ documento: "", password: "" }}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        handleToast("success", "Bienvenido")
        resetForm({
          documento: "",
          password: "",
        });
      }}
    >
      {props => (
        //los props son los valores que se envian al formulario y se pueden usar en el formulario
        <Form className="container">
        <div className="form-group mb-3 w-100">
          <label htmlFor="documento">Documento</label>
          <Field name="documento" type="number" className="form-control" />
          <ErrorMessage
            name="documento"
            component="p"
            className="text-danger mt-1"
          />
        </div>
        <div className="form-group mb-3 w-100">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage
            name="password"
            component="p"
            className="text-danger mt-1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Iniciar Sesión
        </button>
      </Form>
      )}
    </Formik>
    </div>
  );
};

export default LoginForm;
