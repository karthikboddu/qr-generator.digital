import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import QRCodeStyling from 'qr-code-styling';
import { detectTheme } from '../utils/detectTheme';
import { aiThemes } from '../data/aiThemes';
import { Sparkles, Wand2, Download, Save, Loader2, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

export const PRESETS = [
  {
    name: 'Neon Gaming',
    prompt: 'Neon gaming style with bright green and magenta',
    theme: 'gaming_fire',
    image: '🎮',
    category: 'Gaming',
  },

  {
    name: 'Luxury Gold',
    prompt: 'Premium luxury gold design on black background',
    theme: 'luxury_gold',
    image: '✨',
    category: 'Luxury',
  },

  {
    name: 'Anime Pink',
    prompt: 'Cute anime pink floral wedding style',
    theme: 'anime_pink',
    image: '🌸',
    category: 'Anime',
  },

  {
    name: 'Hacker Matrix',
    prompt: 'Cyberpunk hacker matrix tech style',
    theme: 'hacker_matrix',
    image: '💻',
    category: 'Tech',
  },

  {
    name: 'Retro Vintage',
    prompt: 'Classic retro vintage cafe style',
    theme: 'retro_vintage',
    image: '📻',
    category: 'Vintage',
  },

  {
    name: 'Coffee Shop',
    prompt: 'Warm minimal coffee shop style',
    theme: 'coffee_shop',
    image: '☕',
    category: 'Food',
  },

  {
    name: 'Crypto Tech',
    prompt: 'Modern crypto blockchain tech',
    theme: 'crypto_dark',
    image: '₿',
    category: 'Crypto',
  },

  {
    name: 'Ocean Breeze',
    prompt: 'Deep sea ocean breeze with cyan and blue',
    theme: 'ocean_blue',
    image: '🌊',
    category: 'Nature',
  },

  {
    name: 'Galaxy Space',
    prompt: 'Deep galaxy purple and silver stars',
    theme: 'galaxy_space',
    image: '🌌',
    category: 'Sci-Fi',
  },

  {
    name: 'Sunset Vibe',
    prompt: 'Warm twilight sunset with orange and red',
    theme: 'sunset_glow',
    image: '🌅',
    category: 'Nature',
  },

  {
    name: 'Synthwave',
    prompt: '80s synthwave neon purple and pink',
    theme: 'synthwave_neon',
    image: '🌆',
    category: 'Retro',
  },

  {
    name: 'Instagram Creator',
    prompt: 'Instagram influencer pink purple gradient style',
    theme: 'instagram_gradient',
    image: '📸',
    category: 'Social',
  },

  {
    name: 'WhatsApp Business',
    prompt: 'Professional WhatsApp green business style',
    theme: 'whatsapp_green',
    image: '💬',
    category: 'Business',
  },

  {
    name: 'YouTube Creator',
    prompt: 'YouTube red creator channel branding style',
    theme: 'youtube_red',
    image: '▶️',
    category: 'Social',
  },

  {
    name: 'Spotify Music',
    prompt: 'Dark spotify music playlist qr style',
    theme: 'spotify_music',
    image: '🎵',
    category: 'Music',
  },

  {
    name: 'Wedding Floral',
    prompt: 'Elegant floral wedding invitation design',
    theme: 'wedding_floral',
    image: '💐',
    category: 'Wedding',
  },

  {
    name: 'Corporate Blue',
    prompt: 'Professional clean corporate business blue style',
    theme: 'business_corporate',
    image: '🏢',
    category: 'Business',
  },

  {
    name: 'Futuristic AI',
    prompt: 'AI futuristic glowing cyan technology design',
    theme: 'futuristic_ai',
    image: '🤖',
    category: 'AI',
  },

  {
    name: 'Festival Holi',
    prompt: 'Indian holi colorful vibrant festival style',
    theme: 'festival_holi',
    image: '🎨',
    category: 'Festival',
  },

  {
    name: 'Luxury Black',
    prompt: 'Elegant premium black and white luxury branding',
    theme: 'luxury_black',
    image: '🖤',
    category: 'Luxury',
  },

  {
    name: 'Minimal White',
    prompt: 'Simple clean white minimal modern design',
    theme: 'minimal',
    image: '⚪',
    category: 'Minimal',
  },

  {
    name: 'Cyberpunk Neon',
    prompt: 'Cyberpunk futuristic glowing neon purple style',
    theme: 'cyberpunk_neon',
    image: '⚡',
    category: 'Gaming',
  },

  {
    name: 'Dark Mode Pro',
    prompt: 'Dark professional premium UI inspired design',
    theme: 'dark_pro',
    image: '🌑',
    category: 'Professional',
  },

  {
    name: 'Royal Purple',
    prompt: 'Royal premium purple gold luxury style',
    theme: 'royal_purple',
    image: '👑',
    category: 'Luxury',
  },

  {
    name: 'Ice Crystal',
    prompt: 'Frozen icy crystal blue modern theme',
    theme: 'ice_crystal',
    image: '❄️',
    category: 'Nature',
  },

  {
    name: 'Valentine Love',
    prompt: 'Cute romantic pink red love style',
    theme: 'valentine_love',
    image: '❤️',
    category: 'Romantic',
  },

  {
    name: 'Tech Startup',
    prompt: 'Modern startup saas tech branding style',
    theme: 'startup_modern',
    image: '🚀',
    category: 'Startup',
  },

  {
    name: 'Eco Green',
    prompt: 'Eco friendly green sustainable branding style',
    theme: 'eco_green',
    image: '🌿',
    category: 'Eco',
  },

  {
    name: 'Luxury Restaurant',
    prompt: 'Fine dining luxury restaurant qr design',
    theme: 'restaurant_luxury',
    image: '🍽️',
    category: 'Restaurant',
  },

  {
    name: 'Travel Adventure',
    prompt: 'Adventure travel explorer world map vibes',
    theme: 'travel_adventure',
    image: '✈️',
    category: 'Travel',
  },

  {
    name: 'Kids Cartoon',
    prompt: 'Cute colorful cartoon children playful style',
    theme: 'kids_cartoon',
    image: '🧸',
    category: 'Kids',
  },
];

function ThemeModal({ isOpen, onClose, presets, onSelect }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-5xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0f172a] z-10 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={20} />
              AI Theme Gallery
            </h3>
            <p className="text-sm text-gray-400 mt-1">Select a beautifully pre-designed AI aesthetic for your QR code.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto no-scrollbar" style={{ maxHeight: 'calc(85vh - 85px)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {presets.map((preset, idx) => (
              <MiniQRPreview
                key={idx}
                themeName={preset.theme}
                presetName={preset.name}
                onClick={() => {
                  onSelect(preset);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

const MiniQRPreview = ({ themeName, presetName, onClick }) => {
  const ref = useRef(null);

  useEffect(() => {
    const theme = aiThemes[themeName] || aiThemes.minimal;
    const qr = new QRCodeStyling({
      width: 70,
      height: 70,
      data: "preview",
      margin: 2,
      dotsOptions: {
        color: theme.dotsColor,
        type: theme.dotStyle || "rounded",
      },
      backgroundOptions: {
        color: theme.backgroundColor,
      },
      cornersSquareOptions: {
        color: theme.cornerColor,
        type: theme.frame === 'minimal' ? 'square' : 'extra-rounded'
      },
      cornersDotOptions: {
        color: theme.cornerColor,
        type: theme.dotStyle === 'dots' ? 'dot' : 'square'
      }
    });

    if (ref.current) {
      ref.current.innerHTML = '';
      qr.append(ref.current);
    }
  }, [themeName]);

  return (
    <button
      onClick={onClick}
      title={`Generate ${presetName} AI QR Code`}
      aria-label={`Apply ${presetName} AI Style Template`}
      className="flex flex-col items-center justify-between gap-2 p-3 bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.06)] hover:border-indigo-500/50 border border-[rgba(255,255,255,0.05)] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="bg-white/5 p-1.5 rounded-lg shadow-inner">
        <div ref={ref} className="rounded-md overflow-hidden pointer-events-none" />
      </div>
      <span className="text-[11px] font-semibold text-gray-300 text-center w-full truncate tracking-wide">{presetName}</span>
    </button>
  );
};

export default function AIPromptBox({ qrValue = "https://example.com" }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('minimal');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const qrRef = useRef(null);
  const qrCodeInstance = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    qrCodeInstance.current = new QRCodeStyling({
      width: 300,
      height: 300,
      data: qrValue || 'https://example.com',
      margin: 10,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q"
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 0
      },
      dotsOptions: {
        type: "rounded",
        color: "#000000"
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#000000"
      },
      cornersDotOptions: {
        type: "dot",
        color: "#000000"
      }
    });

    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCodeInstance.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({ data: qrValue || 'https://example.com' });
    }
  }, [qrValue]);

  const applyTheme = (themeName) => {
    const theme = aiThemes[themeName] || aiThemes.minimal;
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        dotsOptions: {
          color: theme.dotsColor,
          type: theme.dotStyle || "rounded",
        },
        backgroundOptions: {
          color: theme.backgroundColor,
        },
        cornersSquareOptions: {
          color: theme.cornerColor,
          type: theme.frame === 'minimal' ? 'square' : 'extra-rounded'
        },
        cornersDotOptions: {
          color: theme.cornerColor,
          type: theme.dotStyle === 'dots' ? 'dot' : 'square'
        }
      });
    }
    setCurrentTheme(themeName);
  };

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);

    // Simulate AI parsing delay for better UX
    setTimeout(() => {
      const detected = detectTheme(prompt);
      applyTheme(detected);
      setIsGenerating(false);
    }, 800);
  };

  const handlePresetClick = (preset) => {
    setPrompt(preset.prompt);
    applyTheme(preset.theme);
  };

  const handleDownload = () => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download({ name: `ai-qr-${currentTheme}`, extension: "png" });
    }
  };

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save your AI QR codes.");
      return;
    }

    setIsSaving(true);
    try {
      // Get Blob from canvas
      const canvas = qrRef.current.querySelector('canvas');
      if (!canvas) throw new Error("Canvas not found");

      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const fileName = `${user.id}/${Date.now()}_ai_qr.png`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ai_qr_codes')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('ai_qr_codes')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('ai_qr_codes')
        .insert({
          user_id: user.id,
          prompt: prompt,
          theme: currentTheme,
          qr_data: qrValue,
          image_url: publicUrlData.publicUrl
        });

      if (insertError) throw insertError;
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Error saving AI QR:", error);
      // Optional: Could add an error state here instead of alert, but silent fail to console is also an option if alerts are unwanted.
    } finally {
      setIsSaving(false);
    }
  };

  const previewContent = (
    <div className="w-full flex flex-col items-center justify-center p-6 bg-[var(--bg-card)] rounded-xl border border-[rgba(255,255,255,0.08)] relative overflow-hidden group shadow-xl">
      {/* Glow effect behind QR */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl transition-colors duration-500"
        style={{ background: aiThemes[currentTheme]?.cornerColor || '#6366f1' }}
      />

      <div className="flex items-center gap-2 mb-4 z-10">
        <div className="w-6 h-6 rounded-md bg-indigo-500/15 flex items-center justify-center">
          <span className="font-extrabold text-[10px] text-indigo-400">AI</span>
        </div>
        <h4 className="text-sm font-medium text-gray-200">AI QR Preview</h4>
      </div>

      <div
        ref={qrRef}
        className="bg-transparent rounded-xl shadow-2xl relative z-10 transition-transform hover:scale-105 duration-300"
      />

      <div className="mt-6 flex flex-col w-full gap-3 z-10">
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg"
        >
          <Download size={18} />
          Download QR Code
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold transition-all border disabled:opacity-50 ${
            isSaved 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
          }`}
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : (isSaved ? <Check size={16} /> : <Save size={16} />)}
          {isSaving ? 'Saving...' : (isSaved ? 'Saved!' : 'Save to Dashboard')}
        </button>
      </div>
    </div>
  );

  const portalTarget = document.getElementById('ai-preview-portal-target');

  return (
    <div className="flex flex-col gap-6 p-6 bg-[var(--bg-card)] rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-xl">
      {/* LEFT PANEL: Controls */}
      <div className="w-full space-y-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 mb-2 text-white">
            <Sparkles className="text-indigo-400" size={24} />
            AI QR Code Generator
          </h2>
          <p className="text-sm text-gray-400">
            Generate custom AI QR codes from text prompts. Describe the aesthetic you want, and our AI will instantly create a beautiful, scannable QR code design.
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Neon gaming style with bright green and magenta..."
            className="w-full min-h-[100px] p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/25"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Generate Style
              </>
            )}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              AI Theme Gallery
            </h3>
            <button 
              onClick={() => setIsModalOpen(true)}
              aria-label="View all AI QR Code templates"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-md border border-indigo-500/20"
            >
              View All ({PRESETS.length})
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRESETS.slice(0, 8).map((preset, idx) => (
              <MiniQRPreview
                key={idx}
                themeName={preset.theme}
                presetName={preset.name}
                onClick={() => handlePresetClick(preset)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Preview via Portal */}
      {portalTarget ? createPortal(previewContent, portalTarget) : previewContent}
      
      <ThemeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        presets={PRESETS} 
        onSelect={handlePresetClick} 
      />
    </div>
  );
}
