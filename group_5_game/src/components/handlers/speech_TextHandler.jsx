'use client';

/**
 * SpeechToTextHandler Class
 *
 * A class that handles speech-to-text functionality using the Web Speech API.
 * This handler manages voice recognition, transcription, and related state.
 *
 * @class
 * 
 * 
 * 
 * @example
 * // Import the handler.
 * import { speechToTextHandler } from '../handlers/speech_TextHandler';
 *
 * // Start listening.
 * speechToTextHandler.handleStartListening({
 *   onResult: (text) => {
 *     // Handle the recognized text.
 *   },
 *   setIsListening: (isListening) => {
 *     // Update listening state.
 *   },
 * });
 *
 * // Stop listening.
 * speechToTextHandler.handleStopListening({
 *   setIsListening: (isListening) => {
 *     // Update listening state.
 *   },
 * });
 */
class SpeechToTextHandler {
    constructor() {
        this.isListening = false;

        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                this.recognition = new SpeechRecognition();
                this.recognition.continuous = true;
                this.recognition.interimResults = false;
                this.recognition.maxAlternatives = 1;
                this.recognition.lang = 'en-US';

                // Bind event handlers.
                this.recognition.onresult = this.handleResult.bind(this);
                this.recognition.onerror = this.handleError.bind(this);
                this.recognition.onend = this.handleEnd.bind(this);
            }
        }
    }

    /**
     * Handles speech recognition results.
     * Processes final transcripts and invokes the result callback.
     *
     * @param {any} event - The recognition result event.
     * @private
     */
    handleResult(event) {
        const current = event.results[event.results.length - 1];

        if (current.isFinal) {
            const finalTranscript = current[0].transcript;

            // Remove before deployment: Log the received transcript.
            console.log('Received transcript:', finalTranscript);

            // Invoke the result callback.
            this.onResultCallback(finalTranscript);
        }
    }

    /**
     * Handles speech recognition errors.
     * Logs errors and invokes the error callback if provided.
     *
     * @param {any} error - The error event from speech recognition.
     * @private
     */
    handleError(error) {
        // Remove before deployment: Log speech recognition errors.
        console.warn('Speech Recognition Error:', error);

        if (this.onErrorCallback) {
            this.onErrorCallback(error);
        }
    }

    /**
     * Handles the end of speech recognition.
     * Updates the listening state and invokes the end callback if provided.
     *
     * @private
     */
    handleEnd() {
        // Remove before deployment: Log when speech recognition ends.
        console.log('Speech recognition ended.');

        this.isListening = false;
        if (this.onEndCallback) {
            this.onEndCallback();
        }
    }

    /**
     * Starts speech recognition.
     *
     * @param {Object} options - Options for starting speech recognition.
     * @param {function} options.onResult - Callback for handling recognition results.
     * @param {function} options.onError - Callback for handling recognition errors.
     * @returns {Promise<void>} - A promise that resolves when recognition starts.
     *
     * @public
     * @example
     * speechToTextHandler.start({
     *   onResult: (text) => {
     *     // Handle recognized text
     *   },
     *   onError: (error) => {
     *     // Handle errors
     *   },
     * });
     */
    start(options = {}) {
        return new Promise((resolve, reject) => {
            if (!this.recognition) {
                reject(new Error('SpeechRecognition is not supported in this browser.'));
                return;
            }

            if (this.isListening) {
                // Remove before deployment: Warn if recognition is already running.
                console.warn('Speech recognition is already running.');
                resolve();
                return;
            }

            this.onResultCallback = options.onResult;
            this.onErrorCallback = options.onError;

            try {
                this.recognition.start();
                this.isListening = true;

                // Remove before deployment: Log that speech recognition has started.
                console.log('Speech recognition started.');

                resolve();
            } catch (error) {
                console.error('Failed to start speech recognition:', error);
                reject(error);
            }
        });
    }

    /**
     * Stops speech recognition.
     *
     * @returns {Promise<void>} - A promise that resolves when recognition stops.
     *
     * @public
     * @example
     * speechToTextHandler.stop();
     */
    stop() {
        return new Promise((resolve, reject) => {
            if (!this.recognition) {
                reject(new Error('SpeechRecognition is not supported in this browser.'));
                return;
            }

            if (!this.isListening) {
                // Remove before deployment: Warn if recognition is already stopped.
                console.warn('Speech recognition is already stopped.');
                resolve();
                return;
            }

            try {
                this.recognition.stop();

                // Remove before deployment: Log that speech recognition is stopping.
                console.log('Stopping speech recognition...');

                resolve();
            } catch (error) {
                console.error('Failed to stop speech recognition:', error);
                reject(error);
            }
        });
    }

    /**
     * Starts speech recognition with provided callbacks.
     *
     * @param {Object} options - Options for starting speech recognition.
     * @param {function} options.onResult - Callback for handling recognition results.
     * @param {function} options.setIsListening - State setter for listening status.
     *
     * @public
     * @example
     * speechToTextHandler.handleStartListening({
     *   onResult: (text) => {
     *     // Handle recognized text
     *   },
     *   setIsListening: (isListening) => {
     *     // Update listening state
     *   },
     * });
     */
    handleStartListening(options = {}) {
        const { onResult, setIsListening } = options;

        // Remove before deployment: Log that handleStartListening was invoked.
        console.log('handleStartListening invoked.');

        this.start({
            onResult: (text) => {
                // Remove before deployment: Log the received transcript.
                console.log('Received transcript:', text);
                onResult(text);
            },
            onError: (error) => {
                // Remove before deployment: Log speech recognition errors.
                console.warn('Speech Recognition Error:', error);
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
     * Stops speech recognition and updates listening state.
     *
     * @param {Object} options - Options for stopping speech recognition.
     * @param {function} options.setIsListening - State setter for listening status.
     *
     * @public
     * @example
     * speechToTextHandler.handleStopListening({
     *   setIsListening: (isListening) => {
     *     // Update listening state
     *   },
     * });
     */
    handleStopListening(options = {}) {
        const { setIsListening } = options;

        // Remove before deployment: Log that handleStopListening was invoked.
        console.log('handleStopListening invoked.');

        this.stop()
            .then(() => {
                setIsListening(false);
            })
            .catch((error) => {
                console.error('Failed to stop speech recognition:', error);
            });
    }
}

export const speechToTextHandler = new SpeechToTextHandler();
