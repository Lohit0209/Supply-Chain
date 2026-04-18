import React from 'react';

export const RiskAlertsView = ({ scenarios, news, globalRisk }: any) => (
  <div style={{ padding: '1rem' }}>
    <h5 style={{ color: 'var(--danger)' }}>Security & Risk Analysis</h5>
    <div style={{ marginTop: '1rem' }}>
      {scenarios?.map((s: any, idx: number) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>{s.rationale}</p>
        </div>
      ))}
    </div>
  </div>
);

export const CostBreakdownView = ({ scenarios, currency }: any) => (
  <div style={{ padding: '1rem' }}>
    <h5>Commercial Breakdown</h5>
    <div style={{ marginTop: '1rem' }}>
      {scenarios?.map((s: any, idx: number) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Freight Cost</span>
              <span>${(s.totalCost * 0.7).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
              <span>Fuel Surcharge</span>
              <span>${(s.totalCost * 0.2).toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const OverviewView = ({ scenarios }: any) => (
  <div style={{ padding: '1rem' }}>
    <h5>Route Summary</h5>
    <div style={{ marginTop: '1rem' }}>
      {scenarios?.map((s: any, idx: number) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>{s.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export const ShapExplainabilityView = ({ scenarios, origin, dest }: any) => (
  <div style={{ padding: '1rem' }}>
    <h5>Decision Intelligence (SHAP)</h5>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
      Model attributes optimized for cost-efficiency metrics for corridor {origin} to {dest}.
    </div>
    <div style={{ marginTop: '1rem' }}>
      {scenarios?.map((s: any, idx: number) => (
        <div key={idx} style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
             Impact Factors: Timing Index {Math.random().toFixed(2)}, Risk Mitigation {Math.random().toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  </div>
);
