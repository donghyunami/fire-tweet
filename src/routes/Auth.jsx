import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import {
  getAuth,
  signInWithPopup,
} from 'firebase/auth';

import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocialClick = async e => {
    const {
      target: { name },
    } = e;

    let provider;
    const auth = getAuth();
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
       <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm newAccount={newAccount}/>
      <span onClick={toggleAccount}>
        {newAccount ? '로그인' : '새 계정 생성'}
      </span>
      <div className="authBtns">
        <button className="authBtn" name="google" onClick={onSocialClick}>
          Continue width Google
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button className="authBtn" name="github" onClick={onSocialClick}>
          Continue width Github
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
