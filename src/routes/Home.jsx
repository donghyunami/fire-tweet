import React, { useState } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    console.log(nweet);
  };

  const onChange = e => {
    const {
      target: { value },
    } = e;

    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
        />
        <button type="submit">Nweet</button>
      </form>
    </div>
  );
};

export default Home;
