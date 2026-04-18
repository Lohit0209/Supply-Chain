import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Navigation2, Globe, ChevronDown } from 'lucide-react';
import { HUBS } from '../data/logisticsData';

const SearchDropdown = ({ value, onChange, placeholder, icon: Icon, color, onSearch }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredHubs = HUBS.filter(hub => 
    hub.city.toLowerCase().includes(query.toLowerCase()) || 
    hub.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color }}>
        <Icon size={18} />
      </div>
      <input 
        type="text" 
        placeholder={placeholder} 
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
            setIsOpen(false);
          }
        }}
        style={{ 
          background: 'transparent', border: 'none', color: '#fff', 
          fontSize: 14, fontWeight: 700, padding: '12px 32px', width: '100%',
          outline: 'none', borderBottom: isOpen ? `1px solid ${color}` : '1px solid var(--border-dim)',
          transition: 'border-color 0.2s'
        }}
      />
      <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', opacity: isOpen ? 0 : 1 }}>
        <ChevronDown size={14} />
      </div>

      {isOpen && filteredHubs.length > 0 && (
        <div style={{ 
          position: 'absolute', top: '100%', left: 0, right: 0, 
          background: 'var(--bg-card)', border: '1px solid var(--border-bright)',
          borderRadius: 8, marginTop: 4, zIndex: 2000, maxHeight: 300, overflowY: 'auto',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)'
        }}>
          {filteredHubs.map((hub, idx) => (
            <div 
              key={idx}
              onClick={() => {
                onChange(hub.city);
                setQuery(hub.city);
                setIsOpen(false);
              }}
              style={{ 
                padding: '12px 16px', cursor: 'pointer', display: 'flex', 
                justifyContent: 'space-between', alignItems: 'center',
                borderBottom: idx === filteredHubs.length - 1 ? 'none' : '1px solid var(--border-dim)'
              }}
              className="hover:bg-white/5"
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{hub.city}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{hub.country}</div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {hub.lat.toFixed(2)}, {hub.lng.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TopSearchBar = ({ params, setParams, onSearch }: any) => {
  return (
    <div style={{ background: 'var(--bg-deep)', padding: '20px 40px', borderBottom: '1px solid var(--border-dim)' }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <SearchDropdown 
          value={params.originCity}
          onChange={(val: string) => setParams({ ...params, originCity: val })}
          placeholder="Origin City..."
          icon={MapPin}
          color="var(--accent-primary)"
          onSearch={onSearch}
        />

        <div style={{ color: 'var(--text-dim)' }}>
           <Navigation2 size={16} style={{ transform: 'rotate(90deg)' }} />
        </div>

        <SearchDropdown 
          value={params.destCity}
          onChange={(val: string) => setParams({ ...params, destCity: val })}
          placeholder="Destination City..."
          icon={Globe}
          color="var(--accent-emerald)"
          onSearch={onSearch}
        />

        <button 
          onClick={() => onSearch()}
          className="btn-premium"
          style={{ padding: '12px 32px', borderRadius: 12, fontSize: 11 }}
        >
          <Search size={16} /> COMPUTE LOGISTICS
        </button>
      </div>
    </div>
  );
};
