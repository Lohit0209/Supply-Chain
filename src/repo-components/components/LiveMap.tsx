import React from 'react';
import MapVisualization from '../../components/MapVisualization';

export const LiveMap = ({ scenarios, selectedScenario, riskZones, activeDisruptions }) => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <MapVisualization 
        shipments={selectedScenario?.segments || []}
        riskZones={riskZones || []}
        activeDisruptions={activeDisruptions || []}
      />
    </div>
  );
};
