// app/page.tsx
'use client';

import React, { useState } from 'react'; // Thêm useState nếu cần
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import SensorsChart from '../components/dashboard/SensorsChart';
import DeviceControls from '../components/dashboard/DeviceControls';
import FanControl from '../components/dashboard/FanControl';
import { useSensorData } from '../hooks/useSensorData';
import { useDeviceControl } from '../hooks/useDeviceControl';
import { useWeather } from '../hooks/useWeather';
import { SensorDisplay } from '../components/SensorDisplay';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function Home() {
  const { data, loading, error } = useSensorData('Day');
  const { devices, toggleDevice, loading: devicesLoading } = useDeviceControl();
  const { weather, loading: weatherLoading } = useWeather();

  const [fanSpeed, setFanSpeed] = useState(50);

  // Thêm hàm xử lý thay đổi tốc độ quạt
  const handleFanSpeedChange = (speed: number) => {
    setFanSpeed(speed);
    console.log(`Fan speed changed to: ${speed}`);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <Header />

        <div className="grid grid-cols-4 gap-6">
          {/* Left column (3/4 width) */}
          <div className="col-span-3 space-y-6">
            <WelcomeCard userName="Phu" weatherData={weather} />
            <SensorsChart data={data} />
          </div>

          {/* Right column (1/4 width) */}
          <div className="col-span-1 space-y-6">
            <DeviceControls devices={devices} onToggleDevice={toggleDevice} />
            <FanControl initialSpeed={fanSpeed} onSpeedChange={handleFanSpeedChange} />
          </div>
        </div>
      </div>
    </div>
  );
}