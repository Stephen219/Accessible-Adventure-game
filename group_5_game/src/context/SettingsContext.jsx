"use client";

import { createContext, useContext, useState } from "react";

// Create context for settings
const SettingsContext = createContext();

// SettingsProvider component to wrap the app with context
export function SettingsProvider({ children }) {
    // Initialize state for speech volume, voice and language
    const [speechVolume, setSpeechVolume] = useState(100);
    const [voice, setVoice] = useState("default");
    const [language, setLanguage] = useState("en");

    // Function to update settings in the context
    const setSettings = (newSettings) => {
        if (newSettings.volume !== undefined) {
        }
        if (newSettings.voice !== undefined) {
            setVoice(newSettings.voice);
        }
        if (newSettings.language !== undefined) {
            setLanguage(newSettings.language);
        }
    };

    return (
        // Provide settings and functions to children components
        <SettingsContext.Provider
            value={{
                settings: {
                    volume: speechVolume / 100,
                    voice,
                    language,
                },
                setSpeechVolume,
                setSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

// Custom export to access the settings context
export function useSettings() {
    return useContext(SettingsContext);
}
