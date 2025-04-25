'use client';

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface TemperatureData {
    value: number;
    timestamp: string;
}

interface TemperatureStats {
    current: number;
    min: number;
    max: number;
    avg: number;
    median: number;
    stdDev: number;
}

// Demo data generation functions
const generateRandomTemperature = (min: number, max: number) => {
    return +(min + Math.random() * (max - min)).toFixed(1);
};

const generateHistoricalData = (count: number, baseTemp: number) => {
    const now = new Date();
    return Array.from({ length: count }, (_, i) => ({
        value: generateRandomTemperature(baseTemp - 2, baseTemp + 2),
        timestamp: new Date(now.getTime() - (count - i) * 5000).toISOString()
    }));
};

const calculateStats = (data: TemperatureData[]): TemperatureStats => {
    if (data.length === 0) {
        return {
            current: 0,
            min: 0,
            max: 0,
            avg: 0,
            median: 0,
            stdDev: 0
        };
    }

    const values = data.map(d => d.value);
    const sortedValues = [...values].sort((a, b) => a - b);

    const min = sortedValues[0];
    const max = sortedValues[sortedValues.length - 1];
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const median = sortedValues[Math.floor(sortedValues.length / 2)];

    // Calculate standard deviation
    const squareDiffs = values.map(value => {
        const diff = value - avg;
        return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(avgSquareDiff);

    return {
        current: values[values.length - 1],
        min,
        max,
        avg,
        median,
        stdDev
    };
};

const TemperatureMonitor = () => {
    const [currentTemp, setCurrentTemp] = useState<number>(25);
    const [historicalData, setHistoricalData] = useState<TemperatureData[]>([]);
    const [activeTab, setActiveTab] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');
    const [stats, setStats] = useState<TemperatureStats>({
        current: 25,
        min: 23,
        max: 27,
        avg: 25,
        median: 25,
        stdDev: 0.5
    });

    useEffect(() => {
        // Initialize with some demo data
        const initialData = generateHistoricalData(50, 25);
        const initialStats = calculateStats(initialData);
        setHistoricalData(initialData);
        setStats(initialStats);
        setCurrentTemp(initialStats.current);

        // Update data every 5 seconds
        const interval = setInterval(() => {
            const newTemp = generateRandomTemperature(23, 27);
            const newDataPoint = {
                value: newTemp,
                timestamp: new Date().toISOString()
            };

            // Update all states atomically
            setHistoricalData(prevData => {
                const updatedData = [...prevData.slice(-49), newDataPoint];
                const newStats = calculateStats(updatedData);

                // Update stats and current temp in the next microtask
                Promise.resolve().then(() => {
                    setStats(newStats);
                    setCurrentTemp(newTemp);
                });

                return updatedData;
            });
        }, 5000);

        // TODO: Add API call to fetch current temperature
        // TODO: Add API call to fetch historical data (limit 1000)
        // TODO: Calculate statistics from historical data

        return () => clearInterval(interval);
    }, [activeTab]);

    const getTemperatureStatus = (temp: number) => {
        if (temp >= 35) return { text: 'Danger - Too Hot!', color: 'text-red-600' };
        if (temp >= 30) return { text: 'Warning - High Temperature', color: 'text-yellow-600' };
        if (temp <= 15) return { text: 'Warning - Low Temperature', color: 'text-blue-600' };
        return { text: 'Normal Temperature', color: 'text-green-600' };
    };

    const chartData = {
        labels: historicalData.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: historicalData.map(d => d.value),
                borderColor: '#C084FC',
                tension: 0.1,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
                fill: false
            }
        ]
    };

    const status = getTemperatureStatus(currentTemp);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <Header />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Temperature Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-[#242424] mb-4">Current Temperature</h2>
                        <div className="text-4xl font-bold mb-2 text-[#242424]">{currentTemp}°C</div>
                        <div className={`font-medium ${status.color}`}>
                            {status.text}
                        </div>
                    </div>

                    {/* Statistics Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-[#242424] mb-4">Statistics</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Minimum:</span>
                                <span className="font-medium text-[#242424]">{stats.min}°C</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Maximum:</span>
                                <span className="font-medium text-[#242424]">{stats.max}°C</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Average:</span>
                                <span className="font-medium text-[#242424]">{stats.avg.toFixed(1)}°C</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Median:</span>
                                <span className="font-medium text-[#242424]">{stats.median}°C</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Standard Deviation:</span>
                                <span className="font-medium text-[#242424]">{stats.stdDev.toFixed(2)}°C</span>
                            </div>
                        </div>
                    </div>

                    {/* Historical Data Chart */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-gray-500 text-sm">Statistics</h3>
                                <h2 className="text-xl font-semibold text-[#242424]">Temperature History</h2>
                            </div>
                            <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
                                {(['Day', 'Week', 'Month', 'Year'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-1 rounded-full text-sm ${activeTab === tab
                                            ? 'bg-blue-900 text-white'
                                            : 'text-gray-600 hover:bg-gray-200'
                                            }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[400px]">
                            <Line
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    animation: {
                                        duration: 300
                                    },
                                    plugins: {
                                        legend: {
                                            display: false
                                        }
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                display: false
                                            },
                                            ticks: {
                                                maxRotation: 0,
                                                autoSkip: true,
                                                maxTicksLimit: 10
                                            }
                                        },
                                        y: {
                                            grid: {
                                                color: '#f3f4f6'
                                            },
                                            min: Math.floor(stats.min - 1),
                                            max: Math.ceil(stats.max + 1)
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemperatureMonitor; 