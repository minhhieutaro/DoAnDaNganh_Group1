import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GridIcon, LampIcon, ShieldIcon, LocationIcon, UsersIcon, ChartIcon, LogoutIcon, FanIcon, TemperatureIcon } from '../ui/Icons';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClass = (path: string) => {
    const baseClass = "p-2 rounded-lg transition-colors duration-200";
    if (isActive(path)) {
      return `${baseClass} bg-white text-[#7a40f2]`;
    }
    return `${baseClass} text-white hover:bg-purple-500`;
  };

  return (
    <div className="w-20 bg-[#7a40f2] flex flex-col items-center py-6 text-white">
      <Link href="/" className={getLinkClass('/')}>
        <HomeIcon />
      </Link>
      <div className="flex flex-col space-y-8 flex-grow mt-12">
        <Link href="/dashboard" className={getLinkClass('/dashboard')}>
          <GridIcon />
        </Link>
        <Link href="/fan" className={getLinkClass('/fan')}>
          <FanIcon />
        </Link>
        <Link href="/temperature" className={getLinkClass('/temperature')}>
          <TemperatureIcon />
        </Link>
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