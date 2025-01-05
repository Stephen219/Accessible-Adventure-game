'use client';
import useAuth from '@/utils/useAuth';

import React from 'react';

const Game = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Welcome to the Game</h1>
            {user ? (
                <p>Logged in as: {user.email}</p>
            ) : (
                <p>Play as a guest or log in for progress tracking!</p>
            )}
        </div>
    );
};

export default Game;
