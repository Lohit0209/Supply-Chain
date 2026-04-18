/**
 * Intelligence Engine
 * Generates autonomous disruptions and news signals (Mock)
 */

class IntelligenceEngine {
  constructor() {
    this.newsFeed = [
      { id: 1, type: 'weather', title: 'Monsoon season intensifying in Bay of Bengal', impact: 'Medium', timestamp: Date.now() },
      { id: 2, type: 'geopolitical', title: 'Port of Singapore reports higher security protocols', impact: 'Low', timestamp: Date.now() - 3600000 }
    ];
  }

  tick() {
    return {
      expiredIds: [],
      newDisruption: null,
      newsFeed: this.newsFeed
    };
  }
}

module.exports = new IntelligenceEngine();
