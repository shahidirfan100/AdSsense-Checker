import React from 'react';
import { DollarSign, XCircle, AlertCircle } from 'lucide-react';

interface AdsenseStatusProps {
  isMonetized: boolean | null;
  error?: string;
  url?: string;
}

export const AdsenseStatus: React.FC<AdsenseStatusProps> = ({ 
  isMonetized, 
  error,
  url 
}) => {
  if (error) {
    return (
      <div className="flex items-center space-x-3 p-4 rounded-lg bg-red-50 border border-red-100">
        <div className="p-2 bg-red-100 rounded-full">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-red-900">{error}</p>
        </div>
      </div>
    );
  }

  if (isMonetized === null) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg ${
      isMonetized 
        ? 'bg-green-50 border border-green-100' 
        : 'bg-red-50 border border-red-100'
    }`}>
      <div className={`p-2 rounded-full ${
        isMonetized ? 'bg-green-100' : 'bg-red-100'
      }`}>
        {isMonetized ? (
          <DollarSign className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600" />
        )}
      </div>
      <div className="flex-1">
        <p className={`font-medium ${
          isMonetized ? 'text-green-900' : 'text-red-900'
        }`}>
          {isMonetized ? 'AdSense Detected!' : 'No AdSense Found'}
        </p>
        <p className={`text-sm ${
          isMonetized ? 'text-green-700' : 'text-red-700'
        }`}>
          {url} {isMonetized ? 'is' : 'does not appear to be'} monetized with Google AdSense
        </p>
      </div>
    </div>
  );
};