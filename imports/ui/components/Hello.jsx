import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";

export const Hello = () => {
  const [counter, setCounter] = useState(0);
  const { name } = useParams(); // Extract the name parameter from the URL if exists

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Helmet>
        <title>SkillTree - Hello</title>
      </Helmet>
      <div className='p-2'>
        <p className='mt-2 bold-text'> Hello {name}!</p>
        <button onClick={increment} className='bg-gray-500 text-white py-2 px-4 rounded active:bg-gray-700 mt-2'>Click Me</button>
        <p className='mt-2'>You've pressed the button {counter} times.</p>
      </div>
    </div>
  );
};
