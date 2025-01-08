'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserCoins, updateUserCoins } from '@/utils/userService'; // Import the coin functions
import { useAuth } from '@/utils/AuthContext'; // Get the user ID from context

export default function ShopModal({ onClose }) {
  const [coins, setCoins] = useState(0); // User's coin balance
  const { currentUser } = useAuth(); // Current logged-in user

  // Hardcoded shop items
  const shopItems = [
    { id: 1, name: 'Stick', price: 1 },
    { id: 2, name: 'Rock', price: 3 },
    { id: 3, name: 'Gun', price: 10 },
  ];

  useEffect(() => {
    async function fetchCoins() {
      if (currentUser?.uid) {
        const userCoins = await getUserCoins(currentUser.uid); // Fetch current balance
        setCoins(userCoins);
      }
    }
    fetchCoins();
  }, [currentUser]);

  // Handle purchasing an item
  const handlePurchase = async (item) => {
    if (item.price > coins) {
      alert('Insufficient coins to purchase this item.');
      return;
    }

    const newCoinBalance = coins - item.price;

    try {
      await updateUserCoins(currentUser.uid, newCoinBalance); // Update in Firestore
      setCoins(newCoinBalance); // Update locally
      alert(`You purchased ${item.name} successfully!`);
    } catch (error) {
      console.error('Error completing purchase:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  // Handle adding 1 coin (for testing purposes)
  const addCoin = async () => {
    const newCoinBalance = coins + 1;
    try {
      await updateUserCoins(currentUser.uid, newCoinBalance); // Update in Firestore
      setCoins(newCoinBalance); // Update locally
      alert('1 coin added successfully!');
    } catch (error) {
      console.error('Error adding coin:', error);
      alert('Failed to add coin. Please try again.');
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

        {/* Add Coin Button for Testing */}
        <div className="mb-4">
          <button
            onClick={addCoin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add 1 Coin (Testing)
          </button>
        </div>

        <div>
          {/* Hardcoded shop items */}
          {shopItems.map((item) => (
            <div key={item.id} className="mb-4">
              <p className="text-gray-700">
                <strong>{item.name}</strong> - {item.price} Coins
              </p>
              <button
                onClick={() => handlePurchase(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
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




