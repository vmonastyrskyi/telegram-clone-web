import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

import './Authentication.css';
import firebase from '../../firebase';
import {RootState} from '../../redux/rootReducer';
import {CountriesModal} from '../../modals/countries/CountriesModal';
import {putSelectedCountry} from '../../redux/countries/actions';
import {setAccessToken} from '../../util/local-storage.util';

const modalContainer = document.getElementById('modal')!;

enum AuthStage {
  PHONE_INPUT,
  VERIFY_DEVICE
}

interface JwtToken {
  access_token: string;
}

interface Props {
}

export const Authentication: React.FC<Props> = () => {
  const countries = useSelector((state: RootState) => state.countries.items);
  const selectedCountry = useSelector((state: RootState) => state.countries.selectedCountry);

  const [isCountriesModalOpened, setIsCountriesModalOpened] = useState(false);
  const [authStage, setAuthStage] = useState(AuthStage.PHONE_INPUT);
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const countryInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const verifyingCodeInputRef = useRef<HTMLInputElement>(null);

  const setUpRecaptcha = () => {
    (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        'size': 'invisible',
        'callback': login
      });
  }
  useEffect(setUpRecaptcha, []);

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry.name);
      setCode(selectedCountry.code);
      if (document.activeElement !== codeInputRef.current) phoneInputRef.current?.focus();
    } else {
      setCountry('Unknown');
    }
  }, [selectedCountry]);

  const login = () => {
    switch (authStage) {
      case AuthStage.PHONE_INPUT:
        const appVerifier = (window as any).recaptchaVerifier;
        const phoneNumber = code + phone;

        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(confirmationResult => {
            (window as any).confirmationResult = confirmationResult;
          })
          .catch(error => {
            console.log(error);
          });
        setAuthStage(AuthStage.VERIFY_DEVICE);
        break;
      case AuthStage.VERIFY_DEVICE:
        const codeConfirm = (window as any).confirmationResult;
        const verifyingCode = verifyingCodeInputRef.current!.value;

        codeConfirm
          .confirm(verifyingCode)
          .then((result: any) => {
            console.log(result);
            const additionalUserInfo = result.additionalUserInfo;
            const user = result.user;
            axios.post(
              `/auth/${additionalUserInfo?.isNewUser ? 'register' : 'login'}`,
              {phone: user.phoneNumber}
            ).then((res: AxiosResponse<JwtToken>) => {
              setAccessToken(res.data.access_token);
              history.replace('/');
            });
          })
          .catch((error: any) => {
            console.log(error);
          });
        break;
    }
  }

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (input.id === 'verifying-code') {
      input.value.length > 0 ? input.classList.add('has-value') : input.classList.remove('has-value');
    }

    if (input.id === 'code') {
      const code = input.value;
      setCountry('Unknown');
      countries.forEach(country => {
        if (country.code === code) {
          dispatch(putSelectedCountry(country));
          return;
        }
      });
    }
  }

  const openCountriesModal = () => {
    setIsCountriesModalOpened(true);
  }

  const closeCountriesModal = () => {
    setIsCountriesModalOpened(false);
  }

  const renderAuthStage = (authStage: AuthStage) => {
    switch (authStage) {
      case AuthStage.PHONE_INPUT:
        return (
          <div className="form-body">
            <h3 className="phone-input-title">Sign in</h3>
            <p className="phone-input-hint">Please choose your country and enter your full phone number.</p>
            <div className="country-input">
              <div className="form-control">
                <input ref={countryInputRef}
                       onInput={onInput}
                       onClick={openCountriesModal}
                       value={country}
                       onChange={(e) => setCountry(e.target.value)}
                       className="country has-value"
                       id="country"
                       type="text"
                       autoComplete="off"
                       readOnly={true}/>
                <label htmlFor="country">Country</label>
              </div>
            </div>
            <div className="phone-input">
              <div className="form-control">
                <input ref={codeInputRef}
                       onInput={onInput}
                       value={code}
                       onChange={(e) => setCode(e.target.value)}
                       className={"code" + (code.length > 0 ? " has-value" : "")}
                       id="code"
                       type="text"
                       autoComplete="off"/>
                <label htmlFor="code">Code</label>
              </div>
              <div className="form-control">
                <input ref={phoneInputRef}
                       onInput={onInput}
                       value={phone}
                       onChange={(e) => setPhone(e.target.value)}
                       className={"phone" + (phone.length > 0 ? " has-value" : "")}
                       id="phone"
                       type="text"
                       autoComplete="off"/>
                <label htmlFor="phone">Phone number</label>
              </div>
            </div>
          </div>
        );
      case AuthStage.VERIFY_DEVICE:
        return (
          <div className="form-body">
            <h3 className="verifying-code-title">{code + ' ' + phone}</h3>
            <div className="edit-phone" onClick={() => setAuthStage(AuthStage.PHONE_INPUT)}>Edit phone number</div>
            <p className="verifying-code-hint">
              We've sent the code to the <strong>Telegram</strong> app on your other device.
              <br/>
              Please enter the code below.
            </p>
            <p className="verifying-code-hint">
              You will be able to request SMS in 60:00
            </p>
            <div className="verifying-code-input">
              <div className="form-control">
                <input ref={verifyingCodeInputRef}
                       onInput={onInput}
                       className="verifying-code"
                       id="verifying-code"
                       type="text"
                       autoComplete="off"
                       autoFocus={true}/>
                <label htmlFor="verifying-code">Enter your code</label>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <>
      <div id="authentication-container">
        <div className="header"/>
        <div className="main">
          <div className="form-header">
          <span className="logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png"
              alt=""/>
              Telegram
          </span>
            <button id="login-btn" className="login-btn" onClick={login}>
              Next
              <span className="material-icons">keyboard_arrow_right</span>
            </button>
          </div>
          {renderAuthStage(authStage)}
          <div className="form-footer">
            <p>Welcome to the unofficial Telegram Clone web-client.</p>
            <a href="/">Learn more</a>
          </div>
        </div>
        <div id="recaptcha-container"/>
      </div>

      {isCountriesModalOpened
      && ReactDOM.createPortal(<CountriesModal closeModal={closeCountriesModal}/>, modalContainer)}
    </>
  );
}
