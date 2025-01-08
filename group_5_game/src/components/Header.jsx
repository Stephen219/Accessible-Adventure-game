



"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import useAuth from '@/utils/useAuth'; 



/**
 * Header Component
 * This component represents the navigation header for the application.
 * It dynamically renders different navigation options based on the user's authentication status and the current screen size.
 * 
 * Props: None
 * 
 * Internal States:
 * - `isOpen`: A boolean state that tracks whether the mobile navigation menu is open or not.
 * 
 * Key Features:
 * - Displays the website logo and links to various pages like "Game", "Dashboard", "Profile", and "Settings".
 * - Provides conditional rendering of authentication-related buttons (Login/Sign Up) based on whether the user is logged in.
 * - Renders a mobile-friendly toggle menu for smaller screen sizes.
 * - Displays the current page's breadcrumb navigation at the bottom of the header.
 */

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth(); // Access user authentication state
  const pathSegments = pathname.split("/").filter(Boolean);

  const navItems = [
    { name: "Game", href: "/game" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <header className="bg-[#0a0a0a] sticky top-0 z-40 w-full border-b border-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-white text-xl">
                Adventure
              </span>
            </Link>
          </div>

          <nav
            className={`${
              isOpen ? "flex" : "hidden"
            } absolute top-16 left-0 right-0 flex-col gap-2 bg-[#0a0a0a] p-4 md:static md:flex md:flex-row md:gap-6 md:bg-transparent md:p-0`}
            aria-hidden={!isOpen}
          >
            {navItems.map((item) => (
              <Link
                key={item.name.toLowerCase()}
                href={item.href}
                className="text-gray-300 hover:text-[#9333EA] transition-colors duration-200 text-base"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {/* Hide Log in and Sign up if user is authenticated */}
            {!user && (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a]"
                  onClick={() => router.push('/auth/login')}
                >
                  Log in
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a]"
                  onClick={() => router.push('/auth/register')}
                >
                  Sign up
                </Button>
              </>
            )}
            <Button
              className="bg-[#9333EA] hover:bg-[#7928CA] text-white border-0"
              onClick={() => router.push('/game')}
            >
              Start Game
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name.toLowerCase()}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a] transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[#1a1a1a]">
            <div className="flex items-center px-5">
              {!user && (
                <Button
                  variant="ghost"
                  className="w-full text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a] justify-start"
                  onClick={() => {
                    router.push('/auth/login');
                    setIsOpen(false);
                  }}
                >
                  Log in
                </Button>
              )}
            </div>
            <div className="mt-3 px-2 space-y-1">
              {!user && (
                <Button
                  variant="ghost"
                  className="w-full text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a] justify-start"
                  onClick={() => {
                    router.push('/auth/register');
                    setIsOpen(false);
                  }}
                >
                  Sign up
                </Button>
              )}
              <Button
                className="w-full bg-[#9333EA] hover:bg-[#7928CA] text-white border-0"
                onClick={() => {
                  router.push('/game');
                  setIsOpen(false);
                }}
              >
                Start Game
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center py-2 bg-[#1a1a1a] text-gray-400">
        <div className="text-sm">
          You are here:{" "}
          {pathSegments.length > 0 ? (
            pathSegments.map((segment, index) => {
              const linkPath = "/" + pathSegments.slice(0, index + 1).join("/");
              return (
                <React.Fragment key={index}>
                  <Link
                    href={linkPath}
                    className="text-[#9333EA] hover:underline"
                  >
                    {segment}
                  </Link>
                  {index < pathSegments.length - 1 && " / "}
                </React.Fragment>
              );
            })
          ) : (
            <span className="text-[#9333EA]">Home</span>
          )}
        </div>
      </div>
    </header>
  );
}

