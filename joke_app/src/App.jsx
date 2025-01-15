import  { useState, useEffect } from 'react';
import './RandomJoke.css'; // Importing CSS for styling

const RandomJoke = () => {
    const [joke, setJoke] = useState({
        type: '',
        setup: '',
        punchline: '',
    });

    // Function to fetch a random joke
    const fetchJoke = async () => {
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setJoke({
                type: data.type,
                setup: data.setup,
                punchline: data.punchline,
            });
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setJoke({
                type: 'Error',
                setup: 'Failed to fetch a joke. Please try again later.',
                punchline: '',
            });
        }
    };

    // Load a joke when the component mounts
    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className="container">
            <h1>Random Joke Generator</h1>
            <div className="joke-card">
                {joke.type && (
                    <div className="joke-category">
                        <strong>Joke Category:</strong> <span>{joke.type}</span>
                    </div>
                )}
                {joke.setup && (
                    <div className="joke-text">
                        <strong>Joke:</strong> {joke.setup}
                    </div>
                )}
                {joke.punchline && (
                    <div className="joke-punchline">
                        <strong>Punchline:</strong> {joke.punchline}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RandomJoke;