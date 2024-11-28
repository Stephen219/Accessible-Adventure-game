import React from 'react';
import './css/GameTranscript.css';

const GameTranscript = ({ transcript }) => {
    return (
        <div>
            <h3 className="transcript-header">Transcript:</h3>
            <div className="transcript-container">
                {transcript.map((entry, index) => (
                    <p key={index} className={`transcript-line ${entry.type.toLowerCase()}`}>
                        [{entry.type}] {entry.text}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default GameTranscript;
