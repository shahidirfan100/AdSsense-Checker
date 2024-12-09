import React, { useState } from 'react';
import { Globe, History } from 'lucide-react';
import { UrlInput } from './components/UrlInput';
import { AdsenseStatus } from './components/AdsenseStatus';
import { RecentChecks } from './components/RecentChecks';
import { checkAdsensePresence } from './utils/adsenseChecker';
import { isValidUrl, normalizeUrl } from './utils/urlValidator';
import { addRecentCheck, getRecentChecks } from './utils/storage';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentChecks, setRecentChecks] = useState(getRecentChecks());
  const [result, setResult] = useState<{
    isMonetized: boolean | null;
    error?: string;
    url?: string;
  }>({
    isMonetized: null
  });

  const handleUrlSubmit = async (inputUrl: string) => {
    setIsLoading(true);
    setResult({ isMonetized: null });

    const normalizedUrl = normalizeUrl(inputUrl);
    
    if (!isValidUrl(normalizedUrl)) {
      setResult({
        isMonetized: null,
        error: 'Please enter a valid URL'
      });
      setIsLoading(false);
      return;
    }

    try {
      const checkResult = await checkAdsensePresence(normalizedUrl);
      const newResult = {
        ...checkResult,
        url: normalizedUrl
      };
      setResult(newResult);
      
      // Add to recent checks
      if (!checkResult.error) {
        const updatedChecks = addRecentCheck({
          url: normalizedUrl,
          isMonetized: checkResult.isMonetized,
          timestamp: new Date().toISOString()
        });
        setRecentChecks(updatedChecks);
      }
    } catch (error) {
      setResult({
        isMonetized: null,
        error: 'An error occurred while checking the website'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-full mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AdSense Checker</h1>
          <p className="text-gray-600">Check if any website is monetized with Google AdSense</p>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          {/* Main Content */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
            
            {(isLoading || result.isMonetized !== null || result.error) && (
              <div className="mt-6">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                    <span>Checking website...</span>
                  </div>
                ) : (
                  <AdsenseStatus {...result} />
                )}
              </div>
            )}
          </div>

          {/* Recent Checks */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-2 mb-4">
              <History className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Checks</h2>
            </div>
            <RecentChecks checks={recentChecks} onCheckAgain={handleUrlSubmit} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Built with React and TypeScript • Uses CORS proxy for secure website checking</p>
        </footer>
      </div>
    </div>
  );
}

export default App;