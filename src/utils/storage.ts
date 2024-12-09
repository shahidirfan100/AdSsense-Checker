interface Check {
  url: string;
  isMonetized: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'adsense-checker-history';
const MAX_CHECKS = 5;

export const getRecentChecks = (): Check[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentCheck = (check: Check): Check[] => {
  const checks = getRecentChecks();
  
  // Remove duplicates of the same URL
  const filteredChecks = checks.filter(c => c.url !== check.url);
  
  // Add new check at the beginning
  const updatedChecks = [check, ...filteredChecks].slice(0, MAX_CHECKS);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChecks));
  } catch {
    // Ignore storage errors
  }
  
  return updatedChecks;
};