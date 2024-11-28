'use client';
import React from 'react';
import ExampleComponent from '/src/components/ExampleComponent';
import Game from './Game';

/**
 * game home page
 * @returns  home page
 */

export default function Home() {
  return (
    <div>
      {/* /**
      you  can delete this ExampleComponent tag if you want to   its just for testing
       */ }
      <Game />
    </div>
  );
}