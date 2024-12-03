import React from 'react';
import { useState } from 'react';

export default function Settings() {
    const [speechVolume, setSpeechVolume] = useState(50);
    const [soundEffectsVolume, setSoundEffectsVolume] = useState(50);

    return (
        <div>
            <h1>Settings</h1>

        <div>
            <label htmlFor={'speechVolume'}>text-to-speech volume</label>
            <input
                type={'range'}
                id={'speechVolume'}
                min={'0'}
                max={'100'}
                value={speechVolume}
                onChange={(e) => setSpeechVolume(e.target.value)}
                />
                <span>{speechVolume}%</span>
        </div>

            <div>
                <label htmlFor={'soundEffectsVolume'}>Sound effects volume</label>
                <input
                    type={'range'}
                    id={'soundEffectsVolume'}
                    min={'0'}
                    max={'100'}
                    value={soundEffectsVolume}
                    onChange={(e) => setSoundEffectsVolume(e.target.value)}
                />
                <span>{soundEffectsVolume}%</span>
            </div>

        </div>
    );
}