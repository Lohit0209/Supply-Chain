import React from 'react';
import { MapPin, ArrowRight, Home, Globe, TrendingUp, Clock, Zap } from 'lucide-react';

interface Props {
  scenarios: any[];
  origin: string;
  dest: string;
}

export const OverviewView: React.FC<Props> = ({ scenarios, origin, dest }) => {
  return (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border-dim)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(99, 102, 241, 0.2)', margin: '0 auto' }}>
            <Home size={32} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800 }}>{origin}</div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px', marginTop: '4px' }}>ORIGIN HUB</div>
        </div>
        
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', height: '1px', background: 'dashed rgba(255,255,255,0.1)', borderTop: '2px dashed var(--border-dim)' }} />
          <div style={{ position: 'absolute', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border-dim)', fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={14} /> GLOBAL LOGISTICS CORRIDOR
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid rgba(16, 185, 129, 0.2)', margin: '0 auto' }}>
            <MapPin size={32} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800 }}>{dest}</div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', letterSpacing: '2px', marginTop: '4px' }}>DESTINATION HUB</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-secondary)' }}>Route Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {scenarios.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={18} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.totalTime}d · {s.modality}</div>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-secondary)' }}>Logistics Health</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}><Clock size={16} /></div>
              <div style={{ fontSize: '18px', fontWeight: 800 }}>Nominal</div>
              <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)', marginTop: '4px' }}>NETWORK LATENCY</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ color: 'var(--accent-amber)', marginBottom: '8px' }}><Zap size={16} /></div>
              <div style={{ fontSize: '18px', fontWeight: 800 }}>84% Efficient</div>
              <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)', marginTop: '4px' }}>MODEL CONFIDENCE</div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '24px', lineHeight: 1.6 }}>System currently monitor 428 nodes across the {origin}-{dest} corridor. Strategic re-routing is enabled.</p>
        </div>
      </div>
    </div>
  );
};
