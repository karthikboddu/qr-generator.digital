import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { fetchQRAnalytics, toggleDynamicQR, updateDynamicQRDestination } from '../lib/dynamicQR';
import Seo from '../components/Seo';
import {
  QrCode, Eye, TrendingUp, Activity, BarChart2, Smartphone, Monitor, Globe,
  Pause, Play, Edit2, Check, X, ExternalLink, Share2, Copy, Plus, Trash2,
  Calendar, Zap, ChevronRight, AlertCircle, Wifi, User, Link, MessageCircle,
} from 'lucide-react';

/* ======= Mini bar chart ======= */
function MiniBarChart({ data, color = '#6366f1', height = 48 }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height }}>
      {data.map((d, i) => (
        <div
          key={i}
          title={`${d.date}: ${d.count} scans`}
          style={{
            flex: 1,
            height: `${Math.max((d.count / max) * 100, 2)}%`,
            background: d.count > 0 ? color : 'rgba(255,255,255,0.06)',
            borderRadius: '2px 2px 0 0',
            transition: 'height 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

/* ======= Stat card ======= */
function StatCard({ icon: Icon, label, value, color, trend }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px',
      padding: '20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </p>
        <p style={{ fontSize: '28px', fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#f0f0f8', margin: 0 }}>
          {value}
        </p>
        {trend !== undefined && (
          <p style={{ fontSize: '11px', color: trend >= 0 ? '#4ade80' : '#f87171', margin: '4px 0 0' }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
          </p>
        )}
      </div>
      <div style={{
        width: 44, height: 44, borderRadius: '11px',
        background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={20} color={color} />
      </div>
    </div>
  );
}

/* ======= Breakdown bar ======= */
function BreakdownBar({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0f8' }}>{pct}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: color || 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          borderRadius: 99,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
}

/* ======= Inline URL editor ======= */
function InlineEdit({ value, onSave, label = 'Destination URL' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const handleSave = () => {
    if (draft.trim()) {
      onSave(draft.trim());
      setEditing(false);
    }
  };

  if (!editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {value}
        </span>
        <button
          onClick={() => { setDraft(value); setEditing(true); }}
          className="btn-ghost"
          style={{ padding: '4px 8px', fontSize: '11px', flexShrink: 0 }}
        >
          <Edit2 size={11} /> Edit URL
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="url"
        value={draft}
        onChange={e => setDraft(e.target.value)}
        autoFocus
        className="dark-input"
        style={{ fontSize: '13px', padding: '8px 12px' }}
        placeholder="https://example.com"
        onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false); }}
      />
      <button onClick={handleSave} className="btn-primary" style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '8px', flexShrink: 0 }}>
        <Check size={13} /> Save
      </button>
      <button onClick={() => setEditing(false)} className="btn-ghost" style={{ padding: '8px', flexShrink: 0 }}>
        <X size={13} />
      </button>
    </div>
  );
}

/* ======= Analytics Modal ======= */
function AnalyticsModal({ qr, onClose }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQRAnalytics(qr.id);
        setAnalytics(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [qr.id]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '20px',
          padding: '32px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '18px', color: '#f0f0f8', margin: 0 }}>
              {qr.title} — Analytics
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 0' }}>
              Scan performance overview
            </p>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '8px 12px' }}>
            <X size={16} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ width: 32, height: 32, border: '3px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Total */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px,1fr))', gap: '12px',
            }}>
              <div style={{ background: 'rgba(99,102,241,0.08)', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid rgba(99,102,241,0.2)' }}>
                <p style={{ fontSize: '32px', fontFamily: 'Outfit', fontWeight: 800, color: '#6366f1', margin: 0 }}>{analytics.total}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Total Scans</p>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.08)', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid rgba(16,185,129,0.2)' }}>
                <p style={{ fontSize: '32px', fontFamily: 'Outfit', fontWeight: 800, color: '#10b981', margin: 0 }}>
                  {analytics.timeline.filter(d => {
                    const today = new Date();
                    const dDate = new Date(d.date);
                    const diffDays = (today - dDate) / (1000 * 60 * 60 * 24);
                    return diffDays <= 7;
                  }).reduce((s, d) => s + d.count, 0)}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Last 7 Days</p>
              </div>
              <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '12px', padding: '16px', textAlign: 'center', border: '1px solid rgba(139,92,246,0.2)' }}>
                <p style={{ fontSize: '32px', fontFamily: 'Outfit', fontWeight: 800, color: '#8b5cf6', margin: 0 }}>
                  {analytics.timeline[analytics.timeline.length - 1]?.count || 0}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Today</p>
              </div>
            </div>

            {/* Timeline chart */}
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0f8', margin: '0 0 16px' }}>Scans — Last 30 Days</p>
              <MiniBarChart data={analytics.timeline} color="#6366f1" height={80} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>30 days ago</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Today</span>
              </div>
            </div>

            {/* Breakdowns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px' }}>
              {/* Device */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                  <Smartphone size={14} color="#6366f1" />
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0f8', margin: 0 }}>Device</p>
                </div>
                {Object.entries(analytics.deviceBreakdown).map(([k, v]) => (
                  <BreakdownBar key={k} label={k} value={v} total={analytics.total} color="#6366f1" />
                ))}
                {Object.keys(analytics.deviceBreakdown).length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No data yet</p>
                )}
              </div>

              {/* Browser */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
                  <Globe size={14} color="#8b5cf6" />
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0f8', margin: 0 }}>Browser</p>
                </div>
                {Object.entries(analytics.browserBreakdown).map(([k, v]) => (
                  <BreakdownBar key={k} label={k} value={v} total={analytics.total} color="#8b5cf6" />
                ))}
                {Object.keys(analytics.browserBreakdown).length === 0 && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No data yet</p>
                )}
              </div>
            </div>

            {analytics.total === 0 && (
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(99,102,241,0.05)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.1)' }}>
                <Activity size={24} color="#6366f1" style={{ margin: '0 auto 8px', display: 'block' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                  No scans recorded yet. Share your QR code to start tracking!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ======= Main Dashboard ======= */
function Dashboard() {
  const { user } = useAuth();
  const [staticQRs, setStaticQRs] = useState([]);
  const [dynamicQRs, setDynamicQRs] = useState([]);
  const [socialHubs, setSocialHubs] = useState([]);
  const [stats, setStats] = useState({ totalQRs: 0, totalScans: 0, dynamicQRs: 0, thisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dynamic'); // 'dynamic' | 'static' | 'hubs'
  const [copiedId, setCopiedId] = useState(null);
  const [analyticsModal, setAnalyticsModal] = useState(null); // dynamic QR for analytics

  useEffect(() => {
    if (!user) return;
    loadAll();
  }, [user]);

  const loadAll = async () => {
    setLoading(true);
    try {
      // Static QRs
      const { data: staticData } = await supabase
        .from('qr_codes')
        .select('id, content_type, content_data, created_at, image_url')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Dynamic QRs
      const { data: dynamicData } = await supabase
        .from('dynamic_qrs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Social Hubs
      const { data: hubData } = await supabase
        .from('social_hubs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setStaticQRs(staticData || []);
      setDynamicQRs(dynamicData || []);
      setSocialHubs(hubData || []);

      const totalScans = (dynamicData || []).reduce((s, q) => s + (q.scan_count || 0), 0);
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonth = [...(staticData || []), ...(dynamicData || [])].filter(q => new Date(q.created_at) >= startOfMonth).length;

      setStats({
        totalQRs: (staticData?.length || 0) + (dynamicData?.length || 0),
        totalScans,
        dynamicQRs: dynamicData?.length || 0,
        thisMonth,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDynamic = async (qr) => {
    try {
      const updated = await toggleDynamicQR(qr.id, !qr.is_active);
      setDynamicQRs(prev => prev.map(q => q.id === qr.id ? updated : q));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateDestination = async (qr, newUrl) => {
    try {
      const updated = await updateDynamicQRDestination(qr.id, newUrl);
      setDynamicQRs(prev => prev.map(q => q.id === qr.id ? updated : q));
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  const TABS = [
    { id: 'dynamic', label: 'Dynamic QRs', count: dynamicQRs.length, icon: Zap },
    { id: 'static', label: 'Static QRs', count: staticQRs.length, icon: QrCode },
    { id: 'hubs', label: 'Social Hubs', count: socialHubs.length, icon: Globe },
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title="Dashboard" description="Manage your dynamic QR codes, scan analytics, and social hubs." path="/dashboard" robots="noindex,nofollow" />

      {analyticsModal && (
        <AnalyticsModal qr={analyticsModal} onClose={() => setAnalyticsModal(null)} />
      )}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Page header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 36px)', color: '#f0f0f8', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
            Track QR performance, manage dynamic codes, and analyze scans
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon={QrCode} label="Total QR Codes" value={stats.totalQRs} color="#6366f1" />
          <StatCard icon={Eye} label="Total Scans" value={stats.totalScans} color="#06b6d4" />
          <StatCard icon={Zap} label="Dynamic QRs" value={stats.dynamicQRs} color="#8b5cf6" />
          <StatCard icon={TrendingUp} label="Created This Month" value={stats.thisMonth} color="#10b981" />
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '4px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '24px',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 16px',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                background: 'transparent',
                color: activeTab === tab.id ? '#6366f1' : 'var(--text-secondary)',
                fontSize: '14px', fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer', transition: 'all 0.15s',
                borderRadius: '0',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <tab.icon size={14} />
              {tab.label}
              <span style={{
                fontSize: '11px', padding: '1px 7px', borderRadius: '99px',
                background: activeTab === tab.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.07)',
                color: activeTab === tab.id ? '#6366f1' : 'var(--text-muted)',
              }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* === DYNAMIC QRs TAB === */}
        {activeTab === 'dynamic' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                Dynamic QRs can be edited, paused, and tracked after printing.
              </p>
              <a href="/" className="btn-primary" style={{ textDecoration: 'none', padding: '9px 16px', fontSize: '13px' }}>
                <Plus size={14} /> New Dynamic QR
              </a>
            </div>

            {dynamicQRs.length === 0 ? (
              <div style={{
                background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '48px', textAlign: 'center',
              }}>
                <Zap size={40} color="#6366f1" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.5 }} />
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#f0f0f8', marginBottom: '8px' }}>No Dynamic QRs Yet</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  Create a Dynamic QR to track scans and edit the destination after printing.
                </p>
                <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Create Dynamic QR →
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {dynamicQRs.map(qr => {
                  const redirectUrl = `${window.location.origin}/r/${qr.short_id}`;
                  return (
                    <div
                      key={qr.id}
                      style={{
                        background: 'var(--bg-card)',
                        border: `1px solid ${qr.is_active ? 'rgba(255,255,255,0.08)' : 'rgba(239,68,68,0.2)'}`,
                        borderRadius: '14px',
                        padding: '20px',
                        transition: 'all 0.2s',
                        opacity: qr.is_active ? 1 : 0.7,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        {/* Status dot */}
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: qr.is_active ? '#4ade80' : '#ef4444',
                          flexShrink: 0, marginTop: '5px',
                          boxShadow: qr.is_active ? '0 0 8px rgba(74,222,128,0.5)' : '0 0 8px rgba(239,68,68,0.4)',
                        }} />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <h3 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '15px', color: '#f0f0f8', margin: 0 }}>
                              {qr.title}
                            </h3>
                            <span className="badge badge-purple" style={{ fontSize: '10px' }}>{qr.qr_type}</span>
                            {!qr.is_active && (
                              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '99px', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                                Paused
                              </span>
                            )}
                          </div>

                          {/* Editable destination */}
                          <div style={{ marginBottom: '12px' }}>
                            <InlineEdit
                              value={qr.destination_url}
                              onSave={(url) => handleUpdateDestination(qr, url)}
                            />
                          </div>

                          {/* Redirect URL */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                              QR → {redirectUrl}
                            </span>
                            <button
                              onClick={() => copyToClipboard(redirectUrl, qr.id + '-url')}
                              className="btn-ghost"
                              style={{ padding: '3px 8px', fontSize: '10px' }}
                            >
                              {copiedId === qr.id + '-url' ? <Check size={10} /> : <Copy size={10} />}
                              {copiedId === qr.id + '-url' ? 'Copied!' : 'Copy'}
                            </button>
                          </div>

                          {/* Stats row */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                              <Eye size={13} /> {qr.scan_count || 0} scans
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              Created {formatDate(qr.created_at)}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={() => setAnalyticsModal(qr)}
                            className="btn-secondary"
                            style={{ padding: '7px 12px', fontSize: '12px', borderRadius: '8px' }}
                          >
                            <BarChart2 size={12} /> Analytics
                          </button>
                          <button
                            onClick={() => handleToggleDynamic(qr)}
                            className="btn-ghost"
                            style={{
                              padding: '7px 12px', fontSize: '12px', borderRadius: '8px',
                              color: qr.is_active ? '#f87171' : '#4ade80',
                            }}
                          >
                            {qr.is_active ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* === STATIC QRs TAB === */}
        {activeTab === 'static' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {staticQRs.length === 0 ? (
              <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
                <QrCode size={40} color="#6366f1" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.5 }} />
                <p style={{ color: 'var(--text-secondary)' }}>No QR codes saved yet.</p>
                <a href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: '16px' }}>
                  Create QR Code →
                </a>
              </div>
            ) : (
              staticQRs.map(qr => (
                <div key={qr.id} style={{
                  background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                }}>
                  {qr.image_url && (
                    <img src={qr.image_url} alt="" style={{ width: 48, height: 48, borderRadius: '8px', objectFit: 'cover', background: '#fff', flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="badge badge-purple" style={{ marginBottom: '6px', display: 'inline-flex' }}>{qr.content_type}</span>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {qr.content_data}
                    </p>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{formatDate(qr.created_at)}</p>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/qr/${qr.id}`, qr.id)}
                      className="btn-ghost"
                      style={{ fontSize: '11px', padding: '4px 8px', marginTop: '6px' }}
                    >
                      {copiedId === qr.id ? <><Check size={10} /> Copied</> : <><Share2 size={10} /> Share</>}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* === SOCIAL HUBS TAB === */}
        {activeTab === 'hubs' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                Share all your links in one QR code — like a personal Linktree.
              </p>
              <a href="/?tab=social-hub" className="btn-primary" style={{ textDecoration: 'none', padding: '9px 16px', fontSize: '13px' }}>
                <Plus size={14} /> New Hub
              </a>
            </div>

            {socialHubs.length === 0 ? (
              <div style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
                <Globe size={40} color="#6366f1" style={{ margin: '0 auto 16px', display: 'block', opacity: 0.5 }} />
                <h3 style={{ fontFamily: 'Outfit', fontWeight: 700, color: '#f0f0f8', marginBottom: '8px' }}>No Social Hubs Yet</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  Create a social hub to share all your links with one QR code.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {socialHubs.map(hub => {
                  const hubUrl = `${window.location.origin}/hub/${hub.short_id}`;
                  const links = Array.isArray(hub.links) ? hub.links : [];
                  return (
                    <div key={hub.id} style={{
                      background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px', padding: '20px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '10px',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <span style={{ fontWeight: 800, color: '#fff', fontSize: '16px' }}>{hub.title.charAt(0)}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '15px', color: '#f0f0f8', margin: 0 }}>{hub.title}</h3>
                          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>{links.length} links • {hub.scan_count || 0} scans</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <a href={hubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '7px 12px', fontSize: '12px', textDecoration: 'none' }}>
                            <ExternalLink size={12} /> Preview
                          </a>
                          <button onClick={() => copyToClipboard(hubUrl, hub.id)} className="btn-secondary" style={{ padding: '7px 12px', fontSize: '12px', borderRadius: '8px' }}>
                            {copiedId === hub.id ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy Link</>}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
