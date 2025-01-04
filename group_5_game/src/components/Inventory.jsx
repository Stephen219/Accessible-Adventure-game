'use client';

import React, { useState } from 'react';
import '@/components/css/Inventory.css';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';

const Inventory = () => {
    const [inventory, setInventory] = useState([
        { name: 'Knife', reusable: true },
        { name: 'Stick', reusable: false },
        { name: 'Rock', reusable: false },
    ]);

    const availableItems = [
        { name: 'Knife', reusable: true },
        { name: 'Stick', reusable: false },
        { name: 'Rock', reusable: false },
    ];

    const addItemToInventory = (item) => {
        if (!inventory.find((invItem) => invItem.name === item.name)) {
            setInventory([...inventory, item]);
        }
    };

    const removeItemFromInventory = (item) => {
        setInventory(inventory.filter((invItem) => invItem !== item));
    };

    const useItem = (itemName) => {
        const item = inventory.find((invItem) => invItem.name === itemName);
        if (!item) {
            textToSpeechHandler.speak(`You don't have a ${itemName} in your inventory.`);
            return;
        }

        if (item.reusable) {
            textToSpeechHandler.speak(`You used the reusable ${itemName}.`);
        } else {
            textToSpeechHandler.speak(`You used the single-use ${itemName}, and it has been removed from your inventory.`);
            removeItemFromInventory(item);
        }
    };
    const speakInventory = () => {
        if (inventory.length > 0) {
            const itemsList = inventory.map((item) => item.name).join(', ');
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
                    <button key={item.name} onClick={() => addItemToInventory(item)}>
                        Add {item.name}
                    </button>
                ))}
            </div>

            <div>
                <h2>Your Inventory</h2>
                {inventory.length > 0 ? (
                    <ul>
                        {inventory.map((item) => (
                            <li key={item.name}>
                                {item.name} {item.reusable ? '(Reusable)' : '(Single-Use)'}
                                <button onClick={() => useItem(item.name)}>Use</button>
                                <button onClick={() => removeItemFromInventory(item)}>Remove</button>
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
