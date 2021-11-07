import React from "react";
import { useState } from "react";

import LoginStyles from "./Login.module.css";
import { login } from "./service";
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage';
import FormData from '../../common/FormData/FormData';
import { AuthContextConsumer } from "../context";
import Button from "../../common/Button";

function Login({ onLogin, history, location }) {
  const [formData, setformData] = useState({
    email: "",
    password: "",
    checkbox: false,
  });

  //const [stateCje, setstateCje] = useState(initialState)

  const [error, setError] = useState({
    message: "",
    isError: false,
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === 'checkbox' ? e.target.checked : e.target.value
    setformData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      onLogin();
      setError({
        isError: false,
        message: "",
      });
      const {from} = location.state || {from: {pathname: '/'}}
      history.replace(from);
    } catch (error) {
      const statusError = error.response.status;
      setError({
        isError: true,
        message:
          statusError === 401
            ? "El correo electrónico y la contraseña no son correctos"
            : "Ha habido un error en la red",
      });
    }
  };

  return (
    <div className={LoginStyles.loginpage}>
      <div className={LoginStyles.logincontent}>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <FormData
            labelName="Correo Electrónico"
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
          />
          <FormData
            labelName="Contraseña"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="form-control">
            <label htmlFor="checkbox">Recordarme</label>
            <input type="checkbox" id="checkbox" name="checkbox" value={formData.checkbox} onChange={handleChange}/>
          </div>
          <Button
            type="submit"
            disabled={!formData.email || !formData.password}
          >
            Iniciar Sesion
          </Button>
          {error.isError === false ? (
            ""
          ) : (
            <ErrorMessage
              onClick={() => setError({ isError: false, message: "" })}
              message={error.message}
            />
          )}
        </form>
      </div>
    </div>
  );
}

const ConnectedLoginPage = (props) => (
  <AuthContextConsumer>
    {(auth) => <Login {...props} onLogin={auth.handleLogin} />}
  </AuthContextConsumer>
);

export default ConnectedLoginPage;
