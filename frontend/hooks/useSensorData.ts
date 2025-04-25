import { useState, useEffect, useCallback } from 'react';
import { fetchSensorData, SensorData } from '../models/sensorData';

type TimeframeType = 'Day' | 'Week' | 'Month' | 'Year';

export const useSensorData = (timeframe: TimeframeType = 'Month') => {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      const sensorData = await fetchSensorData(timeframe);
      setData(prevData => {
        // Only update if data has changed
        if (JSON.stringify(prevData) !== JSON.stringify(sensorData)) {
          return sensorData;
        }
        return prevData;
      });
      setError(null);
    } catch (err) {
      setError('Failed to load sensor data');
      console.error(err);
    }
  }, [timeframe]);

  useEffect(() => {
    let isComponentMounted = true;

    const initialLoad = async () => {
      if (isComponentMounted) {
        setLoading(true);
        await loadData();
        setLoading(false);
      }
    };

    initialLoad();

    // Set up interval for real-time updates
    const interval = setInterval(async () => {
      if (isComponentMounted) {
        await loadData();
      }
    }, 5000);

    return () => {
      isComponentMounted = false;
      clearInterval(interval);
    };
  }, [loadData]);

  return { data, loading, error };
};
