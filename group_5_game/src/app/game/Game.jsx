'use client';

import React, { useState } from 'react';
import '@/components/css/Game.css';
import { speechToTextHandler } from '@/components/handlers/SpeechToTextHandler';
import { textToSpeechHandler } from '@/components/handlers/TextToSpeechHandler';
import GameTranscript from '@/components/GameTranscript';

const Game = () => {
    // State variables for game status, listening state, system speech state, and transcript.
    const [gameStarted, setGameStarted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSystemSpeaking, setIsSystemSpeaking] = useState(false);
    const [transcript, setTranscript] = useState([]);

    /**
     * Updates the transcript by adding a new entry.
     * Formats user input to capitalize the first word and ensure it ends with a period.
     * @param {string} type - The speaker type ("User" or "System").
     * @param {string} text - The text to add to the transcript.
     */
    const updateTranscript = (type, text) => {
        const formattedText =
            type === 'User'
                ? text.charAt(0).toUpperCase() + text.slice(1).trim() + (text.endsWith('.') ? '' : '.')
                : text.trim();

        setTranscript((prev) => [
            ...prev,
            { type, text: formattedText },
        ]);
    };

    /**
     * Handles a system-generated message.
     * Speaks the message using text-to-speech and updates the transcript.
     * @param {string} message - The system message to process.
     */
    const handleSystemMessage = async (message) => {
        setIsSystemSpeaking(true); // Indicate that the system is speaking.
        updateTranscript('System', message); // Add the message to the transcript.

        try {
            await textToSpeechHandler.speak(message); // Speak the message.
        } catch (error) {
            console.error('Error during text-to-speech:', error);
        } finally {
            setIsSystemSpeaking(false); // Reset the speaking state.
        }
    };

    /**
     * Starts speech recognition and processes user input.
     * If the user says "start game", the game begins.
     */
    const startListening = () => {
        if (isSystemSpeaking) {
            console.log('System is speaking. Listening is temporarily disabled.');
            return;
        }

        speechToTextHandler.startListening((text) => {
            updateTranscript('User', text); // Add the user input to the transcript.

            if (!gameStarted && text.toLowerCase().includes('start game')) {
                setGameStarted(true); // Start the game.
                handleSystemMessage('The game has started!'); // Provide system feedback.
            }
        }, setIsListening);
    };

    /**
     * Stops speech recognition.
     */
    const stopListening = () => {
        speechToTextHandler.stopListening(setIsListening);
    };

    return (
        <div className="game-container">
            <h1 className="game-title">Adventure Game</h1>
            {/* Display instructions or game status based on whether the game has started. */}
            {!gameStarted ? (
                <p className="instruction">
                    Say <strong>&quot;start game&quot;</strong> to begin the game.
                </p>
            ) : (
                <p className="message">The game has started.</p>
            )}
            {/* Button to start or stop listening for speech input. */}
            <button
                onClick={isListening ? stopListening : startListening}
                className="listen-button"
                disabled={isSystemSpeaking}
            >
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <hr className="divider" />
            {/* Component to display the game's transcript. */}
            <GameTranscript transcript={transcript} />
        </div>
    );
};

export default Game;
