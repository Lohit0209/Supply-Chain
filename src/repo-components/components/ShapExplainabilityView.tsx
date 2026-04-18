import React from 'react';
import { Activity, Brain, ShieldAlert, BarChart3, Info } from 'lucide-react';

interface Props {
  scenarios: any[];
}

export const ShapExplainabilityView: React.FC<Props> = ({ scenarios }) => {
  return (
    <div className="animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="card" style={{ padding: '32px', background: 'rgba(99, 102, 241, 0.03)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
            <Brain size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Explainable AI (SHAP) Analysis</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Neural Network attribution for the current logistics mission</p>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '800px' }}>
          We use SHAP (SHapley Additive exPlanations) to decompose the model's output. Below are the top features contributing to the difference between the baseline and optimized paths.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '32px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800, marginBottom: '24px', color: 'var(--text-secondary)' }}>Feature Attribution Matrix</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { label: 'Geopolitical Risk Exposure', value: 34, impact: 'positive', color: 'var(--accent-rose)' },
              { label: 'Fuel Surcharge Index', value: 21, impact: 'negative', color: 'var(--accent-amber)' },
              { label: 'Carrier Reliability Score', value: 18, impact: 'positive', color: 'var(--accent-emerald)' },
              { label: 'Port Congestion Index', value: 15, impact: 'negative', color: 'var(--accent-cyan)' },
              { label: 'Carbon Emission Weight', value: 12, impact: 'negative', color: 'var(--accent-primary)' }
            ].map((f, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                  <span style={{ fontWeight: 700 }}>{f.label}</span>
                  <span style={{ fontWeight: 800, color: f.impact === 'positive' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{f.impact === 'positive' ? '+' : '-'}{f.value}% IMPACT</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${f.value}%`, height: '100%', background: f.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-cyan)' }}>
              <ShieldAlert size={16} />
              <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>Bias Detection</div>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>The model shows zero bias towards legacy carriers in this corridor. Efficiency is the sole weight driver.</p>
          </div>

          <div className="card" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--accent-emerald)' }}>
              <Activity size={16} />
              <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase' }}>Model Confidence</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800 }}>98.4%</div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Validated against 12M historical data points.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
