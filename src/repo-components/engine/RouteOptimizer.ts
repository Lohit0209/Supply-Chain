export interface RouteSegment {
  from: string;
  to: string;
  mode: string;
  carrier?: {
    name: string;
    id?: string;
  };
  duration: number;
  cost?: number;
  breakdown?: any;
}

export interface Scenario {
  name: string;
  modality: string;
  totalTime: number;
  totalCost: number;
  totalCostRange: [number, number];
  totalRisk: number;
  co2kg: number;
  description: string;
  rationale: string;
  segments: RouteSegment[];
  isRecommended?: boolean;
  uiTag?: string | null;
  itinerary?: {
    day: number;
    event: string;
    location: string;
  }[];
  backendRoute?: any;
}

export class RouteOptimizer {
  static generateScenarios(params: any, originHub: any, destHub: any, risks: any, chaos: number): Scenario[] {
    // Basic generator that will be enriched by backend data
    return [
      {
        name: 'Expedited Air',
        modality: 'AIR',
        totalTime: 2,
        totalCost: 5000,
        totalCostRange: [4800, 5200],
        totalRisk: 15,
        co2kg: 800,
        description: 'Direct air transport',
        rationale: 'Time-critical path',
        segments: [
          { from: originHub.name, to: destHub.name, mode: 'AIR', duration: 48 }
        ],
        itinerary: [
          { day: 1, event: `Departure from ${originHub.name}`, location: originHub.name },
          { day: 1, event: 'Flight to Destination Hub', location: destHub.name },
          { day: 2, event: 'Final deployment & delivery', location: destHub.name }
        ]
      },
      {
        name: 'Ocean Economical',
        modality: 'OCEAN',
        totalTime: 15,
        totalCost: 1200,
        totalCostRange: [1100, 1300],
        totalRisk: 25,
        co2kg: 150,
        description: 'Standard sea freight',
        rationale: 'Lowest cost profile',
        segments: [
          { from: originHub.name, to: destHub.name, mode: 'OCEAN', duration: 360 }
        ],
        itinerary: [
          { day: 1, event: `Departure from ${originHub.name}`, location: originHub.name },
          { day: 1, event: 'Vessel transit to Destination Hub', location: destHub.name },
          { day: 14, event: 'Customs clearance & hub handling', location: destHub.name },
          { day: 15, event: 'Final deployment & delivery', location: destHub.name }
        ]
      },
      {
        name: 'Strategic Balanced',
        modality: 'MULTIMODAL',
        totalTime: 8,
        totalCost: 2800,
        totalCostRange: [2700, 2900],
        totalRisk: 10,
        co2kg: 400,
        description: 'Combined transport',
        rationale: 'Optimized risk/cost mix',
        segments: [
          { from: originHub.name, to: 'In-Transit Hub', mode: 'AIR', duration: 48 },
          { from: 'In-Transit Hub', to: destHub.name, mode: 'ROAD', duration: 72 }
        ],
        itinerary: [
          { day: 1, event: `Departure from ${originHub.name}`, location: originHub.name },
          { day: 2, event: 'Flight to In-Transit Hub', location: 'In-Transit Hub' },
          { day: 3, event: 'Connecting layover & handling', location: 'In-Transit Hub' },
          { day: 4, event: 'Road transit to Destination Hub', location: destHub.name },
          { day: 7, event: 'Customs clearance & hub handling', location: destHub.name },
          { day: 8, event: 'Final deployment & delivery', location: destHub.name }
        ]
      },
      {
        name: 'Continental Surface',
        modality: 'ROAD',
        totalTime: 12,
        totalCost: 2200,
        totalCostRange: [2100, 2300],
        totalRisk: 20,
        co2kg: 300,
        description: 'Road/Rail bypass',
        rationale: 'Land-bridge alternative',
        segments: [
          { from: originHub.name, to: destHub.name, mode: 'ROAD', duration: 288 }
        ],
        itinerary: [
          { day: 1, event: `Departure from ${originHub.name}`, location: originHub.name },
          { day: 1, event: 'Road transit to Destination Hub', location: destHub.name },
          { day: 11, event: 'Customs clearance & hub handling', location: destHub.name },
          { day: 12, event: 'Final deployment & delivery', location: destHub.name }
        ]
      }
    ];
  }
}
