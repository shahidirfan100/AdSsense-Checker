/**
 * URL validation and processing utilities
 */

export const isValidUrl = (url: string): boolean => {
  try {
    // Remove common prefixes that users might enter
    let cleanUrl = url.trim().toLowerCase();
    cleanUrl = cleanUrl
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .replace(/\/$/, '');
      
    // Add https:// for URL validation
    const urlToTest = `https://${cleanUrl}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  // Remove common prefixes and trailing slashes
  let cleanUrl = url.trim().toLowerCase();
  cleanUrl = cleanUrl
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '');
    
  return `https://${cleanUrl}`;
};