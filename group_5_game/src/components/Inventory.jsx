'use client';

import React, { useState } from 'react';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';

const Inventory = () => {
    const [inventory, setInventory] = useState(['Knife', 'Stick', 'Rock']);
    const availableItems = ['Knife', 'Stick', 'Rock'];

    const addItemToInventory = (item) => {
        if (!inventory.includes(item)) {
            setInventory([...inventory, item]);
        }
    };

    const removeItemFromInventory = (item) => {
        setInventory(inventory.filter((invItem) => invItem !== item));
    };

    const speakInventory = () => {
        if (inventory.length > 0) {
            const itemsList = inventory.join(', ');
            textToSpeechHandler.speak(`You have the following items: ${itemsList}`);
        } else {
            textToSpeechHandler.speak('Your inventory is empty.');
        }
    };

    return (
        <div>
            <h1>Inventory</h1>

            <div>
                <h2>Available Items</h2>
                {availableItems.map((item) => (
                    <button key={item} onClick={() => addItemToInventory(item)}>
                        Add {item}
                    </button>
                ))}
            </div>

            <div>
                <h2>Your Inventory</h2>
                {inventory.length > 0 ? (
                    <ul>
                        {inventory.map((item) => (
                            <li key={item}>
                                {item}
                                <button onClick={() => removeItemFromInventory(item)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your inventory is empty.</p>
                )}
            </div>

            {/* Button to trigger text-to-speech */}
            <button onClick={speakInventory}>Tell me my inventory</button>
        </div>
    );
};

export default Inventory;
