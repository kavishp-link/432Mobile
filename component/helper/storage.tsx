import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Loads a string from storage.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error loading string for key: ${key}`, error);
    return null;
  }
}

/**
 * Saves a string to storage.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error saving string for key: ${key}`, error);
    return false;
  }
}

/**
 * Loads an item from storage and parses it as JSON.
 */
export async function load<T>(key: string): Promise<T | null> {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return null;
  } catch (error) {
    console.error(`Error loading item for key: ${key}`, error);
    return null;
  }
}

/**
 * Saves an object to storage as JSON.
 */
export async function save<T>(key: string, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving object for key: ${key}`, error);
    return false;
  }
}

/**
 * Removes an item from storage.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item for key: ${key}`, error);
  }
}

/**
 * Clears all data from storage.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing storage", error);
  }
}

// Function to remove specific keys from an object
export const removeKeys = (obj: any, keysToRemove: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
  );
};

export const formatDate = (date: any) => {
  if (!date || !(date instanceof Date)) return "";

  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};
