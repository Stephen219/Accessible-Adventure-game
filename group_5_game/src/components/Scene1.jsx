import React from 'react';

const Scene1 = () => {

    
    return (
        <div className="space-y-4">
        <h2 className="text-xl font-semibold">Scene 1: Crossroads</h2>
        <p className="text-gray-700">
            You are at a crossroads. The path to the left leads into a dark, dense forest. 
            The path to the right winds up a gentle hill towards the light of a distant village.
        </p>
        <p className="text-gray-600 italic">
            Where do you want to go? Say "go to Scene 2" to enter the forest or "go to Scene 3" to climb the hill.
        </p>
        </div>
    );
};

export default Scene1;
