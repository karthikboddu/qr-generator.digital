import React, { useState } from 'react';
import { Download, Share2, Copy, Check, Save } from 'lucide-react';
import JSZip from 'jszip';
import QRCode from 'qrcode';

function QRPreview({ qrDataURL, content, customization, onSave, isSaving, savedQrId }) {
  const [copied, setCopied] = useState(false);

  const handleDownloadPNG = async () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataURL;
    link.click();
  };

  const handleDownloadSVG = async () => {
    try {
      const svg = await QRCode.toString(content || 'https://', {
        type: 'svg',
        color: {
          dark: customization.foreground,
          light: customization.background
        },
        errorCorrectionLevel: 'H'
      });

      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'qrcode.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating SVG:', error);
    }
  };

  const handleDownloadMultiResolution = async () => {
    const zip = new JSZip();
    const resolutions = [256, 512, 1024, 2048];

    for (const size of resolutions) {
      try {
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, content || 'https://', {
          width: size,
          margin: 2,
          color: {
            dark: customization.foreground,
            light: customization.background
          },
          errorCorrectionLevel: 'H'
        });

        const dataUrl = canvas.toDataURL('image/png');
        const base64Data = dataUrl.split(',')[1];
        zip.file(`qrcode_${size}x${size}.png`, base64Data, { base64: true });
      } catch (error) {
        console.error(`Error generating ${size}x${size} QR code:`, error);
      }
    }

    try {
      const svg = await QRCode.toString(content || 'https://', {
        type: 'svg',
        color: {
          dark: customization.foreground,
          light: customization.background
        },
        errorCorrectionLevel: 'H'
      });
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

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 md:p-8 mb-6">
        <div className="bg-white rounded-lg p-4 md:p-6 inline-block w-full">
          {qrDataURL ? (
            <img
              src={qrDataURL}
              alt="QR Code Preview"
              className="w-full max-w-xs mx-auto"
            />
          ) : (
            <div className="w-full aspect-square max-w-xs mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">QR Code Preview</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleDownloadPNG}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PNG
        </button>

        <button
          onClick={handleDownloadSVG}
          className="w-full flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
        >
          <Download className="w-5 h-5 mr-2" />
          Download SVG
        </button>

        <button
          onClick={handleDownloadMultiResolution}
          className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition"
        >
          <Download className="w-5 h-5 mr-2" />
          Download All (ZIP)
        </button>

        <button
          onClick={onSave}
          disabled={isSaving || savedQrId}
          className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Saving...' : savedQrId ? 'Saved!' : 'Save QR Code'}
        </button>

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
      </div>
    </div>
  );
}

export default QRPreview;
