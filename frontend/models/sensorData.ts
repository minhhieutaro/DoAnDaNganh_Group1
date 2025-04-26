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
  const points = getDataPoints(timeframe);
  const data: SensorData[] = [];
  const now = new Date();

  // Calculate the time interval based on timeframe
  const getInterval = () => {
    switch (timeframe) {
      case 'Day':
        return 60 * 60 * 1000; // 1 hour in milliseconds
      case 'Week':
        return 60 * 60 * 1000; // 1 hour in milliseconds
      case 'Month':
        return 24 * 60 * 60 * 1000; // 1 day in milliseconds
      case 'Year':
        return 30 * 24 * 60 * 60 * 1000; // ~1 month in milliseconds
      default:
        return 24 * 60 * 60 * 1000;
    }
  };

  const interval = getInterval();

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - (i * interval));

    data.push({
      date: formatDate(date, timeframe),
      humidity: generateRandomValue(30, 70), // 30-70%
      light: generateRandomValue(0, 100), // 0-100%
      temperature: generateRandomValue(18, 30), // 18-30°C
      airQuality: generateRandomValue(0, 100), // 0-100%
    });
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return data;
};
