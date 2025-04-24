// src/app/logging/page.js
"use client";

import { useState, useEffect } from 'react';

export default function DataLoggingPage() {
  const [logs, setLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch your log data here
    fetch('/api/logs')
      .then((res) => res.json())
      .then(setLogs);
  }, []);

  // Simple filter logic (you can expand this)
  const filtered = logs.filter((row) => {
    if (statusFilter && row.status !== statusFilter) return false;
    if (dateFrom && row.date < dateFrom) return false;
    if (dateTo && row.date > dateTo) return false;
    if (searchText && !Object.values(row).join(' ').includes(searchText)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-poppins">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-600">Data Logging</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow">
          Filter
        </button>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-purple-300 focus:border-purple-500"
        >
          <option value="">All Statuses</option>
          <option value="Warning">Warning</option>
          <option value="Sent">Sent</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-purple-300 focus:border-purple-500"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-purple-300 focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Search data..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded px-3 py-2 focus:ring-purple-300 focus:border-purple-500"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-50">
            <tr>
              {['Status', 'Date From', 'Date To', 'ID', 'Sensor', 'Problem', 'Note', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-purple-50'}
              >
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2">{row.dateFrom}</td>
                <td className="px-4 py-2">{row.dateTo}</td>
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.sensor}</td>
                <td className="px-4 py-2">{row.problem}</td>
                <td className="px-4 py-2">{row.note}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-purple-600 hover:text-purple-800">
                    Download
                  </button>
                  <button className="text-blue-600 hover:text-blue-800">✏️</button>
                  <button className="text-red-600 hover:text-red-800">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center space-x-2 text-gray-600">
        <button className="px-3 py-1 rounded hover:bg-purple-100">Prev</button>
        <span>Page 1 of 30</span>
        <button className="px-3 py-1 rounded hover:bg-purple-100">Next</button>
      </div>
    </div>
  );
}