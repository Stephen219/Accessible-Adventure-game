'use client';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserCoins, updateUserCoins } from '@/utils/userService'; // Import the coin functions
import { useAuth } from '@/utils/AuthContext'; // Get the user ID from context

export default function ShopModal({ onClose }) {
  const [coins, setCoins] = useState(0); // User's coin balance
  const { currentUser } = useAuth(); // Current logged-in user

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
  const handlePurchase = async (itemCost) => {
    if (itemCost > coins) {
      alert("Insufficient coins to purchase this item.");
      return;
    }

    const newCoinBalance = coins - itemCost;

    try {
      await updateUserCoins(currentUser.uid, newCoinBalance); // Update in Firestore
      setCoins(newCoinBalance); // Update locally
      alert("Purchase successful!");
    } catch (error) {
      console.error("Error completing purchase:", error);
      alert("Failed to complete purchase. Please try again.");
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
          {/* Example items for purchase */}
          <button
            onClick={() => handlePurchase(50)} // Deduct 50 coins
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Item 1 (50 Coins)
          </button>
          <button
            onClick={() => handlePurchase(100)} // Deduct 100 coins
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Buy Item 2 (100 Coins)
          </button>
        </div>
      </div>
    </div>
  );
}

ShopModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
