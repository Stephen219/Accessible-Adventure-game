'use client';

import React, { useState, useRef, useEffect } from 'react';
import '@/components/css/Game.css';
import { speechToTextHandler } from '@/components/handlers/speech_TextHandler';
import { textToSpeechHandler } from '@/components/handlers/TextToSpeechHandler';
import GameTranscript from '@/components/GameTranscript';

/**
 * Game Component
 *
 * This component represents the main game interface, handling speech recognition, text-to-speech, and game state management.
 * Users can start or stop listening, and the game will process voice commands to control the gameplay.
 *
 * @component
 * @returns {JSX.Element} - The rendered game component.
 */
const Game = () => {
    // State variables for game status, listening state, transcript, and announcement message.
    const [gameStarted, setGameStarted] = useState(false);
    const [isListening, setIsListening] = useState(false); // Tracks if speech recognition is active.
    const [transcript, setTranscript] = useState([]);
    const [announcement, setAnnouncement] = useState(''); // Tracks the current announcement.

    // Ref to keep track of the current gameStarted state.
    const gameStartedRef = useRef(gameStarted);

    // Update the ref whenever gameStarted state changes.
    useEffect(() => {
        gameStartedRef.current = gameStarted;
    }, [gameStarted]);

    /**
     * Updates the transcript by adding a new entry.
     *
     * This function formats the provided text, capitalizes the first word if the type is "User", ensures it ends with a period,
     * adds the current time in hh:mm:ss format, and then adds it to the transcript state to be displayed in the game transcript.
     *
     * @param {string} type - The speaker type ("User" or "System").
     * @param {string} text - The text to add to the transcript.
     */
    const updateTranscript = (type, text) => {
        const formattedText =
            type === 'User'
                ? text.charAt(0).toUpperCase() + text.slice(1).trim() + (text.endsWith('.') ? '' : '.')
                : text.trim();

        // Get the current time in hh:mm:ss format.
        const currentTime = new Date().toLocaleTimeString([], { hour12: false });

        // Add the new entry to the transcript state.
        setTranscript((prev) => [
            ...prev,
            { type, text: formattedText, time: currentTime },
        ]);
    };

    /**
     * Handles a system-generated message by speaking it aloud and updating the transcript.
     *
     * This function stops speech recognition to avoid conflicts, adds the system message to the transcript,
     * updates the announcement message if it's an announcement, uses text-to-speech to speak the message,
     * and then resumes speech recognition after speaking.
     *
     * @param {string} message - The system message to process.
     * @param {boolean} [isAnnouncement=false] - Indicates if the message is an important announcement.
     */
    const handleSystemMessage = (message, isAnnouncement = false) => {
        // Stop speech recognition while the system is speaking.
        speechToTextHandler.handleStopListening({ setIsListening });

        // Add the system message to the transcript.
        updateTranscript('System', message);

        // Update the announcement message if it's an announcement.
        if (isAnnouncement) {
            setAnnouncement(message);
        }

        // Speak the system message.
        textToSpeechHandler.speak(message).finally(() => {
            // Resume speech recognition after the system has finished speaking.
            speechToTextHandler.handleStartListening({
                onResult: handleUserSpeech,
                setIsListening,
            });
        });
    };

    /**
     * Processes the recognized speech input from the user.
     *
     * This function trims the input text, updates the transcript with the user's input,
     * and checks if the user has issued a command to start the game.
     *
     * @param {string} text - The recognized speech text.
     */
    const handleUserSpeech = (text) => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        updateTranscript('User', trimmedText);

        if (trimmedText.toLowerCase().includes('start game')) {
            if (!gameStartedRef.current) {
                setGameStarted(true);
                handleSystemMessage('The game has started!', true); // Mark as announcement.
            } else {
                handleSystemMessage('The game has already started.');
            }
        }
    };

    /**
     * Toggles speech recognition on or off based on the current listening state.
     *
     * If speech recognition is not active, it starts listening and sets up the necessary callbacks.
     * If it is already active, it stops listening to conserve resources and prevent unintended input.
     */
    const startListening = () => {
        if (!isListening) {
            speechToTextHandler.handleStartListening({
                onResult: handleUserSpeech,
                setIsListening,
            });
        } else {
            speechToTextHandler.handleStopListening({ setIsListening });
        }
    };

    return (
        <div className="game-container">
            <h1 className="game-title">Adventure Game</h1>

            {/* Display instructions or announcement */}
            {announcement ? (
                <p className="announcement">{announcement}</p>
            ) : (
                <p className="instruction">
                    Say <strong>&quot;start game&quot;</strong> to begin the game.
                </p>
            )}

            {/* Button to start or stop listening for speech input. */}
            <button onClick={startListening} className="listen-button">
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <hr className="divider" />

            {/* Component to display the game's transcript. */}
            <GameTranscript transcript={transcript} />
        </div>
    );
};

export default Game;
