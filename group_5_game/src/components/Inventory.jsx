'use client';
import React, { useState } from 'react';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const availableItems = ['Knife', 'Stick', 'Rock']; //example available items

    const addItemToInventory = (item) => {
        if (!inventory.includes(item)) {
            setInventory([...inventory, item]);
        }
    };

    const removeItemFromInventory = (item) => {
        setInventory(inventory.filter((invItem) => invItem !== item));
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
        </div>
    );
};

export default Inventory;