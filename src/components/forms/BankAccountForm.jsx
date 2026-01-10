import React from 'react';

function BankAccountForm({ value, onChange }) {
  const handleChange = (e) => {
    onChange({ ...value, [e.target.name]: e.target.value });
  };

  return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Beneficiary Name</label>
          <input
            type="text"
            name="beneficiaryName"
            value={value.beneficiaryName || ''}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={value.accountNumber || ''}
            onChange={handleChange}
            placeholder="123456789012"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
          <input
            type="text"
            name="ifsc"
            value={value.ifsc || ''}
            onChange={handleChange}
            placeholder="SBIN0001234"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={value.bankName || ''}
            onChange={handleChange}
            placeholder="State Bank of India"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>
  );
}

export default BankAccountForm;
