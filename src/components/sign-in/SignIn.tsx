import React, {FormEvent, SyntheticEvent, useRef} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useHistory} from 'react-router-dom';

import './SignIn.css';
import {setAccessToken} from '../../util/local-storage.util';

interface Props {
}

interface JwtToken {
  access_token: string;
}

export const SignIn: React.FC<Props> = () => {
  const countryInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const history = useHistory();

  const login = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const phone = '123456';
    const password = 'password';

    axios.post('/auth/login', {phone, password})
      .then((res: AxiosResponse<JwtToken>) => {
        setAccessToken(res.data.access_token);
        history.replace('/');
      });

    // const phone = phoneInputRef.current!.value;
    // const password = passwordInputRef.current!.value;

    // if (phone && password) {
    //   axios.post('/auth/login', {phone, password})
    //     .then((res: AxiosResponse<JwtToken>) => {
    //       setAccessToken(res.data.access_token);
    //     });
    // }
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.value.length > 0 ? input.classList.add('has-value') : input.classList.remove('has-value');
  }

  return (
    <div className="sign-in_container">
      <div className="header"/>
      <div className="main">
        <div className="sign-in_head">
          <span className="logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png"
              alt=""/>
              Telegram
          </span>
          <button className="sign-in_btn" onClick={login}>Next <span
            className="material-icons">keyboard_arrow_right</span></button>
        </div>
        <div className="sign-in_form">
          <h3 className="header">Sign in</h3>
          <p className="hint">Please choose your country and enter your full phone number.</p>
          <div className="country_input">
            <div className="input-form">
              <input ref={countryInputRef} onInput={onInput} id="country" type="text" autoComplete="off"/>
              <label htmlFor="country">Country</label>
            </div>
          </div>
          <div className="phone_input">
            <div className="input-form">
              <input ref={codeInputRef} onInput={onInput} id="code" type="text" autoComplete="off"/>
              <label htmlFor="code">Code</label>
            </div>
            <div className="input-form">
              <input ref={phoneInputRef} onInput={onInput} id="phone" type="text" autoComplete="off"/>
              <label htmlFor="phone">Phone number</label>
            </div>
          </div>
          <div className="password_input">
            <div className="input-form">
              <input ref={passwordInputRef} onInput={onInput} id="password" type="password"/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
        </div>
        <div className="sign-in_footer">
          <p>Welcome to the unofficial Telegram Clone web-client.</p>
          <a href="/">Learn more</a>
        </div>
      </div>
    </div>
  );
}