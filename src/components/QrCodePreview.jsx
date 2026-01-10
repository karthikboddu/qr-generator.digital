import React, { useRef,useState } from 'react';
import QRCode from 'react-qr-code';
import { toPng, toSvg, toCanvas } from 'html-to-image';
import { Download, ScanLine,Check, Save,Share2 } from 'lucide-react';
import { cn } from '../lib/utils';
import JSZip from 'jszip';
import { useAuth } from '../context/AuthContext';

function QrCodePreview({ value, customization, activeTab,  onSave, isSaving, savedQrId }) {
  const qrRef = useRef(null);
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const downloadFile = (dataUrl, extension) => {
    const link = document.createElement('a');
    link.download = `qr-code-${activeTab || 'custom'}.${extension}`;
    link.href = dataUrl;
    link.click();
  };

  const handleDownloadPNG = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true, pixelRatio: 4 });
      downloadFile(dataUrl, 'png');
    } catch (err) {
      console.error('Failed to download PNG', err);
    }
  };

  const handleDownloadSVG = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toSvg(qrRef.current, { cacheBust: true });
      downloadFile(dataUrl, 'svg');
    } catch (err) {
      console.error('Failed to download SVG', err);
    }
  };


  const handleDownloadMultiResolution = async () => {
    const zip = new JSZip();
    const resolutions = [256, 512, 1024, 2048];

    for (const size of resolutions) {
      try {
        // const canvas = document.createElement('canvas');
        // await toCanvas(canvas, value || 'https://', {
        //   width: size,
        //   margin: 2,
        //   color: {
        //     dark: customization.foreground,
        //     light: customization.background
        //   },
        //   errorCorrectionLevel: 'H'
        // });

        // const dataUrl = canvas.toDataURL('image/png');
        // const base64Data = dataUrl.split(',')[1];
        const node = qrRef.current.cloneNode(true)
        const dataUrl = await toPng( qrRef.current, {width: size,height:size,
           cacheBust: true, pixelRatio: 4 });
        const base64Data = dataUrl.split(',')[1];

        zip.file(`qrcode_${size}x${size}.png`, base64Data, { base64: true });
      } catch (error) {
        console.error(`Error generating ${size}x${size} QR code:`, error);
      }
    }

    try {
      // const svg = await QRCode.toString(value || 'https://', {
      //   type: 'svg',
      //   color: {
      //     dark: customization.foreground,
      //     light: customization.background
      //   },
      //   errorCorrectionLevel: 'H'
      // });
            const dataUrl = await toSvg(qrRef.current, { cacheBust: true });
      const svg = atob(dataUrl.split(',')[1]);
      zip.file('qrcode.svg', svg);
    } catch (error) {
      console.error('Error generating SVG:', error);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.download = 'qrcodes.zip';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyShareLink = async () => {
    let qrId = savedQrId;
    if (!qrId) {
      const savedQR = await onSave();
      if (savedQR) {
        qrId = savedQR.id;
      } else {
        return; // Save failed
      }
    }
    const shareUrl = `${window.location.origin}/qr/${qrId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const hasFrame = customization.frameText && customization.frameText.trim() !== '';

  return (
    <div className="sticky top-24 flex flex-col items-center justify-center bg-card border border-border rounded-xl p-4 sm:p-6 h-full min-h-[380px] shadow-xl">
      <div 
        ref={qrRef}
        className={cn(
          "relative w-full max-w-[250px] md:w-64 md:h-64 aspect-square flex items-center justify-center transition-all duration-300 transform",
          hasFrame ? "p-8 pb-14" : "p-4",
          customization.cornerStyle  === 'rounded' ? 'rounded-xl' : '',
        )}
        style={{ background: customization.background }}
      >
        {value ? (
          <QRCode
            value={value}
            size={256}
            fgColor={customization.foreground}
            bgColor="transparent"
            level="H"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            className={cn(customization.cornerStyle  === 'rounded' ? 'rounded-md' : '')}
          />
        ) : (
          <div className="text-center text-muted-foreground p-4 flex flex-col items-center gap-4">
            <ScanLine className="w-16 h-16 text-foreground/10" />
            <p className="text-sm">Your QR Code will appear here</p>
          </div>
        )}
        
        {value && customization.logoDataURL  && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 bg-white rounded-md shadow-lg">
            <img src={customization.logoDataURL } alt="QR Code Logo" className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        )}

        {value && hasFrame && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center"
            style={{ background: customization.background }}
          >
            <p 
              className="text-center font-bold text-sm md:text-base tracking-tight"
              style={{ color: customization.foreground }}
            >
              {customization.frameText}
            </p>
          </div>
        )}
      </div>
      
      <div className="w-full max-w-[250px] md:w-64 mt-6 space-y-3">
        <button
          onClick={handleDownloadPNG}
          disabled={!value}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-primary-foreground bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          Download PNG
        </button>
        <button
          onClick={handleDownloadSVG}
          disabled={!value}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-base font-medium text-secondary-foreground bg-secondary rounded-md hover:bg-muted transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          Download SVG
        </button>

        <button
          onClick={handleDownloadMultiResolution}
          className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition"
        >
          <Download className="w-5 h-5 mr-2" />
          Download All (ZIP)
        </button>
        {user && (
        <button
          onClick={onSave}
          disabled={isSaving || savedQrId}
          className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Saving...' : savedQrId ? 'Saved!' : 'Save QR Code'}
        </button> )}
        {user && (
        <button
          onClick={handleCopyShareLink}
          disabled={isSaving}
          className="w-full flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 mr-2 text-green-600" />
              <span className="text-green-600">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5 mr-2" />
              {savedQrId ? 'Copy Share Link' : 'Save & Get Link'}
            </>
          )}
        </button>  
        )}      
      </div>
    </div>
  );
}

export default QrCodePreview;
