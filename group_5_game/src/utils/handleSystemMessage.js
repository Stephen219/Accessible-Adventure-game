import { capitalize } from './capitalize';
import { textToSpeechHandler } from '@/components/handlers/TextToSpeechHandler';

/**
 * Handles system-generated messages, ensuring proper text-to-speech and transcript updates.
 * @param {string} message - The message to be spoken and added to the transcript.
 * @param {function} setIsSystemSpeaking - State setter to track if the system is speaking.
 * @param {function} updateTranscript - Function to update the transcript.
 * @returns {Promise<void>}
 */
export const handleSystemMessage = async (message, setIsSystemSpeaking, updateTranscript) => {
    try {
        setIsSystemSpeaking(true); // Indicates the system is speaking.
        await textToSpeechHandler.say(message); // Speaking the system message.
        updateTranscript('System', capitalize(message)); // Updating the transcript.
    } catch (error) {
        console.error('Error handling system message:', error);
    } finally {
        setIsSystemSpeaking(false); // Resets the system-speaking state.
    }
};

