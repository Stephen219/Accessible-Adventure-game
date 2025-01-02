'use client';
import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import {textToSpeechHandler} from "@/components/handlers/text_SpeechHandler";

export default function Page() {
    const { settings, setSpeechVolume } = useSettings();

    const handleSpeechVolumeChange = (value) => {
        setSpeechVolume(value); // Update the volume directly
        textToSpeechHandler.speak("Volume set to " + value + " percent", {
            volume: value / 100
        });
        };

    return (
        <div>
            <h1>Settings</h1>
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
        </div>
    );
}
