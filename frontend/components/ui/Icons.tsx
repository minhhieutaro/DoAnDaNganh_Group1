// components/ui/Icons.tsx
import React from 'react';
import Icon from './IconifyIcon';

// Icon cho sidebar
export const HomeIcon: React.FC = () => <Icon icon="mdi:home" />;
export const GridIcon: React.FC = () => <Icon icon="mdi:view-dashboard" />;
export const LampIcon: React.FC = () => <Icon icon="mdi:lightbulb" />;
export const ShieldIcon: React.FC = () => <Icon icon="mdi:shield" />;
export const LocationIcon: React.FC = () => <Icon icon="mdi:map-marker" />;
export const UsersIcon: React.FC = () => <Icon icon="mdi:account-group" />;
export const ChartIcon: React.FC = () => <Icon icon="mdi:chart-line" />;
export const LogoutIcon: React.FC = () => <Icon icon="mdi:logout" />;

// Icon cho header
export const SettingsIcon: React.FC = () => <Icon icon="mdi:cog" />;
export const NotificationIcon: React.FC = () => <Icon icon="mdi:bell" />;
export const SearchIcon: React.FC = () => <Icon icon="mdi:magnify" className="text-gray-400" />;

// Icon cho dashboard
export const WeatherIcon: React.FC = () => <Icon icon="mdi:weather-partly-cloudy" />;
export const TemperatureIcon: React.FC = () => <Icon icon="mdi:thermometer" />;
export const HumidityIcon: React.FC = () => <Icon icon="mdi:water-percent" />;
export const LightIntensityIcon: React.FC = () => <Icon icon="mdi:brightness-6" />;
export const LedColorIcon: React.FC = () => <Icon icon="fluent:color-20-regular" />;
export const ArrowDownIcon: React.FC = () => <Icon icon="fluent:arrow-sort-down-20-regular" />;