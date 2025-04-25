import { SensorData } from '../types/sensor';

interface SensorDisplayProps {
    data: SensorData[];
}

export const SensorDisplay: React.FC<SensorDisplayProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data.map((sensor, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-2">{sensor.name}</h3>
                    <div className="space-y-2">
                        <p className="text-gray-600">Value: {sensor.value}</p>
                        <p className="text-gray-600">Unit: {sensor.unit}</p>
                        <p className="text-gray-600">Timestamp: {new Date(sensor.timestamp).toLocaleString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}; 