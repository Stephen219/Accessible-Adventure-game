'use client';
import React from 'react';
/**
 * SpeechToTextHandler Class
 * 
 * A class that handles speech-to-text functionality using the Web Speech API.
 * This handler manages voice recognition, transcription, and related state.
 * 
 * @class
*/

/**
 * to import this class, use the following code:
 *@import { speechToTextHandler } from './sTextHandler';
  * and then use the following code to start listening:
  * speechToTextHandler.handleStartListening(setTranscript, setIsListening); 
 */


class SpeechToTextHandler {
    /**
     * Creates an instance of SpeechToTextHandler.
     * Initializes speech recognition with browser-specific implementation.
     * 
     * @constructor
     * @property {boolean} isListening - Tracks if speech recognition is active
     * @property {SpeechRecognition} recognition - The Web Speech API recognition instance
     */
    constructor() {
        this.isListening = false;
      
        if (typeof window !== 'undefined') {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true; // Changed to false to avoid accumulation
            this.recognition.interimResults = false;
            this.recognition.maxAlternatives = 1;
            this.recognition.lang = 'en-US';
      
            this.recognition.onresult = this.handleResult.bind(this);
            this.recognition.onerror = this.handleError.bind(this);
            this.recognition.onend = this.handleEnd.bind(this);
          } else {
            console.error('SpeechRecognition API is not supported in this browser.');
            this.recognition = null;
          }

        }
      }

    /**
     * Handles speech recognition results.
     * Processes final transcripts and updates UI via callback.
     * 
     * @param {SpeechRecognitionEvent} event - The recognition result event
     * @private
     */

      handleResult(event) {
        const current = event.results[event.results.length - 1];
        if (current.isFinal) {
          const finalTranscript = current[0].transcript;
          // Update the transcript state with just this final result
          if (this.onResultCallback) {
            this.onResultCallback(finalTranscript);
          }
        }
      }
  
    
    handleError(error) {
      console.error('Speech Recognition Error:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback(error);
      }
    }
    handleEnd() {
      console.log('Speech recognition ended.');
      this.isListening = false;
      if (this.onEndCallback) {
        this.onEndCallback();
      }
    }
    /**
     * Starts speech recognition.
     * 
     * @param {function} setTranscript - The state setter for transcript
     * @param {function} setIsListening - The state setter for listening status
     * @public
     * @returns {Promise<void>}
     * 
     * // Example usage:
     * // speechToTextHandler.handleStartListening(setTranscript, setIsListening);
     * 
     */

    handleStartListening(setTranscript, setIsListening) {
      console.log('handleStartListening invoked');
      this.start({
        onResult: (text) => {
          console.log('Received transcript:', text);
          setTranscript(prev => prev + text + ' ');
        },
        onError: (error) => {
          console.error('Speech Recognition Error:', error);
        },
      })
        .then(() => {
          setIsListening(true);
        })
        .catch((error) => {
          setIsListening(false);
          console.error('Failed to start speech recognition:', error);
        });
    }

    /**
     * Stops speech recognition.
     * 
     * @param {function} setIsListening - The state setter for listening status
     * @public
     * @returns {Promise<void>}
     * 
     * // Example usage:
     * // speechToTextHandler.handleStopListening(setIsListening);
     * 
     */
     * 
    handleStopListening(setIsListening) {
      console.log('handleStopListening invoked');
      this.stop()
        .then(() => {
          setIsListening(false);
        })
        .catch((error) => {
          console.error('Failed to stop speech recognition:', error);
        });
    }

    /**
     * Starts speech recognition.
     */

    
    start(options = {}) {
      return new Promise((resolve, reject) => {
        if (!this.recognition) {
          reject(new Error('SpeechRecognition is not supported in this browser.'));
          return;
        }
  
        if (this.isListening) {
          console.warn('Speech recognition is already running.');
          resolve();
          return;
        }
  
        this.onResultCallback = options.onResult;
        this.onErrorCallback = options.onError;
  
        try {
          this.recognition.start();
          this.isListening = true;
          console.log('Speech recognition started.');
          resolve();
        } catch (error) {
          console.error('Failed to start speech recognition:', error);
          reject(error);
        }
      });
    }
  
    stop() {
      return new Promise((resolve, reject) => {
        if (!this.recognition) {
          reject(new Error('SpeechRecognition is not supported in this browser.'));
          return;
        }
  
        if (!this.isListening) {
          console.warn('Speech recognition is already stopped.');
          resolve();
          return;
        }
  
        try {
          this.recognition.stop();
          this.isListening = false;
          console.log('Stopping speech recognition...');
          resolve();
        } catch (error) {
          console.error('Failed to stop speech recognition:', error);
          reject(error);
        }
      });
    }
  }
  
  export const speechToTextHandler = new SpeechToTextHandler();
  