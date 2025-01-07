'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserCoins } from '@/utils/userService';
import { useAuth } from '@/utils/AuthContext';

export default function ShopModal({ onClose }) {
  const [coins, setCoins] = useState(0);
  const { currentUser } = useAuth(); // Correct hook usage

  useEffect(() => {
    async function fetchCoins() {
      if (currentUser?.uid) {
        const userCoins = await getUserCoins(currentUser.uid);
        setCoins(userCoins);
      }
    }

    fetchCoins();
  }, [currentUser]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Shop</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-lg"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Coins:</strong> {coins}
        </p>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Buy Item 1
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
            Buy Item 2
          </button>
        </div>
      </div>
    </div>
  );
}

ShopModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
