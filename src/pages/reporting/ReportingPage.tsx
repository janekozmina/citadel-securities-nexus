import React from 'react';

const ReportingPage = () => {
  console.log('Simple ReportingPage is rendering...');
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">Reporting & Compliance</h1>
      <p className="text-slate-600 mt-2">Test page to check if routing works</p>
      <div className="mt-4 p-4 bg-blue-100 rounded-lg">
        <p>If you can see this, the routing is working correctly.</p>
      </div>
    </div>
  );
};

export default ReportingPage;