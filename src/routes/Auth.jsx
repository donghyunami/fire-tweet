import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = e => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // logIn
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (err) {
      setError(err.message.replace('Firebase:', ''));
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <button type="submit">{newAccount ? '새 계정 생성' : '로그인'}</button>
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? '로그인' : '새 계정 생성'}
      </span>
      <div>
        <button>Continue width Goole</button>
        <button>Continue width Github</button>
      </div>
    </div>
  );
};

export default Auth;
