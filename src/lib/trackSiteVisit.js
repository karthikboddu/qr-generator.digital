import { supabase } from '../supabaseClient';

const TRACKING_FLAG = '__qrGenVisitTracked';

export async function trackSiteVisit() {
  if (typeof window === 'undefined') {
    return;
  }

  if (window[TRACKING_FLAG]) {
    return;
  }

  window[TRACKING_FLAG] = true;

  const path = window.location.pathname || '/';
  const referrer = document.referrer || null;

  try {
    const { error } = await supabase.functions.invoke('track-site-visit', {
      body: { path, referrer },
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Failed to track site visit:', error);
  }
}
