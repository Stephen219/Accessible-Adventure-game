'use client';
import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import VoiceSelector from '@/components/VoiceSelector';

export default function Page() {
    const { settings, setSpeechVolume } = useSettings();
    const [selectedVoice, setSelectedVoice] = useState(null);

    const handleSpeechVolumeChange = (value) => {
        setSpeechVolume(value); // Update the volume directly
        textToSpeechHandler.speak("Volume set to " + value + " percent", {
            volume: value / 100,
            voice: selectedVoice, // Use the selected voice
        });
    };

    const handleVoiceChange = (voice) => {
        setSelectedVoice(voice); // Update the selected voice
        textToSpeechHandler.speak("Voice changed to " + voice.name, { voice });
    };

    return (
        <div>
            <h1>Settings</h1>

            {/* Text-to-Speech Volume Slider */}
            <div>
                <label htmlFor="speechVolume">Text-to-Speech Volume</label>
                <input
                    type="range"
                    id="speechVolume"
                    min="0"
                    max="100"
                    value={settings.volume * 100} // Convert back to percentage
                    onChange={(e) => handleSpeechVolumeChange(Number(e.target.value))}
                />
                <span>{Math.round(settings.volume * 100)}%</span>
            </div>

            {/* Voice Selector Component */}
            <div>
                <label htmlFor="voices">Select Voice:</label>
                <VoiceSelector onVoiceChange={handleVoiceChange}/>
            </div>
        </div>
    );
}
