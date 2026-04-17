import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ShieldAlert, Activity, Zap, ArrowRight, BrainCircuit, BarChart3, Navigation } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '4rem', 
      paddingBottom: '4rem',
      color: 'var(--text-main)'
    }}>
      {/* Hero Section */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        marginTop: '3rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(10,10,12,0) 70%)',
          zIndex: -1,
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}></div>

        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '800px', letterSpacing: '-0.04em' }}>
          Autonomous <span style={{ color: 'transparent', backgroundImage: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text' }}>Supply Chain</span> Intelligence
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}>
          SWERVE predicts geopolitical disruptions, optimizes multi-modal transport routes in real-time, and safeguards global logistics using tactical intelligence.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/dashboard" className="btn btn-primary" style={{ 
            textDecoration: 'none',
            padding: '1rem 2.25rem', 
            fontSize: '1.1rem', 
            fontWeight: 800,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
            transition: 'all 0.2s'
          }}>
            Launch Command Center <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem' }}>System Architecture</h2>
          <p style={{ color: 'var(--text-muted)' }}>How SWERVE secures the global supply chain.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          
          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '0.75rem', color: 'var(--primary)', display: 'flex' }}>
                <Navigation size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Multi-modal Optimization</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
              Our routing engine calculates the mathematically perfect blend of Sea, Air, Road, and Rail segments, factoring in break-bulk costs, intermodal transfer times, and carbon footprint.
            </p>
          </div>

          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.75rem', color: 'var(--danger)', display: 'flex' }}>
                <ShieldAlert size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Global Risk Radar</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
              Real-time telemetry overlays geopolitical conflict zones, pirate corridors, and severe weather anomalies. Ships are automatically detoured before they enter high-risk waters.
            </p>
          </div>

          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '0.75rem', color: 'var(--secondary)', display: 'flex' }}>
                <BrainCircuit size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Gemini Tactical Agent</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
              Natural language incident reporting. Tell the AI what happened (e.g. "Suez Canal blocked"), and it will scan thousands of live shipments, identifying exact collateral damage and calculating escape routes.
            </p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        marginTop: '2rem', 
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(139, 92, 246, 0.2))', 
        borderRadius: 'var(--radius-lg)', 
        padding: '4rem 2rem', 
        textAlign: 'center',
        border: '1px solid var(--border-focus)'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to deploy?</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
           Initialize the simulation and watch the logistics engine route freight dynamically under stress.
        </p>
        <Link to="/simulation" className="btn btn-primary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 700, borderRadius: 'var(--radius-md)' }}>
          Start Live Simulation
        </Link>
      </section>

    </div>
  );
};

export default LandingPage;
