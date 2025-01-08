'use client';
import React, { useEffect, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import VoiceSelector from '@/components/VoiceSelector';
import i18n from "@/components/i18n";
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from "@/utils/firestore";

export default function Page() {
    // Creating local state for volume, voice and language
    const { settings, setSpeechVolume, setSettings } = useSettings();
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [language, setLanguage] = useState('en');

    // Function to save a users preferences
    const saveUserPreferences = async (settings) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            try {
                await setDoc(userRef, { settings }, { merge: true });
                console.log('Settings saved!');
            } catch (error) {
                console.error('Error saving settings:', error);
            }
        } else {
            console.log('No user is currently logged in.');
        }
    };

    // Function to load user preferences from firestore
    const loadUserPreferences = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userRef = doc(db, 'users', user.uid);
            try {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    return data.settings || {};
                } else {
                    console.log('This user has no settings chosen.');
                    return {};
                }
            } catch (error) {
                console.error('Error loading settings:', error);
                return {};
            }
        } else {
            console.log('No user is logged in.');
            return {};
        }
    };

    // useEffect to load a users settings
    useEffect(() => {
        const fetchSettings = async () => {
            const userSettings = await loadUserPreferences();
            setSettings((prev) => ({ ...prev, ...userSettings }));
        };
        fetchSettings();
    }, [setSettings]);

    // Handle speech volume changes and update it in firestore
    const handleSpeechVolumeChange = (value) => {
        setSpeechVolume(value);
        textToSpeechHandler.speak("Volume set to " + value + " percent", {
            volume: value / 100,
            voice: selectedVoice,
        });
        handleSettingsChange({ ...settings, volume: value });
    };

    // Handle voice changes and update it in firestore
    const handleVoiceChange = (voice) => {
        setSelectedVoice(voice);
        textToSpeechHandler.speak("Voice changed to " + voice.name, { voice });
        handleSettingsChange({ ...settings, voice: voice.name });
    };

    // Handle language changes and update i18n and firestore
    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        textToSpeechHandler.speak(`Language changed to ${selectedLanguage}`, {
            lang: selectedLanguage,
            voice: selectedVoice });
        handleSettingsChange({ ...settings, language: selectedLanguage });
    };

    // Function to update settings in context and firestore
    const handleSettingsChange = (newSettings) => {
        setSettings(newSettings);
        saveUserPreferences(newSettings);
    };

    // UI elements that will be displayed on the settings page
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* Text-to-Speech Volume Slider */}
            <div className="mb-4">
                <label htmlFor="speechVolume" className="block text-lg font-medium text-white mb-2">Text-to-Speech Volume</label>
                <input
                    type="range"
                    id="speechVolume"
                    min="0"
                    max="100"
                    value={settings.volume * 100 || 0} // Default value in case volume is not set
                    onChange={(e) => handleSpeechVolumeChange(Number(e.target.value))}
                    className="w-60 h-2 bg-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <span className="text-lg ml-3">{Math.round(settings.volume * 100) || 0}%</span> {/* Ensure default value */}
            </div>

            {/* Voice Selector Component */}
            <div className="mb-4">
                <label htmlFor="voices" className="block text-lg font-medium text-white mb-2">Select Voice:</label>
                <VoiceSelector onVoiceChange={handleVoiceChange} />
            </div>

            {/* Language Selector */}
            <div className="mb-4">
                <label htmlFor="language" className="block text-lg font-medium text-white mb-2">Text-to-speech Language</label>
                <select
                    id="language"
                    value={settings.language || "en"} // Default language
                    onChange={handleLanguageChange}
                    className="w-60 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                </select>
            </div>
        </div>
    );
}
