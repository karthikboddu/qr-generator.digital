import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Eye, QrCode as QrCodeIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import QRCode from 'qrcode';

function SharedQR() {
  const { qrId } = useParams();
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQrDataAndTrackScan = async () => {
      if (!qrId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch QR data
        const { data, error } = await supabase
          .from('qr_codes')
          .select('*, scans:qr_scans(count)')
          .eq('id', qrId)
          .single();

        if (error || !data) throw error || new Error('QR code not found');
        
        // Track the scan asynchronously
        await supabase.from('qr_scans').insert({ qr_id: qrId });

        const formattedData = {
          id: data.id,
          type: data.content_type,
          content: data.content_data,
          qrImage: data.image_url,
          scans: (data.scans[0]?.count || 0) + 1, // Add 1 for the current scan
          createdAt: data.created_at,
          customization: data.customization_options,
        };

        setQrData(formattedData);
      } catch (err) {
        console.error('Error fetching QR data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQrDataAndTrackScan();
  }, [qrId]);
  
  const handleDownload = async (format) => {
    if (!qrData) return;
    
    try {
      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `qrcode-${qrData.id}.png`;
        link.href = qrData.qrImage;
        link.click();
      } else if (format === 'svg') {
        const svg = await QRCode.toString(qrData.content, {
          type: 'svg',
          color: {
            dark: qrData.customization.foreground,
            light: qrData.customization.background
          },
          errorCorrectionLevel: 'H'
        });

        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `qrcode-${qrData.id}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
      alert(`Failed to download ${format}.`);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QR code...</p>
        </div>
      </div>
    );
  }

  if (!qrData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <QrCodeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">QR Code Not Found</h1>
          <p className="text-gray-600">This QR code does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shared QR Code</h1>
            <p className="text-gray-600">Scan or download this QR code</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-6">
            <div className="bg-white rounded-lg p-6 inline-block mx-auto">
              <img
                src={qrData.qrImage}
                alt="QR Code"
                className="w-64 h-64 mx-auto"
              />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Type</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {qrData.type}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Total Scans</span>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-900 font-semibold">{qrData.scans}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 font-medium mb-2">Content</p>
              <p className="text-gray-900 break-all">{qrData.content}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={() => handleDownload('png')} className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
              <Download className="w-5 h-5 mr-2" />
              Download PNG
            </button>
            <button onClick={() => handleDownload('svg')} className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
              <Download className="w-5 h-5 mr-2" />
              Download SVG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SharedQR;
