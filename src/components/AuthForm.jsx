import React, { useState } from 'react'

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
  } from 'firebase/auth';

const AuthForm = ({newAccount}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

  return (
    <form onSubmit={onSubmit} className="container">
    <input
      type="text"
      name="email"
      placeholder="Email"
      required
      value={email}
      onChange={onChange}
      className="authInput"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      required
      value={password}
      onChange={onChange}
      className="authInput"
    />
    <button className='authInput authSubmit' type="submit">{newAccount ? '새 계정 생성' : '로그인'}</button>
    {error}
  </form>
  )
}

export default AuthForm;
