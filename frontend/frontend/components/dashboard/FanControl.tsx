// components/dashboard/FanControl.tsx
import React, { useState } from 'react';

const FanIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6Z" fill="currentColor"/>
    <path d="M6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14C5.10457 14 6 13.1046 6 12Z" fill="currentColor"/>
    <path d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z" fill="currentColor"/>
    <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" fill="currentColor"/>
    <path d="M7.75736 7.75736C8.53857 6.97614 8.53857 5.70901 7.75736 4.92779C6.97614 4.14657 5.70901 4.14657 4.92779 4.92779C4.14657 5.70901 4.14657 6.97614 4.92779 7.75736C5.70901 8.53857 6.97614 8.53857 7.75736 7.75736Z" fill="currentColor"/>
    <path d="M7.75736 19.0711C8.53857 19.8523 8.53857 21.1194 7.75736 21.9006C6.97614 22.6818 5.70901 22.6818 4.92779 21.9006C4.14657 21.1194 4.14657 19.8523 4.92779 19.0711C5.70901 18.2899 6.97614 18.2899 7.75736 19.0711Z" fill="currentColor"/>
    <path d="M19.0711 19.0711C19.8523 18.2899 19.8523 16.9627 19.0711 16.1815C18.2899 15.4003 16.9627 15.4003 16.1815 16.1815C15.4003 16.9627 15.4003 18.2899 16.1815 19.0711C16.9627 19.8523 18.2899 19.8523 19.0711 19.0711Z" fill="currentColor"/>
    <path d="M19.0711 7.75736C19.8523 6.97614 19.8523 5.70901 19.0711 4.92779C18.2899 4.14657 16.9627 4.14657 16.1815 4.92779C15.4003 5.70901 15.4003 6.97614 16.1815 7.75736C16.9627 8.53857 18.2899 8.53857 19.0711 7.75736Z" fill="currentColor"/>
  </svg>
);

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
        <FanIcon className="text-[#7c4dff] w-6 h-6 mr-3" />
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