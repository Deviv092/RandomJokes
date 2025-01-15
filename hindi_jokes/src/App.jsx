import React, { useState, useEffect } from 'react';
import './RandomJoke.css'; // Importing CSS for styling

const RandomJoke = () => {
    const [jokes, setJokes] = useState([]); // State for storing jokes
    const [count, setCount] = useState(1); // State for the number of jokes to fetch
    const apiKey = 'ede34aecc81923775d3294e0398e'; // Your API key

    // Function to fetch a random joke
    const fetchRandomJoke = async () => {
        try {
            const response = await fetch(`https://hindi-jokes-api.onrender.com/jokes?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Check if the response contains the expected structure
            if (data && data.status === "Success" && data.jokeContent) {
                setJokes([data]); // Set the joke content directly
            } else {
                console.error('No jokes found in random joke response');
                setJokes([]); // Clear jokes if none found
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setJokes([]); // Clear jokes on error
        }
    };

    // Function to fetch multiple jokes
    const fetchJokes = async (jokeCount = 1) => {
        try {
            const response = await fetch(`https://hindi-jokes-api.onrender.com/jokes/${jokeCount}?api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Check if the response contains jokes
            if (data && data.status === "Success" && Array.isArray(data.data)) {
                setJokes(prevJokes => [...prevJokes, ...data.data]); // Append new jokes to the existing jokes
            } else {
                console.error('No jokes found in multiple jokes response');
                setJokes([]); // Clear jokes if none found
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setJokes([]); // Clear jokes on error
        }
    };

    // Load a random joke when the component mounts
    useEffect(() => {
        fetchRandomJoke(); // Fetch a random joke on initial load
    }, []);

    // Handle the input change
    const handleCountChange = (e) => {
        const value = e.target.value; // Get the input value
        if (value === '') {
            setCount(''); // Reset count if input is empty
        } else {
            const intValue = Math.max(1, Math.min(49, parseInt(value, 10))); // Ensure value is between 1 and 49
            setCount(intValue); // Update the count state with the valid integer
        }
    };

    // Handle the generate jokes button click
    const handleGenerateJokes = () => {
        if (count > 0 && count <= 49) {
            fetchJokes(count); // Fetch the specified number of jokes
        } else {
            alert('Please enter a number between 1 and 49'); // Alert for invalid input
        }
    };

    return (
        <div className="random-joke-container">
            <h1>Random Joke Generator</h1>
            <div className="joke-display">
                <h2>Random Joke:</h2>
                {jokes.length > 0 ? (
                    <div className="joke-card">
                        <p>{jokes[0].jokeContent}</p> {/* Display the random joke */}
                    </div>
                ) : (
                    <p>No random joke found.</p> // Message when no random joke is available
                )}
            </div>
            <button onClick={fetchRandomJoke}>Next Random Joke</button> {/* Button for next random joke */}
            <div className="input-section">
                <input
                    type="number"
                    value={count}
                    onChange={handleCountChange}
                    placeholder="Enter number of jokes (1-49)"
                />
                <button onClick={handleGenerateJokes}>Generate Jokes</button> {/* Button to generate jokes */}
            </div>
            <div className="generated-jokes">
                <h2>Generated Jokes:</h2>
                {jokes.length > 1 ? (
                    jokes.slice(1).map((joke, index) => (
                        <div key={index} className="joke-card">
                            <p>{joke.jokeContent}</p> {/* Display each generated joke */}
                        </div>
                    ))
                ) : (
                    <p>No generated jokes available.</p> // Message when no generated jokes are available
                )}
            </div>
        </div>
    );
};

export default RandomJoke;