/**
 * Pricing Engine
 * Calculates commercial costs based on pricing mode (contract vs spot)
 */

function calculateRoutePricing(route, pricingMode, disruptions, options = {}) {
  const isContract = pricingMode === 'contract';
  const config = options.contractConfig || {};
  const currentCost = route.cost || {};

  // If cost components are missing, initialize with defaults
  const costs = {
    freight: currentCost.freight || 0,
    fuel: currentCost.fuel || 0,
    handling: currentCost.handling || 0,
    customs: currentCost.customs || 0,
    disruptions: route.extraCostFromDisruptions || 0
  };

  const baseTotal = costs.freight + costs.fuel + costs.handling + costs.customs + costs.disruptions;
  let finalCost = baseTotal;

  if (isContract) {
    // Apply contract discount/adjustment (default 10% discount if not specified)
    const multiplier = config.baseRateOverride || 0.9;
    finalCost = Math.round(baseTotal * multiplier);
  } else {
    // Spot rates are usually higher if disruptions are present (e.g., insurance surcharges, priority handling)
    if (disruptions && disruptions.length > 0) {
      finalCost = Math.round(baseTotal * 1.35); // 35% spot market surge in high-risk zones
    } else {
      finalCost = Math.round(baseTotal * 1.15); // Standard 15% spot overhead
    }
  }

  // Calculate the adjustment scalar to apply to each component to reach the finalCommercial cost
  const scalar = finalCost / (baseTotal || 1);

  return {
    finalCost,
    pricingMode,
    contractType: isContract ? (config.rateType || 'Fixed') : 'Spot',
    updatedComponents: {
      total: finalCost,
      freight: Math.round(costs.freight * scalar),
      fuel: Math.round(costs.fuel * scalar),
      handling: Math.round(costs.handling * scalar),
      customs: Math.round(costs.customs * scalar),
      extraCostFromDisruptions: Math.round(costs.disruptions * scalar)
    }
  };
}

module.exports = { calculateRoutePricing };
