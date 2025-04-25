import React from 'react';
import { HomeIcon, GridIcon, LampIcon, ShieldIcon, LocationIcon, UsersIcon, ChartIcon, LogoutIcon } from '../ui/Icons';

const Sidebar: React.FC = () => {
  return (
    <div className="w-20 bg-[#7a40f2] flex flex-col items-center py-6 text-white">
      <div className="text-white font-semibold mb-12">
        <HomeIcon />
      </div>
      <div className="flex flex-col space-y-8 flex-grow">
        <button className="p-2 rounded-lg bg-white text-[#7a40f2]">
          <GridIcon />
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-lg transition-colors duration-200">
          <LampIcon />
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-lg transition-colors duration-200">
          <ShieldIcon />
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-lg transition-colors duration-200">
          <LocationIcon />
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-lg transition-colors duration-200">
          <UsersIcon />
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-lg transition-colors duration-200">
          <ChartIcon />
        </button>
      </div>
      <button className="mt-auto p-2 hover:bg-purple-500 rounded-lg transition-colors duration-200">
        <LogoutIcon />
      </button>
    </div>
  );
};

export default Sidebar;