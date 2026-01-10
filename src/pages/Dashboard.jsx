import React, { useState, useEffect } from 'react';
import { QrCode, Eye, Share2, TrendingUp, Copy, Check } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const [qrHistory, setQrHistory] = useState([]);
  const [stats, setStats] = useState({
    totalQRs: 0,
    totalScans: 0,
    thisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      setLoading(true);

      try {
        const { data: qrCodes, error: qrError } = await supabase
          .from('qr_codes')
          .select('id, content_type, content_data, created_at, scans:qr_scans(count)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (qrError) throw qrError;

        const formattedHistory = qrCodes.map(qr => ({
          id: qr.id,
          type: qr.content_type,
          content: qr.content_data,
          scans: qr.scans[0]?.count || 0,
          createdAt: qr.created_at,
          shareUrl: `${window.location.origin}/qr/${qr.id}`
        }));

        const totalScans = formattedHistory.reduce((sum, qr) => sum + qr.scans, 0);

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonthQRs = formattedHistory.filter(qr => new Date(qr.createdAt) >= startOfMonth).length;

        setQrHistory(formattedHistory);
        setStats({
          totalQRs: formattedHistory.length,
          totalScans: totalScans,
          thisMonth: thisMonthQRs
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your QR code performance and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total QR Codes</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalQRs}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Scans</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalScans}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-gray-900">{stats.thisMonth}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">QR Code History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scans</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {qrHistory.map((qr) => (
                <tr key={qr.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">{qr.type}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="text-sm text-gray-900 truncate max-w-xs">{qr.content}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Eye className="w-4 h-4 mr-1 text-gray-400" />
                      {qr.scans}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{formatDate(qr.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleCopy(qr.shareUrl, qr.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="Copy share link"
                    >
                      {copiedUrl === qr.id ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-gray-600" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {qrHistory.length === 0 && !loading && (
          <div className="text-center py-12">
            <QrCode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No QR codes generated yet. Go to the generator to create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
