'use client';
import React from 'react';
import { useState } from 'react';

import { textToSpeechHandler } from './handlers/text_SpeechHandler';
import { speechToTextHandler } from './handlers/speech_TextHandler';


export default function ExampleComponent() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const handleSpeak = async () => {
    try {
      await textToSpeechHandler.speak('Welcome to the game!', {
        rate: 1,
        pitch: 1,
        volume: 1
      });
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const handleCustomSpeak = async (text, customOptions) => {
    try {
      const voices = textToSpeechHandler.getVoices();
      await textToSpeechHandler.speak(text, {
        rate: customOptions.rate || 1,
        pitch: customOptions.pitch || 1,
        volume: customOptions.volume || 1,
        voice: customOptions.voiceIndex ? voices[customOptions.voiceIndex] : null
      });
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };




  return (
    <div className="p-4">
      <div className="mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => textToSpeechHandler.say('Welcome to the game!').catch(error =>
            console.error('Speech synthesis error:', error)
          )}
        >
          Speak Welcome Message
        </button>
      </div>
      <div className="mb-6 flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleCustomSpeak('Hello world', { voiceIndex: 1 })}
        >
          Different Voice
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleCustomSpeak('Hello world', { rate: 1.5, pitch: 1.2 })}
        >
          Fast & High
        </button>

        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() =>
            handleCustomSpeak('Hello world', {
              rate: 0.8,
              pitch: 0.9,
              volume: 0.8,
              voiceIndex: 2
            })
          }
        >
          Custom Voice
        </button>
      </div>

      <div>
        <button
          className={`bg-green-500 text-white px-4 py-2 rounded mr-2`}
          onClick={() => speechToTextHandler.handleStartListening(setTranscript, setIsListening)}
          disabled={isListening}
        >
          Start Listvfvvening
        </button>

        <button
          className={`bg-red-500 text-white px-4 py-2 rounded`}
          onClick={() => speechToTextHandler.handleStopListening(setIsListening)}

        >
          Stop Listening
        </button>

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>{transcript || 'Speak something...'}</p>
        </div>
      </div>
    </div>
  );
}
