// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import '@/components/css/Game.css';
// import { speechToTextHandler } from '@/components/handlers/speech_TextHandler';
// import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
// import GameTranscript from '@/components/GameTranscript';

// /**
//  * Game Component
//  *
//  * This component represents the main game interface, handling speech recognition, text-to-speech, and game state management.
//  * Users can start or stop listening, and the game will process voice commands to control the gameplay.
//  *
//  * @component
//  * @returns {JSX.Element} - The rendered game component.
//  */
// const Game = () => {
//     // State variables for game status, listening state, transcript, and announcement message.
//     const [gameStarted, setGameStarted] = useState(false);
//     const [isListening, setIsListening] = useState(false); // Tracks if speech recognition is active.
//     const [transcript, setTranscript] = useState([]);
//     const [announcement, setAnnouncement] = useState(''); // Tracks the current announcement.

//     // Ref to keep track of the current gameStarted state.
//     const gameStartedRef = useRef(gameStarted);

//     // Update the ref whenever gameStarted state changes.
//     useEffect(() => {
//         gameStartedRef.current = gameStarted;
//     }, [gameStarted]);

//     /**
//      * Updates the transcript by adding a new entry.
//      *
//      * This function formats the provided text, capitalizes the first word if the type is "User", ensures it ends with a period,
//      * adds the current time in hh:mm:ss format, and then adds it to the transcript state to be displayed in the game transcript.
//      *
//      * @param {string} type - The speaker type ("User" or "System").
//      * @param {string} text - The text to add to the transcript.
//      */
//     const updateTranscript = (type, text) => {
//         const formattedText =
//             type === 'User'
//                 ? text.charAt(0).toUpperCase() + text.slice(1).trim() + (text.endsWith('.') ? '' : '.')
//                 : text.trim();

//         // Get the current time in hh:mm:ss format.
//         const currentTime = new Date().toLocaleTimeString([], { hour12: false });

//         // Add the new entry to the transcript state.
//         setTranscript((prev) => [
//             ...prev,
//             { type, text: formattedText, time: currentTime },
//         ]);
//     };

//     /**
//      * Handles a system-generated message by speaking it aloud and updating the transcript.
//      *
//      * This function stops speech recognition to avoid conflicts, adds the system message to the transcript,
//      * updates the announcement message if it's an announcement, uses text-to-speech to speak the message,
//      * and then resumes speech recognition after speaking.
//      *
//      * @param {string} message - The system message to process.
//      * @param {boolean} [isAnnouncement=false] - Indicates if the message is an important announcement.
//      */
//     const handleSystemMessage = (message, isAnnouncement = false) => {
//         // Stop speech recognition while the system is speaking.
//         speechToTextHandler.handleStopListening({ setIsListening });

//         // Add the system message to the transcript.
//         updateTranscript('System', message);

//         // Update the announcement message if it's an announcement.
//         if (isAnnouncement) {
//             setAnnouncement(message);
//         }

//         // Speak the system message.
//         textToSpeechHandler.speak(message).finally(() => {
//             // Resume speech recognition after the system has finished speaking.
//             speechToTextHandler.handleStartListening({
//                 onResult: handleUserSpeech,
//                 setIsListening,
//             });
//         });
//     };

//     /**
//      * Processes the recognized speech input from the user.
//      *
//      * This function trims the input text, updates the transcript with the user's input,
//      * and checks if the user has issued a command to start the game.
//      *
//      * @param {string} text - The recognized speech text.
//      */
//     const handleUserSpeech = (text) => {
//         const trimmedText = text.trim();
//         if (!trimmedText) return;

//         updateTranscript('User', trimmedText);

//         if (trimmedText.toLowerCase().includes('start game')) {
//             if (!gameStartedRef.current) {
//                 setGameStarted(true);
//                 handleSystemMessage('The game has started!', true); // Mark as announcement.
//             } else {
//                 handleSystemMessage('The game has already started.');
//             }
//         }
//     };

