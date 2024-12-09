/**
 * Utility functions for checking Google AdSense implementation
 */

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const checkAdsensePresence = async (url: string): Promise<{ 
  isMonetized: boolean; 
  error?: string;
}> => {
  try {
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch website content');
    }
    
    const html = await response.text();
    
    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Check for AdSense script
    const hasAdsenseScript = Array.from(doc.getElementsByTagName('script'))
      .some(script => script.src?.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'));
    
    // Check for ad containers
    const hasAdContainers = doc.querySelectorAll('ins.adsbygoogle').length > 0;
    
    // Check for auto ads
    const hasAutoAds = Array.from(doc.getElementsByTagName('script'))
      .some(script => script.textContent?.includes('google_ad_client'));
    
    return {
      isMonetized: hasAdsenseScript || hasAdContainers || hasAutoAds
    };
  } catch (error) {
    return {
      isMonetized: false,
      error: 'Unable to check the website. Please make sure the URL is correct and the website is accessible.'
    };
  }
};