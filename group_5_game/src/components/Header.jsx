'use client';
import React from 'react';

import Link from 'next/link';
import Button from './Button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="bg-[#0a0a0a] sticky top-0 z-40 w-full border-b border-[#1a1a1a]">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-white text-xl">
              Adventure
            </span>
          </Link>
          <nav
            className={`${
              isOpen ? 'flex' : 'hidden'
            } absolute top-16 text-lg left-0 right-0 flex-col gap-2 bg-[#0a0a0a] p-4 md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0`}
            aria-hidden={!isOpen}
          >
            <Link
              key="games"
              href="#"
              className="text-gray-300 hover:text-[#9333EA] transition-colors duration-200 text-xlg md:text-base"
            >
              <span className="text-lg">Games</span>
            </Link>
            <Link
              key="dashboard"
              href="#"
              className="text-gray-300 hover:text-[#9333EA] transition-colors duration-200 text-sm md:text-base"
            >
              <span className="text-xl">Dashboard</span>
            </Link>
            <Link
              key="profile"
              href="#"
              className="text-gray-300 hover:text-[#9333EA] transition-colors duration-200 text-sm md:text-base"
            >
              <span className="text-xl"> Profile</span>
            </Link>
            <Link
              key="settings"
              href="/settings"
              className="text-gray-300 hover:text-[#9333EA] transition-colors duration-200 text-sm md:text-base"
            >
              <span className="text-xl">Settings</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden md:inline-flex text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a]"
          >
            Sign in
          </Button>
          <Button className="hidden md:inline-flex bg-[#9333EA] hover:bg-[#7928CA] text-white border-0">
            Start Game
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {/* <div className="bg-[#1a1a1a] text-gray-400 px-4 py-2">
        You are here: <span className="text-[#9333EA]">{pathname}</span>
      </div> */}

      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-md">
        You are here: <span className="text-[#9333EA]">{pathname}</span>
      </div> */}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-md">
        <span className="text-lg">You are here: </span>
        {pathSegments.map((segment, index) => {
          const linkPath = '/' + pathSegments.slice(0, index + 1).join('/');
          return (
            <React.Fragment key={index}>
              <Link href={linkPath} className="text-[#9333EA] hover:underline">
                {segment}
              </Link>
              {index < pathSegments.length - 1 && ' / '}
            </React.Fragment>
          );
        })}
      </div>
    </header>
  );
}
