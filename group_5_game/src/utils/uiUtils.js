import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string.
 * 
 * This function is a wrapper around the `clsx` utility function that also applies Tailwind CSS
 * class merging using the `tailwind-merge` package.
 * */

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

