'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserCoins, updateUserCoins, addItemToInventory } from '@/utils/userService'; // Import Firestore functions
import { useAuth } from '@/utils/AuthContext'; // Access authentication state

export default function ShopModal({ onClose }) {
  const { currentUser } = useAuth(); // Access logged-in user (null if guest)
  const [coins, setCoins] = useState(0); // Local state for coins
  const [isGuest, setIsGuest] = useState(false); // Track guest status

  // Hardcoded shop items
  const shopItems = [
    { id: 1, name: 'Stick', price: 1 },
    { id: 2, name: 'Rock', price: 3 },
    { id: 3, name: 'Gun', price: 10 },
  ];

  // Initialize coins for guests or fetch for logged-in users
  useEffect(() => {
    async function initializeCoins() {
      if (currentUser?.uid) {
        const userCoins = await getUserCoins(currentUser.uid); // Fetch balance from Firestore
        setCoins(userCoins);
        setIsGuest(false); // User is logged in
      } else {
        setCoins(10); // Default coins for guests
        setIsGuest(true); // User is a guest
      }
    }
    initializeCoins();
  }, [currentUser]);

  // Handle purchasing an item
  const handlePurchase = async (item) => {
    if (item.price > coins) {
      alert('Insufficient coins to purchase this item.');
      return;
    }

    const newCoinBalance = coins - item.price;

    try {
      if (!isGuest && currentUser?.uid) {
        // Update Firestore for logged-in users
        await updateUserCoins(currentUser.uid, newCoinBalance);
        await addItemToInventory(currentUser.uid, item); // Add to inventory
      }
      setCoins(newCoinBalance); // Update local state for all users
      alert(`You purchased ${item.name} successfully!`);
    } catch (error) {
      console.error('Error completing purchase:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shop</h2>
          <button onClick={onClose} className="text-red-500 font-bold text-lg">
            ✕
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Coins:</strong> {coins} {/* Display the user's coin balance */}
        </p>
        <div>
          {/* Render shop items */}
          {shopItems.map((item) => (
            <div key={item.id} className="mb-4">
              <p className="text-gray-700">
                <strong>{item.name}</strong> - {item.price} Coins
              </p>
              <button
                onClick={() => handlePurchase(item)}
                className={`px-4 py-2 rounded ${
                  item.price > coins ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'
                }`}
                disabled={item.price > coins}
              >
                Buy {item.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ShopModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};




