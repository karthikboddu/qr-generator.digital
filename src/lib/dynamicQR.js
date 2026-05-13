import { supabase } from '../supabaseClient';

/**
 * Generate a short random ID (6-8 chars) for dynamic QR codes & social hubs
 */
export function generateShortId(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Detect device type from user agent
 */
export function detectDevice(ua = navigator.userAgent) {
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  return 'desktop';
}

/**
 * Detect browser from user agent
 */
export function detectBrowser(ua = navigator.userAgent) {
  if (/Chrome/i.test(ua) && !/Edge/i.test(ua)) return 'Chrome';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Edge/i.test(ua)) return 'Edge';
  if (/MSIE|Trident/i.test(ua)) return 'IE';
  return 'Other';
}

/**
 * Detect OS from user agent
 */
export function detectOS(ua = navigator.userAgent) {
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad/i.test(ua)) return 'iOS';
  if (/Mac/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Other';
}

/**
 * Create a new Dynamic QR code
 */
export async function createDynamicQR({
  userId,
  title,
  destinationUrl,
  customization,
  imageUrl,
  qrType = 'url',
  expiresAt = null,
  accessPassword = '',
  redirectRules = null,
  leadCaptureEnabled = false,
  leadCaptureTitle = '',
  leadCaptureMessage = '',
  leadCaptureFields = []
}) {
  const shortId = generateShortId();
  const payload = {
    user_id: userId,
    short_id: shortId,
    title,
    destination_url: destinationUrl,
    customization_options: customization,
    image_url: imageUrl,
    qr_type: qrType,
    expires_at: expiresAt || null,
  };

  if (accessPassword) payload.access_password = accessPassword;
  if (redirectRules) payload.redirect_rules = redirectRules;
  if (leadCaptureEnabled) {
    payload.lead_capture_enabled = true;
    payload.lead_capture_title = leadCaptureTitle;
    payload.lead_capture_message = leadCaptureMessage;
    payload.lead_capture_fields = leadCaptureFields;
  }

  const { data, error } = await supabase.from('dynamic_qrs').insert(payload).select().single();

  if (error) throw error;
  return data;
}

/**
 * Update a Dynamic QR code's destination URL
 */
export async function updateDynamicQRDestination(id, destinationUrl) {
  const { data, error } = await supabase
    .from('dynamic_qrs')
    .update({ destination_url: destinationUrl, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Increment scan count by short ID. This relies on the Supabase migration RPC.
 */
export async function incrementDynamicQRScanCount(shortId) {
  const { error } = await supabase.rpc('increment_dynamic_qr_scans', { qr_short_id: shortId });
  if (error) throw error;
}

/**
 * Increment social hub scan count by short ID. This relies on the Supabase migration RPC.
 */
export async function incrementSocialHubScanCount(shortId) {
  const { error } = await supabase.rpc('increment_social_hub_scans', { hub_short_id: shortId });
  if (error) throw error;
}

/**
 * Toggle active/paused state
 */
export async function toggleDynamicQR(id, isActive) {
  const { data, error } = await supabase
    .from('dynamic_qrs')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Log a scan event for analytics
 */
export async function logScanEvent(dynamicQrId) {
  try {
    const ua = navigator.userAgent;
    await supabase.from('qr_scan_events').insert({
      dynamic_qr_id: dynamicQrId,
      user_agent: ua,
      device_type: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      referrer: document.referrer || null,
    });
  } catch (err) {
    console.error('Failed to log scan event:', err);
  }
}

/**
 * Fetch scan analytics for a dynamic QR
 */
export async function fetchQRAnalytics(dynamicQrId) {
  const { data, error } = await supabase
    .from('qr_scan_events')
    .select('*')
    .eq('dynamic_qr_id', dynamicQrId)
    .order('scanned_at', { ascending: false });

  if (error) throw error;

  // Process analytics
  const total = data.length;
  const deviceBreakdown = {};
  const browserBreakdown = {};
  const osBreakdown = {};
  const dailyCounts = {};

  data.forEach(scan => {
    // Device
    const dev = scan.device_type || 'unknown';
    deviceBreakdown[dev] = (deviceBreakdown[dev] || 0) + 1;

    // Browser
    const br = scan.browser || 'unknown';
    browserBreakdown[br] = (browserBreakdown[br] || 0) + 1;

    // OS
    const os = scan.os || 'unknown';
    osBreakdown[os] = (osBreakdown[os] || 0) + 1;

    // Daily
    const day = new Date(scan.scanned_at).toLocaleDateString('en-CA');
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });

  // Build last 30 days timeline
  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toLocaleDateString('en-CA');
    last30Days.push({ date: key, count: dailyCounts[key] || 0 });
  }

  return {
    total,
    deviceBreakdown,
    browserBreakdown,
    osBreakdown,
    timeline: last30Days,
    recent: data.slice(0, 20),
  };
}

/**
 * Fetch lead / RSVP submissions for a dynamic QR.
 */
export async function fetchLeadSubmissions(dynamicQrId) {
  const { data, error } = await supabase
    .from('lead_submissions')
    .select('*')
    .eq('dynamic_qr_id', dynamicQrId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Create a Social Hub (Linktree-style page)
 */
export async function createSocialHub({ userId, title, bio, links, theme = 'dark' }) {
  const shortId = generateShortId(7);
  const { data, error } = await supabase
    .from('social_hubs')
    .insert({
      user_id: userId,
      short_id: shortId,
      title,
      bio,
      links,
      theme,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update social hub
 */
export async function updateSocialHub(id, updates) {
  const { data, error } = await supabase
    .from('social_hubs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
