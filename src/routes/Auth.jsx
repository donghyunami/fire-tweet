import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const onSubmit = e => {
    e.preventDefault();
  };

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
        <button type="submit">로그인</button>
      </form>
      <div>
        <button>Continue width Goole</button>
        <button>Continue width Github</button>
      </div>
    </div>
  );
};

export default Auth;
