"use client";

import React from "react";
import PropTypes from "prop-types";

const ShopModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Shop</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-lg font-semibold hover:text-red-700"
            aria-label="Close shop modal"
          >
            ✕
          </button>
        </div>
        <div>
          <p className="mb-4 text-gray-600">
            <strong>Coins:</strong> Placeholder
          </p>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span>Item 1 - 10 Coins</span>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                Buy
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

ShopModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ShopModal;
