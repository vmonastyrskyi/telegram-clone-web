import React, {FormEvent, useRef} from 'react';

import './SignIn.css';

interface Props {
}

export const SignIn: React.FC<Props> = () => {
  const countryInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.value.length > 0 ? input.classList.add('has-value') : input.classList.remove('has-value');
  }

  return (
    <div className="sign-in_container">
      <div className="header"/>
      <div className="main">
        <div className="sign-in_head">
          <span className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png" alt=""/>Telegram</span>
          <button className="sign-in_btn">Next <span className="material-icons">keyboard_arrow_right</span></button>
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
        </div>
        <div className="sign-in_footer">
          <p>Welcome to the unofficial Telegram Clone web-client.</p>
          <a href="/">Learn more</a>
        </div>
      </div>
    </div>
  );
}
