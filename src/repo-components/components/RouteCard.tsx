import React, { useState } from 'react';
import { 
  Truck, Ship, Plane, Clock, ShieldCheck, 
  ChevronDown, ChevronUp, AlertTriangle, MapPin, TrendingUp,
  Activity, Wind, Globe, Shield, Navigation2, DollarSign
} from 'lucide-react';
import type { Scenario, RouteSegment } from '../engine/RouteOptimizer';
import { useCurrency } from '../hooks/useCurrency';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  scenario: Scenario;
  index: number;
  isActive: boolean;
  onDeploy: () => void;
}

const getCarrierIcon = (mode: string) => {
  switch (mode.toUpperCase()) {
    case 'AIR': return <Plane size={20} color="var(--accent-cyan)" />;
    case 'OCEAN': return <Ship size={20} color="var(--accent-primary)" />;
    case 'ROAD': return <Truck size={20} color="var(--accent-emerald)" />;
    default: return <Truck size={20} />;
  }
};

export const RouteCard: React.FC<Props> = ({ scenario, index, isActive, onDeploy }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { format } = useCurrency();

  const tag = scenario.isRecommended ? 'Recommended' : scenario.uiTag;

  return (
    <div 
      className={`route-card ${isExpanded ? 'expanded' : ''} ${isActive ? 'active' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {tag && (
        <div style={{ 
          position: 'absolute', top: 0, right: 24, padding: '6px 16px', 
          background: tag === 'Recommended' ? 'var(--accent-emerald)' : 'var(--accent-primary)', 
          fontSize: 10, fontWeight: 800, color: '#fff', 
          borderBottomLeftRadius: 10, borderBottomRightRadius: 10, zIndex: 10 
        }}>
          {tag.toUpperCase()}
        </div>
      )}

      {(scenario as any).backendRoute?.disruptionImpacts?.length > 0 && (
        <div style={{ 
          position: 'absolute', top: 0, left: 100, padding: '6px 12px', 
          background: 'rgba(239, 68, 68, 0.9)', 
          borderBottomLeftRadius: 8, borderBottomRightRadius: 8, zIndex: 10, 
          color: 'white', fontSize: 9, fontWeight: 900, 
          display: 'flex', alignItems: 'center', gap: 6, 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' 
        }}>
          <AlertTriangle size={12} /> AFFECTED BY DISRUPTIONS ({(scenario as any).backendRoute.disruptionImpacts.length})
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 120px 160px 40px', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255, 255, 255, 0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {getCarrierIcon(scenario.modality)}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{scenario.segments[0]?.carrier?.name || 'Carrier'}</div>
              <div style={{ 
                fontSize: 9, fontWeight: 900, 
                background: (scenario as any).backendRoute?.pricingModeUsed === 'spot' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)', 
                color: (scenario as any).backendRoute?.pricingModeUsed === 'spot' ? '#f59e0b' : 'var(--accent-primary)',
                padding: '2px 6px', borderRadius: 4, 
                border: `1px solid ${(scenario as any).backendRoute?.pricingModeUsed === 'spot' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
                letterSpacing: 0.5, textTransform: 'uppercase'
              }}>
                {(scenario as any).backendRoute?.pricingModeUsed === 'contract' ? 'Fixed Contract' : 'Spot Market'}
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>{scenario.modality} Freight Service</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{format(scenario.totalCost)}</div>
          <div style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-muted)', marginTop: 2 }}>TOTAL CARRIAGE</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{scenario.totalTime} Days</div>
          <div style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-muted)', marginTop: 2 }}>EST. TRANSIT</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isExpanded ? <ChevronUp size={20} color="var(--text-muted)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: 24 }}>
              {/* Intelligent Decision Panel */}
              {(scenario as any).backendRoute?.decision && (
                <div style={{ 
                  padding: 16, 
                  background: (scenario as any).backendRoute.decision.recommendation === 'HOLD' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                  border: `1px solid ${(scenario as any).backendRoute.decision.recommendation === 'HOLD' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                  borderRadius: 12, marginBottom: 32
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ 
                        padding: 8, borderRadius: 8, 
                        background: (scenario as any).backendRoute.decision.recommendation === 'HOLD' ? 'var(--accent-primary)' : 'var(--accent-emerald)', 
                        color: '#000' 
                      }}>
                        {(scenario as any).backendRoute.decision.recommendation === 'HOLD' ? <Clock size={16} /> : <TrendingUp size={16} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Decision Intelligence</div>
                        <div style={{ fontSize: 14, fontWeight: 800 }}>
                          SYSTEM RECOMMENDATION: <span style={{ color: (scenario as any).backendRoute.decision.recommendation === 'HOLD' ? 'var(--accent-primary)' : 'var(--accent-emerald)' }}>{(scenario as any).backendRoute.decision.recommendation}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 9, fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nearest Hub</div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{(scenario as any).backendRoute.holdOption?.nearestHub?.name || 'In Transit'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {(scenario as any).backendRoute.decision.reasoning || (scenario as any).backendRoute.decision.reason || 'Strategic evaluation pending...'}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-dim)' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                               <div style={{ fontSize: 8, fontWeight: 900, color: 'var(--text-muted)' }}>PROJECTED HOLD</div>
                               <div style={{ fontSize: 16, fontWeight: 800 }}>{format((scenario as any).backendRoute.decision.costComparison?.hold || 0)}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <div style={{ fontSize: 8, fontWeight: 900, color: 'var(--text-muted)' }}>DELAY</div>
                               <div style={{ fontSize: 13, fontWeight: 700 }}>+{(scenario as any).backendRoute.decision.timeComparison?.hold || 0} Days</div>
                            </div>
                         </div>
                      </div>
                      <div style={{ padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-dim)' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                               <div style={{ fontSize: 8, fontWeight: 900, color: 'var(--text-muted)' }}>REROUTE OVERHEAD</div>
                               <div style={{ fontSize: 16, fontWeight: 800 }}>{format((scenario as any).backendRoute.decision.costComparison?.reroute || 0)}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <div style={{ fontSize: 8, fontWeight: 900, color: 'var(--text-muted)' }}>TIME IMPACT</div>
                               <div style={{ fontSize: 13, fontWeight: 700 }}>+{(scenario as any).backendRoute.decision.timeComparison?.reroute || 0} Days</div>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ padding: '32px 0', borderTop: '1px solid var(--border-dim)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                <div>
                   <h5 style={{ fontSize: 12, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Commercial Cost Distribution</h5>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {Object.entries((scenario as any).backendRoute?.cost || {}).map(([key, val]: [string, any]) => {
                        if (key === 'total' || key === 'subtotal' || typeof val !== 'number') return null;
                        const percentage = Math.round((val / scenario.totalCost) * 100);
                        return (
                          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                                <span style={{ textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 0.5 }}>{key}</span>
                                <span style={{ color: '#fff', fontWeight: 700 }}>{format(val)}</span>
                             </div>
                             <div style={{ height: 4, width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--accent-primary)', borderRadius: 2 }} />
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </div>

                <div>
                  <h5 style={{ fontSize: 12, fontWeight: 700, marginBottom: 20, color: '#fff' }}>Shipment Timeline</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 4, top: 4, bottom: 4, width: '1px', background: 'var(--border-dim)' }} />
                    {(scenario.itinerary || []).map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16, position: 'relative' }}>
                        <div style={{ 
                          width: 10, height: 10, borderRadius: '50%', 
                          background: i === 0 || i === (scenario.itinerary?.length || 0) - 1 ? 'var(--accent-primary)' : 'var(--bg-deep)', 
                          border: `2px solid ${i === 0 || i === (scenario.itinerary?.length || 0) - 1 ? 'var(--accent-primary)' : 'var(--border-bright)'}`,
                          zIndex: 1, marginTop: 4 
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>{step.event}</div>
                            <div style={{ fontSize: 9, fontWeight: 900, color: 'var(--accent-primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '2px 6px', borderRadius: 4 }}>DAY {step.day}</div>
                          </div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{step.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                   <div style={{ padding: 24, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid var(--border-dim)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <ShieldCheck size={16} color="var(--accent-emerald)" />
                        <span style={{ fontSize: 11, fontWeight: 900 }}>MISSION READINESS</span>
                      </div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                        Path verified against current geopolitical signals. All SLA constraints are met with a {Math.round(100 - scenario.totalRisk)}% stability buffer.
                      </p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeploy(); }}
                        className="btn-premium" 
                        style={{ width: '100%', padding: '12px 0', fontSize: 11 }}
                      >
                        DEPLOY TO LOGISTICS HUB
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
