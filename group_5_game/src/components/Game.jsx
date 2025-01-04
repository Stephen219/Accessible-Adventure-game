import React, { useState, useRef, useEffect } from 'react';
import '@/components/css/Game.css';
import SceneManager from './SceneManager.jsx';
import { speechToTextHandler } from '@/components/handlers/speech_TextHandler';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import GameTranscript from '@/components/GameTranscript';
import Inventory from '@/components/Inventory';

const Game = () => {
    // State variables
    const [gameStarted, setGameStarted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState([]);
    const [announcement, setAnnouncement] = useState('');
    const [inventory, setInventory] = useState(['Knife', 'Stick']);
    const gameStartedRef = useRef(gameStarted);

    // Update ref whenever gameStarted state changes
    useEffect(() => {
        gameStartedRef.current = gameStarted;
    }, [gameStarted]);

    const updateTranscript = (type, text) => {
        const currentTime = new Date().toLocaleTimeString([], { hour12: false });
        setTranscript((prev) => [
            ...prev,
            { type, text: text.trim(), time: currentTime },
        ]);
    };

    const handleSystemMessage = async (message) => {
        await speechToTextHandler.handleStopListening({ setIsListening });
        updateTranscript('System', message);
        setIsSpeaking(true);

        try {
            await textToSpeechHandler.speak(message);
        } finally {
            setIsSpeaking(false);
            if (!isAudioPlaying) {
                speechToTextHandler.handleStartListening({
                    onResult: handleUserSpeech,
                    setIsListening,
                });
            }
        }
    };

    const handleUserSpeech = (text) => {
        const trimmedText = text.trim().toLowerCase();
        updateTranscript('User', text);

        if (!gameStartedRef.current && trimmedText.includes('start game')) {
            setGameStarted(true);
            handleSystemMessage('The game has started. ' + getSceneDescription(1));
        } else if (gameStartedRef.current) {
            if (trimmedText.includes('where')) {
                handleSystemMessage(getSceneDescription(currentScene));
            } else if (trimmedText.includes('go to') && currentScene === 1) {
                setCurrentScene(2);
                playAudioAndTransition(2);
            } else if (trimmedText.includes('yes') && currentScene === 2) {
                setCurrentScene(3);
                playAudioAndTransition(3);
            } else if (trimmedText.includes('number') && currentScene === 3) {
                setCurrentScene(1);
            } else if (trimmedText.includes('use')) {
                const itemToUse = trimmedText.split('use ')[1]?.trim();
                if (inventory.includes(itemToUse)) {
                    handleSystemMessage(`You used the ${itemToUse}.`);
                    setInventory(inventory.filter((item) => item !== itemToUse));
                } else {
                    handleSystemMessage(`You don't have a ${itemToUse} in your inventory.`);
                }
            } else if (trimmedText.includes('what items do i have')) {
                if (inventory.length > 0) {
                    handleSystemMessage(`You have the following items: ${inventory.join(', ')}.`);
                } else {
                    handleSystemMessage('Your inventory is empty.');
                }
            } else {
                handleSystemMessage('Command not recognized. Please repeat.');
            }
        }
    };

    const playAudioAndTransition = (sceneNumber) => {
        const audioMap = {
            2: '/walking.mp3',
            3: '/transition3.mp3',
        };

        const audioSrc = audioMap[sceneNumber];
        if (audioSrc && !isAudioPlaying) {
            speechToTextHandler.handleStopListening({ setIsListening });
            const audio = new Audio(audioSrc);

            setIsAudioPlaying(true);

            audio.play().catch((err) => console.error('Audio playback error:', err));

            audio.onended = async () => {
                setIsAudioPlaying(false);
                await handleSystemMessage(getSceneDescription(sceneNumber));
                speechToTextHandler.handleStartListening({
                    onResult: handleUserSpeech,
                    setIsListening,
                });
            };
        }
    };

    const startListening = () => {
        if (!isListening && !isSpeaking && !isAudioPlaying) {
            speechToTextHandler.handleStartListening({
                onResult: handleUserSpeech,
                setIsListening,
            });
        } else {
            speechToTextHandler.handleStopListening({ setIsListening });
        }
    };

    const getSceneDescription = (sceneNumber) => {
        switch (sceneNumber) {
            case 1:
                return 'You are at a crossroads. Where do you want to go?';
            case 2:
                return 'You are at a rushing river. How will you cross?';
            case 3:
                return 'You are in a village. What will you do next?';
            default:
                return 'Unknown scene.';
        }
    };

    return (
        <div className="game-container">
            <h1 className="game-title">Adventure Game</h1>

            {announcement ? (
                <p className="announcement">{announcement}</p>
            ) : (
                <p className="instruction">
                    Say <strong>&quot;start game&quot;</strong>, <strong>&quot;stop game&quot;</strong>,
                    or <strong>&quot;restart game&quot;</strong>.
                </p>
            )}

            <button onClick={startListening} className="listen-button">
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <hr className="divider" />

            <Inventory />
            <GameTranscript transcript={transcript} />

            <div className="w-full max-w-4xl bg-gray-800 bg-opacity-90 rounded-lg p-6 shadow-lg text-center">
                {!gameStarted ? (
                    <p className="text-gray-300 text-lg italic">
                        Say <span className="text-purple-400 font-bold">Start Game</span> to begin.
                    </p>
                ) : (
                    <div className="mt-4">
                        <SceneManager currentScene={currentScene} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Game;
