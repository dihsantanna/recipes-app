import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import logo from '../../images/logo.svg';

export default function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const emailIsValid = (email) => {
    // https://ui.dev/validate-email-address-javascript/
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const passwordIsValid = (password) => {
    const minLength = 6;
    return password.length > minLength;
  };

  const loginIsValid = () => {
    const { email, password } = state;
    return emailIsValid(email) && passwordIsValid(password);
  };

  const handleClick = () => {
    const { email } = state;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/comidas');
  };

  return (
    <div className="container-form">
      <form className="box-form">
        <div className="logo-login-container">
          <img
            className="logo-login"
            src={ logo }
            alt="Logo"
          />
        </div>
        <Input
          id="email-input"
          name="email"
          type="email"
          value={ state.email }
          onChange={ handleChange }
          placeholder="E-mail"
          classNameLabel="label-login"
          classNameInput="input-login"
        />
        <Input
          id="password-input"
          name="password"
          type="password"
          value={ state.password }
          onChange={ handleChange }
          placeholder="Password"
          classNameLabel="label-login"
          classNameInput="input-login"
        />
        <button
          data-testid="login-submit-btn"
          className="login-btn"
          type="button"
          onClick={ handleClick }
          disabled={ !loginIsValid() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
