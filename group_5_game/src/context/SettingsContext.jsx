"use client";

import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [speechVolume, setSpeechVolume] = useState(100);

    return (
        <SettingsContext.Provider
            value={{
                settings: {
                    volume: speechVolume / 100, // Normalize to 0-1 for volume
                },
                setSpeechVolume,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}
