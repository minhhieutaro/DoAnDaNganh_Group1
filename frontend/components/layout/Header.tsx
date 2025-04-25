import React from 'react';
import { SearchIcon, SettingsIcon, NotificationIcon } from '../ui/Icons';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#242424]">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 w-full bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[#242424]"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 text-[#242424]">
          <SettingsIcon />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 text-[#242424]">
          <NotificationIcon />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-purple-500 overflow-hidden">
            <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="font-medium">Phu</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
