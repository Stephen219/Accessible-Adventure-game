import { useState, useEffect } from "react";
import { textToSpeechHandler } from "@/components/handlers/text_SpeechHandler";

const VoiceSelector = ({ onVoiceChange }) => {
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        // Populate available voices
        const populateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);

            if (availableVoices.length > 0 && !selectedVoice) {
                const defaultVoice = availableVoices[0];
                setSelectedVoice(defaultVoice);
                onVoiceChange(defaultVoice);
            }
        };

        if (typeof window !== "undefined" && window.speechSynthesis) {
            populateVoices();
            window.speechSynthesis.onvoiceschanged = populateVoices;
        }
    }, [onVoiceChange, selectedVoice]);

    const handleVoiceChange = (event) => {
        const selectedVoiceName = event.target.value;
        const voice = voices.find((v) => v.name === selectedVoiceName);
        setSelectedVoice(voice);
        onVoiceChange(voice);
    };

    return (
        <select onChange={handleVoiceChange} value={selectedVoice?.name || ""}>
            {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                    {voice.name} {voice.lang ? `(${voice.lang})` : ""}
                </option>
            ))}
        </select>
    );
};

export default VoiceSelector;
