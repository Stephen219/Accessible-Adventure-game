"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/utils/useAuth"; // Assuming you have a `useAuth` hook
import ShopModal from "./ShopModal"; // Import the ShopModal component
import { getAuth, signOut } from "firebase/auth"; // Firebase logout functionality

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isShopOpen, setIsShopOpen] = useState(false); // State for Shop Modal
  const pathname = usePathname() || ""; // Fallback to an empty string if usePathname() fails
  const pathSegments = pathname.split("/").filter(Boolean); // Ensure pathSegments is always an array
  const router = useRouter();
  const { user } = useAuth(); // Access user authentication state
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const navItems = [
    { name: "Game", href: "/game" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
  ];

  const renderAuthButtons = () => (
    <>
      {!user ? (
        <>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a]"
            onClick={() => router.push("/auth/login")}
          >
            Log in
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a]"
            onClick={() => router.push("/auth/register")}
          >
            Sign up
          </Button>
        </>
      ) : (
        <>
          <Button
            className="bg-[#9333EA] hover:bg-[#7928CA] text-white border-0"
            onClick={() => setIsShopOpen(true)} // Open ShopModal
          >
            Shop
          </Button>
          <Button
            className="bg-[#9333EA] hover:bg-[#7928CA] text-white border-0"
            onClick={() => router.push("/game")}
          >
            Start Game
          </Button>
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-[#9333EA] hover:bg-[#1a1a1a]"
            onClick={handleLogout} // Logout
          >
            Logout
          </Button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-[#0a0a0a] sticky top-0 z-40 w-full border-b border-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-white text-xl">
                Adventure
              </span>
            </Link>
          </div>

          {/* Main navigation */}
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

            {/* Add Shop, Start Game, and Logout buttons for mobile dropdown */}
            {isOpen && (
              <div className="mt-4 space-y-2">{renderAuthButtons()}</div>
            )}
          </nav>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {renderAuthButtons()}
          </div>

          {/* Mobile menu toggle button */}
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
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
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
      )}

      {/* Path Breadcrumb */}
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

      {/* Shop Modal */}
      {isShopOpen && <ShopModal onClose={() => setIsShopOpen(false)} />}
    </header>
  );
}
