import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GridIcon, HumidityIcon, ShieldIcon, LocationIcon, UsersIcon, ChartIcon, LogoutIcon, FanIcon, TemperatureIcon, LightIntensityIcon , CameraIcon} from '../ui/Icons';

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
    <div className="w-20 bg-[#7a40f2] flex flex-col items-center py-6 text-white h-screen sticky top-0">
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
        <Link href="/humidity" className={getLinkClass('/humidity')}>
          <HumidityIcon />
        </Link>
        <Link href="/light_itensity" className={getLinkClass('/light_itensity')}>
          <LightIntensityIcon />
        </Link>
        {/* Logging page link */}
        <Link href="/logging" className={getLinkClass('/logging')}>
          <ChartIcon />
        </Link>
        <Link href="/fire-detection" className={getLinkClass('/fire-detection')}>
          <CameraIcon />
        </Link>
        {/* Profile link */}
        <Link href="/AboutUs" className={getLinkClass('/AboutUs')}>
            <UsersIcon />
        </Link>

      </div>
      
    </div>
  );
};

export default Sidebar;