// 'use client';

// import React, { useEffect, useState } from 'react';
// import '@/components/css/Inventory.css';
// import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
// import { getUserInventory } from '@/utils/userService'; // Ensure this function is implemented in userService
// import { useAuth } from '@/utils/AuthContext';

// const Inventory = () => {
//   const [inventory, setInventory] = useState([]); // Initialize with an empty array
//   const { currentUser } = useAuth();

//   // Fetch user's inventory from Firebase
//   useEffect(() => {
//     async function fetchInventory() {
//       if (currentUser?.uid) {
//         const userInventory = await getUserInventory(currentUser.uid);
//         setInventory(userInventory);
//       }
//     }
//     fetchInventory();
//   }, [currentUser]);

//   const speakInventory = () => {
//     if (inventory.length > 0) {
//       const itemsList = inventory.map(item => item.name).join(', ');
//       textToSpeechHandler.speak(`You have the following items: ${itemsList}`);
//     } else {
//       textToSpeechHandler.speak('Your inventory is empty.');
//     }
//   };

//   return (
//     <div className="inventory-container">
//       {/* Inventory Header */}
//       <h1 className="inventory-title">INVENTORY</h1>

//       {/* Your Inventory Section */}
//       <div className="your-inventory-section">
//         <p className="section-header">Your Inventory:</p>
//         <div className="inventory-items">
//           {inventory.map((item) => (
//             <p key={item.id} className="item-name">
//               {item.name} - {item.price} Coins
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Tell Me My Inventory Button */}
//       <button className="inventory-button" onClick={speakInventory}>
//         Tell me my inventory
//       </button>
//     </div>
//   );
// };

// export default Inventory;


'use client';

import React, { useEffect, useState } from 'react';
import { textToSpeechHandler } from '@/components/handlers/text_SpeechHandler';
import { getUserInventory, removeItemFromInventory } from '@/utils/userService';
import { useAuth } from '@/utils/AuthContext';

const Inventory = () => {
  const [inventory, setInventory] = useState([]); // Initialize with an empty array
  const { currentUser } = useAuth();

  // Fetch user's inventory from Firebase
  useEffect(() => {
    async function fetchInventory() {
      if (currentUser?.uid) {
        const userInventory = await getUserInventory(currentUser.uid);
        setInventory(userInventory);
      }
    }
    fetchInventory();
  }, [currentUser]);

  const handleRemoveItem = async (item) => {
    if (currentUser?.uid) {
      await removeItemFromInventory(currentUser.uid, item);
      setInventory((prevInventory) =>
        prevInventory.filter((invItem) => invItem.id !== item.id)
      );
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
    <div className="flex flex-col items-center p-4 bg-gray-900 text-white rounded-lg shadow-md">
      {/* Inventory Header */}
      <h1 className="text-xl font-bold mb-4 bg-purple-500 py-2 px-4 rounded-lg">INVENTORY</h1>

      {/* Your Inventory Section */}
      <div className="w-full">
        <p className="text-lg font-semibold text-center mb-4">Your Inventory:</p>
        <div className="flex flex-wrap justify-center gap-4">
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-md text-center"
              >
                <p className="font-semibold text-lg mb-2">{item.name}</p>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-2"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Your inventory is empty.</p>
          )}
        </div>
      </div>

      {/* Tell Me My Inventory Button */}
      <button
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md"
        onClick={speakInventory}
      >
        Tell me my inventory
      </button>
    </div>
  );
};

export default Inventory;

