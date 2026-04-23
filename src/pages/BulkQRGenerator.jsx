import React, { useMemo, useState } from 'react';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { AlertCircle, Check, Download, FileText, Package, Upload } from 'lucide-react';
import Seo from '../components/Seo';

const sampleCsv = `name,url
Cafe menu,https://example.com/menu
Instagram profile,https://instagram.com/yourbrand
UPI payment,upi://pay?pa=yourname@upi&pn=Your%20Brand`;

function parseCsvLine(line) {
  const cells = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      cells.push(cell.trim());
      cell = '';
    } else {
      cell += char;
    }
  }

  cells.push(cell.trim());
  return cells;
}

function parseCsv(csvText) {
  const lines = csvText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.toLowerCase());
  const hasHeader = headers.includes('url') || headers.includes('link');
  const nameIndex = hasHeader ? Math.max(headers.indexOf('name'), headers.indexOf('title')) : 0;
  const urlIndex = hasHeader ? Math.max(headers.indexOf('url'), headers.indexOf('link')) : 1;
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines
    .map((line, index) => {
      const cells = parseCsvLine(line);
      const name = cells[nameIndex >= 0 ? nameIndex : 0] || `QR-${index + 1}`;
      const url = cells[urlIndex >= 0 ? urlIndex : 1] || cells[0] || '';
      return {
        name: name.replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '') || `QR-${index + 1}`,
        value: url.trim(),
      };
    })
    .filter((row) => row.value);
}

function BulkQRGenerator() {
  const [csvText, setCsvText] = useState(sampleCsv);
  const [foreground, setForeground] = useState('#0f172a');
  const [background, setBackground] = useState('#ffffff');
  const [size, setSize] = useState(1024);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const rows = useMemo(() => parseCsv(csvText), [csvText]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsvText(text);
  };

  const downloadZip = async () => {
    if (rows.length === 0) {
      setMessage('Add at least one CSV row with a name and URL.');
      return;
    }

    setGenerating(true);
    setMessage('');

    try {
      const zip = new JSZip();
      const manifest = [];

      for (const row of rows) {
        const dataUrl = await QRCode.toDataURL(row.value, {
          width: Number(size),
          margin: 2,
          errorCorrectionLevel: 'H',
          color: {
            dark: foreground,
            light: background,
          },
        });

        const base64 = dataUrl.split(',')[1];
        zip.file(`${row.name || 'qr-code'}.png`, base64, { base64: true });
        manifest.push({ file: `${row.name || 'qr-code'}.png`, value: row.value });
      }

      zip.file('manifest.json', JSON.stringify(manifest, null, 2));
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bulk-qr-codes.zip';
      link.click();
      URL.revokeObjectURL(url);
      setMessage(`Generated ${rows.length} QR codes successfully.`);
    } catch (err) {
      console.error(err);
      setMessage('Could not generate the ZIP. Please check your CSV data.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Seo
        title="Bulk QR Code Generator"
        description="Upload CSV data and generate many high-resolution QR codes in one ZIP file."
        path="/bulk"
      />
      <main className="bulk-page">
        <section className="bulk-hero">
          <div>
            <span className="badge badge-purple">
              <Package size={12} />
              Business batch tool
            </span>
            <h1>Bulk QR Generator for campaigns, events, inventory, and packaging.</h1>
            <p>
              Upload a CSV, customize brand colors, and export hundreds of print-ready QR codes with a manifest in one ZIP.
            </p>
          </div>
          <div className="bulk-hero-card">
            <FileText size={28} color="#67e8f9" />
            <strong>{rows.length}</strong>
            <span>QR rows ready</span>
          </div>
        </section>

        <section className="bulk-workspace">
          <div className="bulk-panel">
            <div className="bulk-panel-header">
              <div>
                <h2>1. Add CSV data</h2>
                <p>Use columns named <code>name</code> and <code>url</code>, or paste two comma-separated columns.</p>
              </div>
              <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                <Upload size={14} />
                Upload CSV
                <input type="file" accept=".csv,text/csv" onChange={handleFile} style={{ display: 'none' }} />
              </label>
            </div>
            <textarea className="dark-textarea bulk-textarea" value={csvText} onChange={(e) => setCsvText(e.target.value)} spellCheck={false} />
          </div>

          <div className="bulk-panel">
            <div className="bulk-panel-header">
              <div>
                <h2>2. Export settings</h2>
                <p>Use high contrast for print and packaging use cases.</p>
              </div>
            </div>
            <div className="bulk-settings">
              <label>
                <span>Foreground</span>
                <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} />
              </label>
              <label>
                <span>Background</span>
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} />
              </label>
              <label>
                <span>PNG Size</span>
                <select className="dark-select" value={size} onChange={(e) => setSize(e.target.value)}>
                  <option value={512}>512 px</option>
                  <option value={1024}>1024 px</option>
                  <option value={2048}>2048 px</option>
                </select>
              </label>
            </div>
            <button className="btn-primary" onClick={downloadZip} disabled={generating || rows.length === 0} style={{ width: '100%', marginTop: 16 }}>
              <Download size={16} />
              {generating ? 'Generating ZIP...' : `Download ${rows.length} QR codes`}
            </button>
            {message && (
              <div className={`bulk-message ${message.includes('success') ? 'is-success' : ''}`}>
                {message.includes('success') ? <Check size={15} /> : <AlertCircle size={15} />}
                {message}
              </div>
            )}
          </div>
        </section>

        <section className="bulk-preview">
          <h2>Preview rows</h2>
          <div>
            {rows.slice(0, 12).map((row, index) => (
              <article key={`${row.name}-${index}`}>
                <span>{index + 1}</span>
                <strong>{row.name}</strong>
                <p>{row.value}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default BulkQRGenerator;
