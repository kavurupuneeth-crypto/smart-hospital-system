import React from 'react';

const MedicalBills = () => {
  const mockBills = [
    { id: 1, service: 'Consultation', amount: 150, date: '2024-01-15', status: 'Paid', invoice: 'INV-001' },
    { id: 2, service: 'Lab Tests', amount: 200, date: '2024-01-20', status: 'Pending', invoice: 'INV-002' },
    { id: 3, service: 'X-Ray', amount: 120, date: '2024-01-12', status: 'Paid', invoice: 'INV-003' },
    { id: 4, service: 'MRI Scan', amount: 500, date: '2024-01-05', status: 'Paid', invoice: 'INV-004' }
  ];

  const totalPaid = mockBills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0);
  const totalPending = mockBills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medical Bills</h1>
        <p className="text-gray-600 mt-2">Track and manage your medical expenses</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Total Paid</p>
          <p className="text-3xl font-bold text-green-600">${totalPaid}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Pending Payment</p>
          <p className="text-3xl font-bold text-red-600">${totalPending}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm mb-2">Total Bills</p>
          <p className="text-3xl font-bold text-gray-800">{mockBills.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">All Bills</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockBills.map(bill => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{bill.invoice}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{bill.service}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${bill.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{bill.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bill.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    {bill.status === 'Pending' && (
                      <button className="text-green-600 hover:text-green-800">Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalBills;
