'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import { FanIcon } from '../../components/ui/Icons';

const DeviceControl = () => {
    // Fan states
    const [isFanOn, setIsFanOn] = useState(false);
    const [speed, setSpeed] = useState(50);


    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseInt(e.target.value);
        setSpeed(newSpeed);
        if (!isFanOn) setIsFanOn(true);
        // TODO: Add API call to update fan speed
    };

    const handleFanToggle = () => {
        setIsFanOn(!isFanOn);
        if (!isFanOn) {
            // TODO: Add API call to turn on fan with current speed
        } else {
            // TODO: Add API call to turn off fan
        }
    };
    
    const incrementSpeed = () => {
        if (speed < 100) {
            setSpeed(speed + 5);
            if (!isFanOn) setIsFanOn(true);
            // TODO: Add API call to update fan speed
        }
    };
    
    const decrementSpeed = () => {
        if (speed > 0) {
            setSpeed(speed - 5);
            if (speed - 5 <= 0) {
                setIsFanOn(false);
                // TODO: Add API call to turn off fan
            } else if (!isFanOn) {
                setIsFanOn(true);
                // TODO: Add API call to turn on fan
            }
            // TODO: Add API call to update fan speed
        }
    };
    
    // Light states
    const [isLightOn, setIsLightOn] = useState(false);
    const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
    
    // LED colors
    const colors = [
        { name: 'RED', value: '#FF5252' },
        { name: 'GREEN', value: '#4CAF50' },
        { name: 'BLUE', value: '#2196F3' },
        { name: 'YELLOW', value: '#FFEB3B' },
        { name: 'PURPLE', value: '#9C27B0' },
        { name: 'WHITE', value: '#FFFFFF' },
    ];
    
    const [selectedColor, setSelectedColor] = useState(colors[0]); // Default Red

    const handleLightToggle = () => {
        setIsLightOn(!isLightOn);
        if (!isLightOn) {
            // TODO: Add API call to turn on light with current color
        } else {
            // TODO: Add API call to turn off light
        }
    };
    
    const handleColorSelect = (color: typeof colors[0]) => {
        setSelectedColor(color);
        setIsColorDropdownOpen(false);
        // TODO: Add API call to change light color
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <Header />
                
                {/* Fan Control Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-gray-500 text-sm">Device Control</h3>
                            <h2 className="text-xl font-semibold text-[#242424]">Fan Status</h2>
                        </div>
                        <button
                            onClick={handleFanToggle}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isFanOn
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-[#7a40f2] hover:bg-[#6930e0] text-white'
                                }`}
                        >
                            {isFanOn ? 'Turn Off' : 'Turn On'}
                        </button>
                    </div>
                    
                    {isFanOn && (
                        <div className="card bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center text-[#7a40f2]">
                                    <span className="w-6 h-6 mr-3 text-[#7c4dff]">
                                        <FanIcon/>
                                    </span>
                                    <span className="text-xl font-medium">Fan</span>
                                </div>
                                <span className="text-xl text-[#7a40f2] font-medium">{speed}</span>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="text-7xl font-light text-gray-300 my-4">{speed}</div>
                                <div className="text-gray-400 mb-6">Fan Speed</div>
                                
                                <div className="w-full mb-6">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">0</span>
                                        <span className="text-[#7a40f2]">50</span>
                                        <span className="text-amber-500">100</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={speed}
                                        onChange={handleSpeedChange}
                                        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, 
                                                #7a40f2 0%, 
                                                #7a40f2 ${speed}%, 
                                                #e5e7eb ${speed}%, 
                                                #e5e7eb 100%)`
                                        }}
                                    />
                                </div>
                                
                                <div className="flex justify-between w-full">
                                    <button
                                        onClick={decrementSpeed}
                                        className="w-16 h-16 rounded-full bg-[#7a40f2] text-white flex items-center justify-center text-3xl font-medium focus:outline-none"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={incrementSpeed}
                                        className="w-16 h-16 rounded-full bg-[#7a40f2] text-white flex items-center justify-center text-3xl font-medium focus:outline-none"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Light Control Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-gray-500 text-sm">Device Control</h3>
                            <h2 className="text-xl font-semibold text-[#242424]">Light Status</h2>
                        </div>
                        <button
                            onClick={handleLightToggle}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isLightOn
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-[#7a40f2] hover:bg-[#6930e0] text-white'
                                }`}
                        >
                            {isLightOn ? 'Turn Off' : 'Turn On'}
                        </button>
                    </div>
                    
                    {isLightOn && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">LED Color</span>
                            </div>
                            
                            <div className="relative">
                                <button
                                    onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                                    className="w-full flex items-center text-black justify-between px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7a40f2] focus:border-transparent bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div 
                                            className="w-5 h-5 rounded-full mr-3 border border-gray-300" 
                                            style={{ backgroundColor: selectedColor.value }}
                                        />
                                        <span className="font-medium">{selectedColor.name}</span>
                                    </div>
                                    <span className="text-lg">▼</span>
                                </button>
                                
                                {isColorDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full bg-gray-50 rounded-lg shadow-lg border border-gray-200">
                                        {colors.map((color) => (
                                            <div
                                                key={color.name}
                                                className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer text-black"
                                                onClick={() => handleColorSelect(color)}
                                            >
                                                <div 
                                                    className="w-5 h-5 rounded-full mr-3 border border-gray-300" 
                                                    style={{ backgroundColor: color.value }}
                                                />
                                                <span className="font-medium">{color.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeviceControl;