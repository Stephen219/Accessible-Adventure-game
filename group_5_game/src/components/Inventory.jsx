'use client';

import React, { useState } from 'react';
import '@/components/css/Inventory.css';
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
        <div className="inventory-container">
            {/* Inventory Header */}
            <h1 className="inventory-title">INVENTORY</h1>

            {/* Available Items Section */}
            <div className="available-items-section">
                <p className="section-header">Available Items:</p>
                <div className="available-items">
                    {availableItems.map((item) => (
                        <button
                            key={item}
                            className="item-action"
                            onClick={() => addItemToInventory(item)}
                        >
                            Add {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Your Inventory Section */}
            <div className="your-inventory-section">
                <p className="section-header">Your Inventory:</p>
                <div className="inventory-items">
                    {inventory.map((item) => (
                        <button
                            key={item}
                            className="item-action"
                            onClick={() => removeItemFromInventory(item)}
                        >
                            {item}Remove
                        </button>
                    ))}
                </div>
            </div>

            {/* Tell Me My Inventory Button */}
            <button className="inventory-button" onClick={speakInventory}>
                Tell me my inventory
            </button>
        </div>
    );
};

export default Inventory;