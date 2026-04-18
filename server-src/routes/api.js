const express = require('express');
const router = express.Router();
const tracker = require('../simulation/simulationTracker');
const { generateRoutes } = require('../engines/routeOptimizationEngine');
const { RISK_ZONES } = require('../engines/riskCostEngine');
const intelligenceEngine = require('../engines/intelligenceEngine');

// --- ROUTES ---

router.post('/routes', (req, res) => {
  try {
    const { origin, destination, disruptions = [] } = req.body;
    const result = generateRoutes(req.body, disruptions);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/routes/scenarios', (req, res) => {
  try {
    // Generate base scenarios for strategic comparison
    const scenarios = [
      { 
        scenarioId: 'baseline', 
        scenarioLabel: 'Baseline Protocol', 
        description: 'Standard historical routing vectors.',
        relevantDisruptions: [],
        tradeoffExplanation: 'Direct paths with no risk-evasion overrides.'
      },
      { 
        scenarioId: 'weather-aware', 
        scenarioLabel: 'Hydro-Meteorological Evasion', 
        description: 'Prioritizes avoidance of severe weather cells.',
        relevantDisruptions: RISK_ZONES.filter(z => z.riskType === 'weather'),
        tradeoffExplanation: 'May incur 15-20% extra fuel burn to bypass storm systems.'
      },
      { 
        scenarioId: 'geopolitical-aware', 
        scenarioLabel: 'Geopolitical Shielding', 
        description: 'Bypasses high-tension chokepoints and conflict zones.',
        relevantDisruptions: RISK_ZONES.filter(z => z.riskType === 'geopolitical' || z.riskType === 'conflict'),
        tradeoffExplanation: 'Significant mileage increase but ensures cargo integrity.'
      },
      { 
        scenarioId: 'total-avoidance', 
        scenarioLabel: 'Max Critical Security', 
        description: 'Total avoidance of all active risk vectors.',
        relevantDisruptions: RISK_ZONES,
        tradeoffExplanation: 'Highest cost and time impact for maximum security assurance.'
      }
    ];
    res.json({ scenarios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SIMULATION ---

router.get('/simulate/tick', (req, res) => {
  try {
    const shipments = tracker.tick();
    const systemImpact = tracker.getSystemImpact();
    res.json({ 
      shipments: tracker.getAllShipments(), 
      tickCount: tracker.tickCount,
      systemImpact
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/simulate/start', (req, res) => {
  try {
    const { input, selectedRouteId } = req.body;
    const shipment = tracker.addShipment(input, selectedRouteId);
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/simulate/disruption', (req, res) => {
  try {
    const result = tracker.addDisruption(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/simulate/disruption/:id', (req, res) => {
  try {
    const resolved = tracker.removeDisruption(req.params.id);
    res.json({ success: resolved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/simulate/clear', (req, res) => {
  try {
    tracker.clearAll();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/simulate/radar', (req, res) => {
  try {
    const intel = intelligenceEngine.tick();
    res.json({
      activeDisruptions: tracker.getDisruptions(),
      newsFeed: intel.newsFeed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/risk-zones', (req, res) => {
  res.json({ 
    riskZones: RISK_ZONES,
    activeDisruptions: tracker.getDisruptions()
  });
});

module.exports = router;
