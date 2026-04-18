import React from 'react';
import { DollarSign, PieChart, TrendingDown, ArrowRight } from 'lucide-react';
import { useCurrency } from '../hooks/useCurrency';

interface Props {
  scenarios: any[];
}

export const CostBreakdownView: React.FC<Props> = ({ scenarios }) => {
  const { format } = useCurrency();

  return (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {scenarios.map((s, i) => (
          <div key={i} className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>{s.name}</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{format(s.totalCost)}</div>
            <div style={{ fontSize: '11px', color: 'var(--accent-emerald)', marginTop: '4px', fontWeight: 700 }}>
              {Math.round((s.totalCost / scenarios[0].totalCost) * 100)}% RELATIVE
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-secondary)' }}>Commercial Composition</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {scenarios.slice(0, 3).map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{s.name}</span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-bright)' }}>{format(s.totalCost)}</span>
                </div>
                <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', gap: '2px' }}>
                  {(() => {
                    const cost = s.backendRoute?.cost || {};
                    const total = s.totalCost || 1;
                    return (
                      <>
                        <div style={{ flex: (cost.freight || 0) / total, background: 'var(--accent-primary)' }} />
                        <div style={{ flex: (cost.fuel || 0) / total, background: 'var(--accent-cyan)' }} />
                        <div style={{ flex: (cost.handling || 0) / total, background: 'var(--accent-emerald)' }} />
                        <div style={{ flex: (cost.customs || 0) / total, background: 'var(--accent-rose)' }} />
                        <div style={{ flex: (cost.extraCostFromDisruptions || 0) / total, background: '#ef4444' }} />
                      </>
                    );
                  })()}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} /> Freight Base
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)' }} /> Fuel Surcharge
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }} /> Terminal Handling
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-rose)' }} /> Customs
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} /> Disruption Risk
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '20px', color: 'var(--accent-emerald)' }}>Optimization Upside</h3>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)', marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Projected Savings (vs Baseline)</div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-emerald)' }}>{format(scenarios[0].totalCost - (scenarios[1].totalCost || scenarios[0].totalCost))}</div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>By deploying the <strong style={{ color: '#fff' }}>Weather-Aware</strong> strategy, we mitigate potential detention costs of up to $2.4k per container.</p>
          <button className="btn-premium" style={{ width: '100%', marginTop: '20px', padding: '12px 0', fontSize: '11px' }}>
            Download Cost Report <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
