// components/dashboard/FanControl.tsx
import React, { useState } from 'react';
import { FanIcon } from '../ui/Icons';

interface FanControlProps {
  initialSpeed?: number;
  onSpeedChange?: (speed: number) => void;
}

const FanControl: React.FC<FanControlProps> = ({ 
  initialSpeed = 50, 
  onSpeedChange = () => {} 
}) => {
  const [fanSpeed, setFanSpeed] = useState(initialSpeed);
  
  const handleSpeedChange = (newSpeed: number) => {
    // Đảm bảo tốc độ trong phạm vi 0-100
    const clampedSpeed = Math.max(0, Math.min(100, newSpeed));
    setFanSpeed(clampedSpeed);
    onSpeedChange(clampedSpeed);
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSpeedChange(parseInt(e.target.value, 10));
  };
  
  const increaseSpeed = () => {
    handleSpeedChange(fanSpeed + 5);
  };
  
  const decreaseSpeed = () => {
    handleSpeedChange(fanSpeed - 5);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <span className="w-6 h-6 mr-3 text-[#7c4dff]">
            <FanIcon/>
        </span>
        <h2 className="text-xl font-medium text-[#7c4dff]">Fan</h2>
        <div className="ml-auto text-[#7c4dff] font-medium">{fanSpeed}</div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        {/* Value indicator ở giữa */}
        <div className="flex-1 text-center">
          <div className="text-5xl font-light text-gray-200">{fanSpeed}</div>
          <div className="text-gray-400 text-sm mt-1">Fan Speed</div>
        </div>
      </div>
      
      <div className="relative mb-6">
        {/* Hiển thị giá trị 0, 50, 100 */}
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-400">0</span>
          <span className="text-[#7c4dff]">50</span>
          <span className="text-orange-400">100</span>
        </div>
        
        {/* Custom range slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={fanSpeed}
          onChange={handleSliderChange}
          className="w-full appearance-none bg-gray-200 h-3 rounded-lg outline-none"
          style={{
            background: `linear-gradient(to right, #7c4dff 0%, #7c4dff ${fanSpeed}%, #e5e7eb ${fanSpeed}%, #e5e7eb 100%)`
          }}
        />
      </div>
      
      <div className="flex justify-between">
        {/* Button giảm */}
        <button
          onClick={decreaseSpeed}
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <span className="text-xl font-bold">−</span>
        </button>
        
        {/* Button tăng */}
        <button
          onClick={increaseSpeed}
          className="w-12 h-12 bg-[#7c4dff] rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-colors"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>
    </div>
  );
};

export default FanControl;