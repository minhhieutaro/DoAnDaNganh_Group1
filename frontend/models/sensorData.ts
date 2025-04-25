export interface SensorData {
  date: string;
  humidity: number;
  light: number;
  temperature: number;
  airQuality: number;
}

const generateRandomValue = (min: number, max: number) => {
  return Number((min + Math.random() * (max - min)).toFixed(1));
};

const getDataPoints = (timeframe: string): number => {
  switch (timeframe) {
    case 'Day':
      return 24; // 24 hours
    case 'Week':
      return 7 * 24; // 7 days * 24 hours
    case 'Month':
      return 30; // 30 days
    case 'Year':
      return 12; // 12 months
    default:
      return 30;
  }
};

const formatDate = (date: Date, timeframe: string): string => {
  switch (timeframe) {
    case 'Day':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    case 'Week':
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    case 'Month':
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    case 'Year':
      return date.toLocaleDateString([], { month: 'short', year: '2-digit' });
    default:
      return date.toLocaleDateString();
  }
};

export const fetchSensorData = async (timeframe: string = 'Month'): Promise<SensorData[]> => {
  try {
    // Fetch historical data for all sensors
    const [tempRes, lightRes, humidRes, airQualityRes] = await Promise.all([
      fetch('http://localhost:8000/sensor/temp/history1000'),
      fetch('http://localhost:8000/sensor/light/history1000'),
      fetch('http://localhost:8000/sensor/humid/history1000'),
      fetch('http://localhost:8000/sensor/air-quality')
    ]);

    const [tempData, lightData, humidData] = await Promise.all([
      tempRes.json(),
      lightRes.json(),
      humidRes.json()
    ]);

    const airQualityData = await airQualityRes.json();
    const airQualityValue = airQualityData.value || 75;

    if (!Array.isArray(tempData) || !Array.isArray(lightData) || !Array.isArray(humidData)) {
      throw new Error('Invalid data format received from the server');
    }

    // Combine the data from all sensors
    const combinedData = tempData.map((temp: any, index: number) => {
      const date = new Date(temp.timestamp);
      return {
        date: formatDate(date, timeframe),
        temperature: parseFloat(temp.value) || 0,
        light: parseFloat(lightData[index]?.value) || 0,
        humidity: parseFloat(humidData[index]?.value) || 0,
        airQuality: airQualityValue
      };
    });

    // Sort by timestamp to ensure correct order
    return combinedData.sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    return [];
  }
};
