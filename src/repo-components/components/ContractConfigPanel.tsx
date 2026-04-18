import React from 'react';
import { Calculator, Zap, ShieldCheck } from 'lucide-react';

export const ContractConfigPanel = ({ config, setConfig, onApply }: any) => {
  return (
    <div style={{ background: 'var(--bg-surface)', padding: 24, borderRadius: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Zap size={20} color="var(--accent-primary)" />
        <h3 style={{ fontSize: 16, fontWeight: 800 }}>Contract Procurement</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-secondary)' }}>BASELINE RATE ADJUSTMENT</label>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-primary)' }}>{Math.round(config.baseRateOverride * 100)}%</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.01" 
            value={config.baseRateOverride}
            onChange={(e) => setConfig({ ...config, baseRateOverride: parseFloat(e.target.value) })}
            style={{ 
              width: '100%', accentColor: 'var(--accent-primary)',
              background: 'rgba(255,255,255,0.05)', borderRadius: 2, height: 4
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginTop: 8, fontWeight: 700 }}>
             <span>-50% DISCOUNT</span>
             <span>+50% SURCHARGE</span>
          </div>
        </div>

        <div style={{ padding: 16, background: 'rgba(99, 102, 241, 0.05)', borderRadius: 12, border: '1px solid rgba(99, 102, 241, 0.1)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
            <ShieldCheck size={14} color="var(--accent-primary)" />
            <span style={{ fontSize: 10, fontWeight: 900 }}>PROCUREMENT INSIGHT</span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Adjusting rates affects carrier availability and priority within the tactical model. Fixed contract routes bypass spot-market volatility.
          </p>
        </div>

        <button 
          className="btn-premium" 
          onClick={() => onApply(config)} 
          style={{ width: '100%', padding: '14px 0', fontSize: 12 }}
        >
          <Calculator size={16} /> VALIDATE & SYNC CONTRACT
        </button>
      </div>
    </div>
  );
};
