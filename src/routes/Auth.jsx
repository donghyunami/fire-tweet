import React, { useState } from 'react';
import {
  getAuth,
  signInWithPopup,
} from 'firebase/auth';

import { GoogleAuthProvider } from 'firebase/auth';
import { GithubAuthProvider } from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  // const [error, setError] = useState('');

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
    <div>
      <AuthForm newAccount={newAccount}/>
      {/* <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <button type="submit">{newAccount ? '새 계정 생성' : '로그인'}</button>
        {error}
      </form> */}
      <span onClick={toggleAccount}>
        {newAccount ? '로그인' : '새 계정 생성'}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue width Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue width Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