//     /**
//      * Toggles speech recognition on or off based on the current listening state.
//      *
//      * If speech recognition is not active, it starts listening and sets up the necessary callbacks.
//      * If it is already active, it stops listening to conserve resources and prevent unintended input.
//      */
//     const startListening = () => {
//         if (!isListening) {
//             speechToTextHandler.handleStartListening({
//                 onResult: handleUserSpeech,
//                 setIsListening,
//             });
//         } else {
//             speechToTextHandler.handleStopListening({ setIsListening });
//         }
//     };

//     return (
//         <div className="game-container">
//             <h1 className="game-title">Adventure Game</h1>

//             {/* Display instructions or announcement */}
//             {announcement ? (
//                 <p className="announcement">{announcement}</p>
//             ) : (
//                 <p className="instruction">
//                     Say <strong>&quot;start game&quot;</strong> to begin the game.
//                 </p>
//             )}

//             {/* Button to start or stop listening for speech input. */}
//             <button onClick={startListening} className="listen-button">
//                 {isListening ? 'Stop Listening' : 'Start Listening'}
//             </button>
//             <hr className="divider" />

//             {/* Component to display the game's transcript. */}
//             <GameTranscript transcript={transcript} />
//         </div>
//     );
// };

// export default Game;



import React, { useState, useRef, useEffect } from 'react';
import '@/components/css/Game.css';
import SceneManager from './SceneManager.jsx';
import { speechToTextHandler } from '@/components/handlers/speech_TextHandler';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import GameTranscript from '@/components/GameTranscript';

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentScene, setCurrentScene] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Track audio playing state
    const [transcript, setTranscript] = useState([]);
    const gameStartedRef = useRef(gameStarted);

    useEffect(() => {
        gameStartedRef.current = gameStarted;
    }, [gameStarted]);

    const startListening = () => {
        if (!isListening && !isSpeaking && !isAudioPlaying) { // Ensure mic isn't on during audio playback
            speechToTextHandler.handleStartListening({
                onResult: handleUserSpeech,
                setIsListening,
            });
        } else {
            speechToTextHandler.handleStopListening({ setIsListening });
        }
    };

    const handleUserSpeech = (text) => {
        const trimmedText = text.trim().toLowerCase();

        updateTranscript('User', text);

        if (!gameStartedRef.current && trimmedText.includes('start game')) {
            setGameStarted(true);
            handleSystemMessage('The game has started. ' + getSceneDescription(1));
        } else if (gameStartedRef.current) {
            if (trimmedText.includes('go to') && currentScene === 1) {
                if (isAudioPlaying) return; // Prevent duplicate audio playback

                setCurrentScene(2);
                playSceneAudio(2, () => {
                    handleSystemMessage(getSceneDescription(2));
                });
            } else if (trimmedText.includes('go to scene 3') && currentScene === 2) {
                if (isAudioPlaying) return; // Prevent duplicate audio playback
                setCurrentScene(3);
                handleSystemMessage(getSceneDescription(3));
            } else if (trimmedText.includes('go to scene 1') && currentScene === 3) {
                if (isAudioPlaying) return; // Prevent duplicate audio playback
                setCurrentScene(1);
                handleSystemMessage(getSceneDescription(1));
            } else {
                handleSystemMessage('Command not recognized. Please repeat.');
            }
        }
    };

    const playSceneAudio = (sceneNumber, onComplete) => {
        const audioMap = {
            2: '/walking.mp3',
        };

        const audioSrc = audioMap[sceneNumber];
        if (audioSrc && !isAudioPlaying) { // Check if audio is already playing
            // Ensure mic is off during audio playback
            speechToTextHandler.handleStopListening({ setIsListening });

            const audio = new Audio(audioSrc);
            audio.play()
                .catch((err) => console.error('Audio playback error:', err));

            // Set the audio playing state to true
            setIsAudioPlaying(true);

            // Call onComplete after audio finishes
            audio.onended = () => {
                if (onComplete) onComplete();
                setIsAudioPlaying(false); // Reset audio playing state after the audio ends
                // Start listening again after audio finishes
                speechToTextHandler.handleStartListening({
                    onResult: handleUserSpeech,
                    setIsListening,
                });
            };

            // Fallback to ensure completion after 30 seconds
            setTimeout(() => {
                if (onComplete) onComplete();
                setIsAudioPlaying(false); // Reset audio playing state after 30 seconds
                // Start listening again after timeout
                speechToTextHandler.handleStartListening({
                    onResult: handleUserSpeech,
                    setIsListening,
                });
            }, 30000);
        } else if (onComplete) {
            // If no audio found, directly call onComplete
            onComplete();
        }
    };

    const updateTranscript = (type, text) => {
        const currentTime = new Date().toLocaleTimeString([], { hour12: false });
        setTranscript((prev) => [
            ...prev,
            { type, text: text.trim(), time: currentTime },
        ]);
    };

    const handleSystemMessage = async (message) => {
        // Ensure mic is off during system response
        speechToTextHandler.handleStopListening({ setIsListening });

        updateTranscript('System', message);

        setIsSpeaking(true);

        try {
            // Speak the system message
            await textToSpeechHandler.speak(message);
        } finally {
            setIsSpeaking(false);

            // Resume speech recognition after system response
            speechToTextHandler.handleStartListening({
                onResult: handleUserSpeech,
                setIsListening,
            });
        }
    };

    const getSceneDescription = (sceneNumber) => {
        switch (sceneNumber) {
            case 1:
                return 'You are at a crossroads. The path to the left leads into a forest. The path to the right leads to a hill with a village. Where do you want to go?';
            case 2:
                return 'You are now in a dark forest. Trees surround you, and the air smells of moss. Where will you go next?';
            case 3:
                return 'You are in a village with cobblestone streets and warm cottages. Villagers greet you kindly. What will you do next?';
            default:
                return 'Unknown scene.';
        }
    };

    // return (
    //     <div className="game-layout">
    //         {/* Transcript Section */}
    //         <div className="transcript-section">
    //             <GameTranscript transcript={transcript} />
    //         </div>

    //         {/* Game Content Section */}
    //         <div className="game-content-section">
    //             <h1 className="game-title">Adventure Game</h1>
    //             <button onClick={() => playSceneAudio(2, () => console.log('Audio playback completed'))}>
    //                 Test Audio
    //             </button>

    //             {!gameStarted ? (
    //                 <p>Say "Start Game" to begin.</p>
    //             ) : (
    //                 <SceneManager currentScene={currentScene} />
    //             )}

    //             <button
    //                 onClick={startListening}
    //                 className="listen-button"
    //                 disabled={isSpeaking || isAudioPlaying} // Disable listening when audio is playing
    //             >
    //                 {isListening ? 'Stop Listening' : 'Start Listening'}
    //             </button>
    //         </div>
    //     </div>
    // );
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center p-6">
          {/* Transcript Section */}
          <div className="bg-gray-700 bg-opacity-80 rounded-lg p-6 w-full max-w-4xl shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Transcript</h2>
            <div className="bg-gray-900 rounded-lg p-4 h-40 overflow-y-auto shadow-inner">
              <GameTranscript transcript={transcript} />
            </div>
          </div>
      
          {/* Game Content Section */}
          <div className="w-full max-w-4xl bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-6 text-purple-400">Adventure Game</h1>
            
            <button
              onClick={() => playSceneAudio(2, () => console.log('Audio playback completed'))}
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-md text-lg mb-4"
            >
              Test Audio
            </button>
      
            {!gameStarted ? (
              <p className="text-gray-300 text-lg italic">Say <span className="text-purple-400 font-bold">"Start Game"</span> to begin.</p>
            ) : (
              <div className="mt-4">
                <SceneManager currentScene={currentScene} />
              </div>
            )}
      
            <button
              onClick={startListening}
              className={`mt-6 bg-${isListening ? 'red-600' : 'purple-600'} hover:bg-${isListening ? 'red-700' : 'purple-700'} transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-md text-lg`}
              disabled={isSpeaking || isAudioPlaying} // Disable listening when audio is playing
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
          </div>
        </div>
      );
      
    
      
};

export default Game;

