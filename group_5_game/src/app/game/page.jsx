'use client';
import React from 'react';
import ExampleComponent from '/src/components/ExampleComponent';
import Game from '/src/components/Game';

export default function GamePage() {
  return (
    <div>
      <h1>Welcome to the Game Page</h1>
      {/* You can delete this ExampleComponent tag if you want */}
      <Game></Game>
    </div>
  );
}