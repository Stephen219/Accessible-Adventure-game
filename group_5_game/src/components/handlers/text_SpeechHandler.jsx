
'use client';
import React from 'react';
import React, { useState, useEffect } from 'react';
import { textToSpeechHandler } from '../handlers/text_SpeechHandler';

/**
 * TextToSpeechHandler Class
 * to use this class, import it using the following code:
 * @import { textToSpeechHandler } from '../handlers/text_SpeechHandler';
 * textToSpeechHandler.say('Hello, world!') // to speak the text with default settings
 * textToSpeechHandler.speak('Hello', { rate: 1.5, pitch: 1.2 }) // to speak the text with custom settings
 * A utility class that provides text-to-speech functionality using the Web Speech API.
 * Supports various voice options, speech rates, and pitches.
 *
 *
 * @class
 */


class TextToSpeechHandler {
    constructor() {
        this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
        this.defaultOptions = {
            rate: 1,
            pitch: 1,
            volume: 1
        };
    }

    /**  in most cases this can be used unless you want to customize the speech options
     * Speaks text using default speech settings.
     *
     * @param {string} text - The text to be spoken
     * @returns {Promise<void>} Resolves when speech is complete
     * @throws {Error} If speech synthesis is not supported
     * @example
     * textToSpeechHandler.say('Hello, world!')
     */

    say(text) {
        return new Promise((resolve, reject) => {
            if (!this.synthesis) {
                reject(new Error('Speech synthesis not supported'));
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);

            // Use default options
            utterance.rate = this.defaultOptions.rate;
            utterance.pitch = this.defaultOptions.pitch;
            utterance.volume = this.defaultOptions.volume;

            utterance.onend = () => resolve();
            utterance.onerror = (error) => reject(error);

            this.synthesis.speak(utterance);
        });
    }


    /**
     * Speaks text with customizable speech options.
     *
     * @param {string} text - The text to be spoken
     * @param {Object} options - Speech configuration options
     * @param {number} [options.rate=1] - Speech rate (0.1 to 10)
     * @param {number} [options.pitch=1] - Speech pitch (0 to 2)
     * @param {number} [options.volume=1] - Speech volume (0 to 1)
     * @param {SpeechSynthesisVoice} [options.voice] - Specific voice to use
     * @returns {Promise<void>} Resolves when speech is complete
     * @throws {Error} If speech synthesis is not supported
     * @example
     * textToSpeechHandler.speak('Hello', { rate: 1.5, pitch: 1.2 })
     */

    speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.synthesis) {
                reject(new Error('Speech synthesis not supported'));
                return;
            }

            const utterance = new SpeechSynthesisUtterance(text);

            utterance.rate = options.rate || 1;
            utterance.pitch = options.pitch || 1;
            utterance.volume = options.volume || 1;

            if (options.voice) {
                utterance.voice = options.voice;
            }

            utterance.onend = () => resolve();
            utterance.onerror = (error) => reject(error);

            this.synthesis.speak(utterance);
        });
    }


    getVoices() {
        return this.synthesis ? this.synthesis.getVoices() : [];
    }

    pause() {
        if (this.synthesis) this.synthesis.pause();
    }

    resume() {
        if (this.synthesis) this.synthesis.resume();
    }

    cancel() {
        if (this.synthesis) this.synthesis.cancel();
    }


    export
    const
    textToSpeechHandler = new TextToSpeechHandler();

