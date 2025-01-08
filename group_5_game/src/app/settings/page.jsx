'use client';
import React, { useEffect, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import VoiceSelector from '@/components/VoiceSelector';
import i18n from "@/components/i18n";
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from "../utils/firestore";

export default function Page() {
    const { settings, setSpeechVolume, setSettings } = useSettings();
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [language, setLanguage] = useState('en');

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

    // Load user preferences from Firestore
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

    useEffect(() => {
        const fetchSettings = async () => {
            const userSettings = await loadUserPreferences();
            setSettings((prev) => ({ ...prev, ...userSettings }));
        };
        fetchSettings();
    }, [setSettings]);

    const handleSpeechVolumeChange = (value) => {
        setSpeechVolume(value);
        textToSpeechHandler.speak("Volume set to " + value + " percent", {
            volume: value / 100,
            voice: selectedVoice,
        });
        handleSettingsChange({ ...settings, volume: value });
    };

    const handleVoiceChange = (voice) => {
        setSelectedVoice(voice);
        textToSpeechHandler.speak("Voice changed to " + voice.name, { voice });
        handleSettingsChange({ ...settings, voice: voice.name });
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        textToSpeechHandler.speak(`Language changed to ${selectedLanguage}`, { lang: selectedLanguage });
        handleSettingsChange({ ...settings, language: selectedLanguage });
    };

    const handleSettingsChange = (newSettings) => {
        setSettings(newSettings);
        saveUserPreferences(newSettings);
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
                <VoiceSelector onVoiceChange={handleVoiceChange} />
            </div>

            {/* Language Selector */}
            <div>
                <label htmlFor="language">Text-to-speech Language</label>
                <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </div>
        </div>
    );
}
