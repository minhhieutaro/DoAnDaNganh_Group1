import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SensorData } from '../../models/sensorData';

interface SensorsChartProps {
  data: SensorData[];
}

const SensorsChart: React.FC<SensorsChartProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'Day' | 'Week' | 'Month' | 'Year'>('Month');
  const [visibleDatasets, setVisibleDatasets] = useState({
    humidity: true,
    light: true,
    temperature: true,
    airQuality: true
  });

  const toggleDataset = (dataKey: keyof typeof visibleDatasets) => {
    setVisibleDatasets(prev => ({
      ...prev,
      [dataKey]: !prev[dataKey]
    }));
  };

  const renderLegend = () => (
    <div className="flex mb-4 space-x-6">
      <button
        className="flex items-center"
        onClick={() => toggleDataset('humidity')}
      >
        <div className={`w-3 h-3 rounded-full mr-2 ${visibleDatasets.humidity ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
        <span className="text-sm text-gray-600">Humidity</span>
      </button>
      <button
        className="flex items-center"
        onClick={() => toggleDataset('light')}
      >
        <div className={`w-3 h-3 rounded-full mr-2 ${visibleDatasets.light ? 'bg-pink-400' : 'bg-gray-300'}`}></div>
        <span className="text-sm text-gray-600">Light Intensity</span>
      </button>
      <button
        className="flex items-center"
        onClick={() => toggleDataset('temperature')}
      >
        <div className={`w-3 h-3 rounded-full mr-2 ${visibleDatasets.temperature ? 'bg-purple-400' : 'bg-gray-300'}`}></div>
        <span className="text-sm text-gray-600">Temperature</span>
      </button>
      <button
        className="flex items-center"
        onClick={() => toggleDataset('airQuality')}
      >
        <div className={`w-3 h-3 rounded-full mr-2 ${visibleDatasets.airQuality ? 'bg-green-400' : 'bg-gray-300'}`}></div>
        <span className="text-sm text-gray-600">Air Quality</span>
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-gray-500 text-sm">Statistics</h3>
          <h2 className="text-xl font-semibold text-[#242424]">Sensors</h2>
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

      {renderLegend()}

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px'
              }}
            />
            {visibleDatasets.humidity && (
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#93C5FD"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {visibleDatasets.light && (
              <Line
                type="monotone"
                dataKey="light"
                stroke="#F472B6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {visibleDatasets.temperature && (
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#C084FC"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {visibleDatasets.airQuality && (
              <Line
                type="monotone"
                dataKey="airQuality"
                stroke="#4ADE80"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SensorsChart;