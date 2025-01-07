// 'use client';
// import React from 'react';
// import ExampleComponent from '/src/components/ExampleComponent';
// import Game from '/src/components/Game';

// export default function GamePage() {
//   return (
//     <>
//       <Game></Game>
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import ShopModal from "@/components/ShopModal";

const GamePage = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <div>
      {/* Button to open the Shop Modal */}
      <button
        onClick={() => setIsShopOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Open Shop
      </button>

      {/* Render Shop Modal if isShopOpen is true */}
      {isShopOpen && (
        <ShopModal onClose={() => setIsShopOpen(false)} />
      )}
    </div>
  );
};

export default GamePage;
