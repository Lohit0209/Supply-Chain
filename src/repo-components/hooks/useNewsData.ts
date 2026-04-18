import { useState, useEffect } from 'react';

export const useNewsData = () => {
  const [signals, setSignals] = useState([]);
  const [globalGeopolRisk, setGlobalGeopolRisk] = useState(0.3);

  useEffect(() => {
    // Mock news loading
    setSignals([
      { id: 1, title: 'Storm surge heading towards Mumbai', severity: 'HIGH' },
      { id: 2, title: 'Border tension in Suez Canal', severity: 'MEDIUM' }
    ]);
  }, []);

  return { signals, globalGeopolRisk };
};
