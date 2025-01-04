import React from 'react';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';

const SceneManager = ({ currentScene }) => {
    switch (currentScene) {
        case 1:
            return <Scene1 />;
        case 2:
            return <Scene2 />;
        case 3:
            return <Scene3 />;
        default:
            return <p>Unknown Scene</p>;
    }
};

export default SceneManager;
