import React from 'react';
import { Square, Circle, Image } from 'lucide-react';

function CustomizeDesign({ customization, onChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          ...customization,
          logoFile: file,
          logoDataURL: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <input type="checkbox" className="mr-2" defaultChecked />
        Customize Design
      </h3>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foreground</label>
            <div className="relative">
              <input
                type="color"
                value={customization.foreground}
                onChange={(e) => onChange({ ...customization, foreground: e.target.value })}
                className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-gray-300 pointer-events-none"></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
            <div className="relative">
              <input
                type="color"
                value={customization.background}
                onChange={(e) => onChange({ ...customization, background: e.target.value })}
                className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-gray-300 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Corners</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onChange({ ...customization, cornerStyle: 'square' })}
              className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition ${
                customization.cornerStyle === 'square'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Square className="w-5 h-5 mr-2" />
              Square
            </button>
            <button
              onClick={() => onChange({ ...customization, cornerStyle: 'rounded' })}
              className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition ${
                customization.cornerStyle === 'rounded'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Circle className="w-5 h-5 mr-2" />
              Rounded
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <input type="checkbox" className="mr-2" />
            Add Frame
          </label>
          <input
            type="text"
            placeholder="SCAN ME"
            value={customization.frameText}
            onChange={(e) => onChange({ ...customization, frameText: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <input type="checkbox" className="mr-2" />
            Add Logo
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              {customization.logoDataURL ? (
                <img
                  src={customization.logoDataURL}
                  alt="Logo preview"
                  className="w-16 h-16 mx-auto mb-2 object-contain"
                />
              ) : (
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              )}
              <p className="text-sm text-gray-600">
                {customization.logoDataURL ? 'Change logo' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 1MB</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizeDesign;
