import React from 'react';
import { DollarSign, XCircle, RotateCw } from 'lucide-react';

interface Check {
  url: string;
  isMonetized: boolean;
  timestamp: string;
}

interface RecentChecksProps {
  checks: Check[];
  onCheckAgain: (url: string) => void;
}

export const RecentChecks: React.FC<RecentChecksProps> = ({ checks, onCheckAgain }) => {
  if (checks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No recent checks yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {checks.map((check, index) => (
        <div
          key={`${check.url}-${index}`}
          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className={`p-2 rounded-full ${
            check.isMonetized ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {check.isMonetized ? (
              <DollarSign className="w-4 h-4 text-green-600" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {check.url}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(check.timestamp).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onCheckAgain(check.url)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Check again"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};