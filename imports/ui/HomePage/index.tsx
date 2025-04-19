import React, { useState } from 'react';

interface HomePageProps {
}

const HomePage: React.FC<HomePageProps> = () => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <h1>Home</h1>
            <div className="p-2">

                <button onClick={increment}
                        className="bg-gray-500 text-white py-2 px-4 rounded active:bg-gray-700">Click
                    Me
                </button>
                <p className="mt-2">You've pressed the button {counter} times.</p>
            </div>
        </>

    );
};

export default HomePage;