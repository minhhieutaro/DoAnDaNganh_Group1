'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

const FanControl = () => {
    const [isOn, setIsOn] = useState(false);
    const [speed, setSpeed] = useState(50);

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpeed = parseInt(e.target.value);
        setSpeed(newSpeed);
        if (!isOn) setIsOn(true);
        // TODO: Add API call to update fan speed
    };

    const handleToggle = () => {
        setIsOn(!isOn);
        if (!isOn) {
            // TODO: Add API call to turn on fan with current speed
        } else {
            // TODO: Add API call to turn off fan
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <Header />

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-gray-500 text-sm">Device Control</h3>
                            <h2 className="text-xl font-semibold text-[#242424]">Fan Status</h2>
                        </div>
                        <button
                            onClick={handleToggle}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isOn
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-[#7a40f2] hover:bg-[#6930e0] text-white'
                                }`}
                        >
                            {isOn ? 'Turn Off' : 'Turn On'}
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Fan Speed</span>
                            <span className="text-[#242424] font-medium">{speed}%</span>
                        </div>

                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={speed}
                                onChange={handleSpeedChange}
                                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!isOn}
                            />
                            <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-sm text-gray-500">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FanControl; 