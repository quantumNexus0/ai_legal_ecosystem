/**
 * Generates a unique identifier as a string.
 * @returns A unique string ID.
 */
export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };
  