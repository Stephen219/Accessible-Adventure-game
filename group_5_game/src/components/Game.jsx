

import React, { useState, useRef, useEffect } from 'react';
import '@/components/css/Game.css';
import SceneManager from './SceneManager.jsx';
import { speechToTextHandler } from '@/components/handlers/speech_TextHandler';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import GameTranscript from '@/components/GameTranscript';
import Inventory from '@/components/Inventory';


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
    const [speechRate, setSpeechRate] = useState(1); // Default speech rate

    const [gameStarted, setGameStarted] = useState(false);
    let [currentScene, setCurrentScene] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Track audio playing state
    const [transcript, setTranscript] = useState([]);
    const [announcement, setAnnouncement] = useState('');
    const [InventoryList, setInventoryList] = useState(['Knife', 'Stick']);

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
        const currentTime = new Date().toLocaleTimeString([], {hour12: false});
        setTranscript((prev) => [
            ...prev,
            {type, text: text.trim(), time: currentTime},
        ]);
    };


    const increaseSpeechRate = () => {
        if (speechRate === 2.0) return; // Prevent going above 2.0
        setSpeechRate((prevRate) => Math.min(prevRate + 0.5, 2.0)); // Cap at 2.0
    };

    const decreaseSpeechRate = () => {
        if (speechRate === 0.5) return; // Prevent going below 0.5
        setSpeechRate((prevRate) => Math.max(prevRate - 0.5, 0.5)); // Minimum 0.5
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



    const handleSystemMessage = async (message) => {
        // Ensure mic is off during system response
        await speechToTextHandler.handleStopListening({setIsListening});

        updateTranscript('System', message);
        console.log('SysthFFFFFuVFVhuhem:   delete me', message); // FIX ME: Delete this line

        setIsSpeaking(true);

        try {
            // Speak the system message
            // await textToSpeechHandler.speak(message);
            await textToSpeechHandler.speak(message, {rate: speechRate});
        } finally {
            setIsSpeaking(false);

            // Resume speech recognition only if no audio is playing
            if (!isAudioPlaying) {
                speechToTextHandler.handleStartListening({
                    onResult: handleUserSpeech,
                    setIsListening,
                });
            }
        }
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
        const trimmedText = text.trim().toLowerCase();

        updateTranscript('User', text);

        if (!gameStartedRef.current && trimmedText.includes('start game')) {
            setGameStarted(true);
            handleSystemMessage('The game has started. ' + getSceneDescription(1));
        } else if (gameStartedRef.current) {
            if (trimmedText.includes('go faster')) {
                increaseSpeechRate();
                handleSystemMessage('Speaking faster.');
            } else if (trimmedText.includes('go slower')) {
                decreaseSpeechRate();
                handleSystemMessage('Speaking slower.');

            } else if (trimmedText.includes('where')) {
                console.log('Current scene:', currentScene);

                // Respond with the current scene description
                handleSystemMessage(getSceneDescription(currentScene));
            } else if (trimmedText.includes('go to') && currentScene === 1) {
            } else if (trimmedText.includes('instructions')) {
                speakInstructions();  // Trigger the instructions

                setCurrentScene(2);  // Transition to scene 2
                currentScene = 2;
                console.log('Transitioning to scene 2');
                playAudioAndTransition(2);
            } else if (trimmedText.includes('yes') && currentScene === 2) {
                console.log('Transitioning to scene 3');
                // if (isAudioPlaying) return; // Prevent duplicate audio playback
                // setCurrentScene(3);
                // handleSystemMessage(getSceneDescription(3));
                setCurrentScene(3);  // Transition to scene 2
                currentScene = 3;
                console.log('Transitioning to scene 2');
                playAudioAndTransition(3);
            } else if (trimmedText.toLowerCase().includes('number') && currentScene === 3) {
                if (isAudioPlaying) return; // Prevent duplicate audio playback
                setCurrentScene(1);  // Transition to scene 2
                currentScene = 1;
                console.log('Transitioning to scene 1');
                console.log('Current scene:', currentScene);

            } else {
                handleSystemMessage('Command not recognized. Please repeat.');
            }
        }
    };


    const playAudioAndTransition = (sceneNumber) => {
        const audioMap = {
            2: '/walking.mp3',
            3: '/transition3.mp3', // Example for scene 3 audio
        };

        const audioSrc = audioMap[sceneNumber];
        if (audioSrc && !isAudioPlaying) {
            // Ensure mic is off during audio playback
            speechToTextHandler.handleStopListening({setIsListening});

            const audio = new Audio(audioSrc);

            setIsAudioPlaying(true); // Set audio playing state to true

            audio.play().catch((err) => console.error('Audio playback error:', err));

            audio.onended = async () => {
                setIsAudioPlaying(false); // Reset audio playing state
                // When audio finishes, handle the next steps
                if (sceneNumber === 2) {
                    await handleSystemMessage(getSceneDescription(2)); // Announce Scene 2 after audio
                } else if (sceneNumber === 3) {
                    await handleSystemMessage(getSceneDescription(3)); // Announce Scene 3 after audio
                }
                // Start listening again after audio finishes
                speechToTextHandler.handleStartListening({
                    onResult: handleUserSpeech,
                    setIsListening,
                });
            };
        }
    };

    /**
     * Toggles speech recognition on or off based on the current listening state.
     *
     * If speech recognition is not active, it starts listening and sets up the necessary callbacks.
     * If it is already active, it stops listening to conserve resources and prevent unintended input.
     */

    const startListening = () => {
        if (!isListening && !isSpeaking && !isAudioPlaying) {
            // Ensure mic isn't on during audio playback
            speechToTextHandler.handleStartListening({
                onResult: handleUserSpeech,
                setIsListening,
            });
        } else {
            speechToTextHandler.handleStopListening({setIsListening});
        }
    };


    const getSceneDescription = (sceneNumber) => {
        switch (sceneNumber) {
            case 1:
                return 'You are at a crossroads. The path to the left leads into a forest. The path to the right leads to a hill with a village. Where do you want to go?';
            case 2:
                return 'Oh no, I’m at a wide, rushing river. The current is so strong! I have a rope, a stick, a knife, and a matchstick. What can I use to cross? Help me, please!';
            case 3:
                return 'You are in a village with cobblestone streets and warm cottages. Villagers greet you kindly. What will you do next?';
            default:
                return 'Unknown scene.';
        }

    };


    /**
     * Defines a list of voice commands that users can use to interact with the game.
     *
     * Each command has a specific action that the game can recognize. The commands range from controlling the game flow (e.g., "Start Game")
     * to manipulating the text-to-speech settings (e.g., "Go Faster"). This array allows for easy management and expansion of voice commands.
     */

    const voiceCommands = [
        { command: "Start Game", description: "Starts the game." },
        { command: "Go Faster", description: "Makes the text-to-speech speech faster." },
        { command: "Go Slower", description: "Makes the text-to-speech speech slower." },
        { command: "Where", description: "Tells you where you currently are in the game." },
        { command: "Go to", description: "Takes you to a specific scene in the game." },
        { command: "Yes", description: "Confirms your action." },
        { command: "No", description: "Cancels the current action." },
    ];

    const speakInstructions = () => {
        const instructionsText = voiceCommands.map(
            (command) => `${command.command}: ${command.description}`
        ).join('. ');

        handleSystemMessage(instructionsText);
    };



    /**
     * Toggles speech recognition on or off based on the current listening state.
     *
     * If speech recognition is not active, it starts listening and sets up the necessary callbacks.
     * If it is already active, it stops listening to conserve resources and prevent unintended input.
     */


    return (
        <div className="game-container">
            <h1 className="game-title">Adventure Game</h1>

            {/* Display instructions or announcement */}
            {announcement ? (
                <p className="announcement">{announcement}</p>
            ) : (
                <p className="instruction">
                    Say <strong>&quot;start game&quot;</strong>, <strong>&quot;stop game&quot;</strong>,
                    <strong>&quot;restart game&quot;</strong> or <strong>&quot;instructions&quot;</strong>.
                </p>
            )}

            {/* Button to start or stop listening for speech input */}
            <button onClick={startListening} className="listen-button">
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <hr className="divider"/>

            {/* Inventory Component */}
            <Inventory/>

            {/* Component to display the game's transcript */}
            <GameTranscript transcript={transcript}/>
        </div>
    );


    {/* Game Content Section */
    }
    <div className="w-full max-w-4xl bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">
            Adventure Game
        </h1>

        {/* <button
    onClick={() =>
      playSceneAudio(2, () => console.log('Audio playback completed'))
    }
    className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-md text-lg mb-4"
  >
    Test Audio
  </button> */}

        {!gameStarted ? (
            <p className="text-gray-300 text-lg italic">
                Say <span className="text-purple-400 font-bold">Start Game</span> to
                begin.
            </p>
        ) : (
            <div className="mt-4">
                <SceneManager currentScene={currentScene}/>
            </div>
        )}

        <button
            onClick={startListening}
            className={`mt-6 bg-${
                isListening ? 'red-600' : 'purple-600'
            } hover:bg-${
                isListening ? 'red-700' : 'purple-700'
            } transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-md text-lg`}
            disabled={isSpeaking || isAudioPlaying} // Disable listening when audio is playing
        >
            {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
    </div>
};
export default Game;
