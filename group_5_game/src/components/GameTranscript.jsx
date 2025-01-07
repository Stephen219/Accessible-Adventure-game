import React, { useEffect, useRef } from 'react';
import './css/GameTranscript.css';

/**
 * GameTranscript Component
 *
 * This component displays the game transcript, showing the conversation between the user and the system.
 * It displays the latest messages at the top and grows downwards as new messages are added.
 *
 * @component
 * @param {Object[]} transcript - The transcript entries to display.
 * @returns {JSX.Element} - The rendered transcript component.
 */
const GameTranscript = ({ transcript }) => {
    const containerRef = useRef(null);

    // Scroll to the top whenever a new message is added.
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [transcript]);

    return (
        <div className="transcript-wrapper">
            <h3 className="transcript-header">Transcript:</h3>
            <div className="transcript-container" ref={containerRef}>
                {transcript
                    .slice()
                    .reverse()
                    .map((entry, index) => (
                        <p key={index} className={`transcript-line ${entry.type.toLowerCase()}`}>
                            <span className="transcript-time">[{entry.time}]</span>
                            <span className="transcript-type">[{entry.type}]</span>
                            {entry.text}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default GameTranscript;
