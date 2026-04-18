import React from 'react';
import { ShieldAlert, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  scenarios: any[];
  news: any[];
  globalRisk: number;
}

export const RiskAlertsView: React.FC<Props> = ({ scenarios, news, globalRisk }) => {
  return (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <div className="card" style={{ flex: 1, padding: '20px', borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Geopolitical Index</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-rose)' }}>{(globalRisk * 100).toFixed(1)}%</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Aggregated Threat Level · High Alert</div>
        </div>
        <div className="card" style={{ flex: 1, padding: '20px', borderLeft: '4px solid var(--accent-primary)' }}>
          <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Scenarios Analyzed</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-primary)' }}>{scenarios.length}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>AI-Driven Path Variations</div>
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-secondary)' }}>Tactical Signals</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {news.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card" 
              style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px', background: 'rgba(255,255,255,0.02)' }}
            >
              <div style={{ padding: '10px', borderRadius: '10px', background: item.type === 'risk' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)', color: item.type === 'risk' ? '#ef4444' : '#6366f1' }}>
                {item.type === 'risk' ? <ShieldAlert size={18} /> : <Info size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.title}</span>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)' }}>{item.time}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-secondary)' }}>Route Exposure Analysis</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {scenarios.map((s, idx) => (
            <div key={idx} className="card" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800 }}>{s.name}</span>
                <span style={{ fontSize: '11px', fontWeight: 900, color: s.totalRisk > 30 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                  {s.totalRisk}% RISK
                </span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${s.totalRisk}%`, height: '100%', background: s.totalRisk > 30 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }} />
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.4 }}>{s.rationale}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
