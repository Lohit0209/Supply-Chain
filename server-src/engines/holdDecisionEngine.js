/**
 * Hold vs Reroute Decision Engine
 */

function calculateHoldImpact(route, disruption, contractConfig, hub) {
  // Storage costs usually vary by 150-500 USD per day
  const dailyStorageRate = 250; 
  const holdDays = 3;
  
  // Reroute overhead is the extra cost already calculated by the pricing engine
  const rerouteCost = Math.max(800, route.cost?.extraCostFromDisruptions || 1200);
  const rerouteTimeDays = Math.max(1, Math.round((route.extraTimeHours || 48) / 24));

  return {
    nearestHub: hub,
    costComparison: {
      hold: dailyStorageRate * holdDays, 
      reroute: rerouteCost
    },
    timeComparison: {
      hold: holdDays,
      reroute: rerouteTimeDays
    }
  };
}

function evaluateDecision(route, holdImpact, contractConfig, priorityMode, itemType) {
  const { hold, reroute } = holdImpact.costComparison;
  const isHoldBetter = hold < reroute;
  
  return {
    recommendation: isHoldBetter ? 'HOLD' : 'REROUTE',
    reasoning: isHoldBetter 
      ? 'Strategic pause at hub avoids high-risk corridor with minimal storage overhead.'
      : 'Active bypass protocol engaged. Diversion compensates for disruption with optimized velocity.',
    costComparison: holdImpact.costComparison,
    timeComparison: holdImpact.timeComparison
  };
}

module.exports = { calculateHoldImpact, evaluateDecision };
