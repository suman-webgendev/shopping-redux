import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * This function takes price amount as a parameter and returns formatted price in USD
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
