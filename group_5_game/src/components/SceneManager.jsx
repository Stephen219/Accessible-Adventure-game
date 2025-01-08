import React from 'react';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';



/**
 * SceneManager Component
 * This component is responsible for rendering different scenes based on the current scene value.
 * It uses a switch statement to determine which scene to display, depending on the `currentScene` prop passed to it.
 * 
 * Props:
 * currentScene - A number representing the current scene to be displayed. The possible values are:
 *   - 1: Renders Scene1
 *   - 2: Renders Scene2
 *   - 3: Renders Scene3
 *   - Any other value: Displays a default message for an unknown scene.
 * 
 * The component will render the corresponding scene (Scene1, Scene2, or Scene3) or display an error message if an unknown scene is provided.
 */

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
