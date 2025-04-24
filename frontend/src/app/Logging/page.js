// src/app/logging/page.js
"use client";

import { useState, useEffect } from 'react';

export default function DataLoggingPage() {
  const [logs, setLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchText, setSearchText] = useState('');

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;   // ← display 20 logs per page

  const sampleLogs = [
    { status: "Warning", date: "2023-09-28", id: 1, sensor: "Humidity Sensor", problem: "Humidity level above 80%", note: "Activated dehumidifier" },
    { status: "Info",    date: "2023-09-29", id: 2, sensor: "Light Sensor",    problem: "Light levels normal",       note: "No action needed" },
    { status: "Warning", date: "2023-09-30", id: 3, sensor: "Temperature Sensor", problem: "Temperature below 18°C",  note: "Turned on heating" },
    { status: "Info",    date: "2023-10-01", id: 4, sensor: "Motion Sensor",    problem: "Motion detected in living room", note: "Checked camera feed, no issues" },
    { status: "Warning", date: "2023-10-02", id: 5, sensor: "Smoke Detector",   problem: "Smoke detected in kitchen", note: "False alarm, cooking smoke" },
    { status: "Info",    date: "2023-10-03", id: 6, sensor: "Temperature Sensor", problem: "Temperature stable at 22°C", note: "Optimal conditions" },
    { status: "Warning", date: "2023-10-04", id: 7, sensor: "Humidity Sensor", problem: "Humidity level below 30%", note: "Activated humidifier" },
    { status: "Info",    date: "2023-10-05", id: 8, sensor: "Light Sensor",    problem: "Light levels low",           note: "Turned on lights" },
    { status: "Warning", date: "2023-10-06", id: 9, sensor: "Motion Sensor",    problem: "Motion detected in bedroom", note: "Checked camera, pet movement" },
    { status: "Info",    date: "2023-10-07", id: 10, sensor: "Smoke Detector",  problem: "No smoke detected",         note: "Routine check" },
    { status: "Warning", date: "2023-10-08", id: 11, sensor: "Temperature Sensor", problem: "Temperature above 28°C",  note: "Turned on air conditioning" },
    { status: "Info",    date: "2023-10-09", id: 12, sensor: "Humidity Sensor", problem: "Humidity level at 50%",    note: "Ideal conditions" },
    { status: "Warning", date: "2023-10-10", id: 13, sensor: "Light Sensor",    problem: "Light levels too high",    note: "Adjusted blinds" },
    { status: "Info",    date: "2023-10-11", id: 14, sensor: "Motion Sensor",    problem: "No motion detected",       note: "All quiet" },
    { status: "Warning", date: "2023-10-12", id: 15, sensor: "Smoke Detector",   problem: "Smoke detected in garage", note: "Investigated, found exhaust fumes" },
    { status: "Info",    date: "2023-10-13", id: 16, sensor: "Temperature Sensor", problem: "Temperature stable at 20°C", note: "No action needed" },
    { status: "Warning", date: "2023-10-14", id: 17, sensor: "Humidity Sensor", problem: "Humidity level above 70%", note: "Increased ventilation" },
    { status: "Info",    date: "2023-10-15", id: 18, sensor: "Light Sensor",    problem: "Light levels normal",       note: "No action needed" },
    { status: "Warning", date: "2023-10-16", id: 19, sensor: "Motion Sensor",    problem: "Motion detected in hallway", note: "Checked camera, family member" },
    { status: "Info",    date: "2023-10-17", id: 20, sensor: "Smoke Detector",   problem: "No smoke detected",         note: "Routine check" },
    { status: "Warning", date: "2023-10-18", id: 21, sensor: "Temperature Sensor", problem: "Temperature dropped to 15°C", note: "Adjusted thermostat" },
    { status: "Info",    date: "2023-10-19", id: 22, sensor: "Humidity Sensor", problem: "Humidity stable at 45%",    note: "No adjustments needed" },
    { status: "Warning", date: "2023-10-20", id: 23, sensor: "Light Sensor",    problem: "Light sensor malfunction", note: "Scheduled maintenance" },
    { status: "Info",    date: "2023-10-21", id: 24, sensor: "Motion Sensor",    problem: "Motion in backyard detected", note: "Checked feed, wildlife" },
    { status: "Warning", date: "2023-10-22", id: 25, sensor: "Smoke Detector",   problem: "Low battery warning",      note: "Replaced battery" },
    { status: "Info",    date: "2023-10-23", id: 26, sensor: "Temperature Sensor", problem: "Temperature at 21°C",      note: "Comfortable range" },
    { status: "Warning", date: "2023-10-24", id: 27, sensor: "Humidity Sensor", problem: "Humidity spiked to 85%",    note: "Opened windows" },
    { status: "Info",    date: "2023-10-25", id: 28, sensor: "Light Sensor",    problem: "Light levels optimal",     note: "No action taken" },
    { status: "Warning", date: "2023-10-26", id: 29, sensor: "Motion Sensor",    problem: "Unexpected motion in basement", note: "Investigating further" },
    { status: "Info",    date: "2023-10-27", id: 30, sensor: "Smoke Detector",   problem: "Routine test passed",      note: "All systems normal" },
    { status: "Warning", date: "2023-10-28", id: 31, sensor: "Temperature Sensor", problem: "Temperature rose to 30°C", note: "Cooling system activated" },
    { status: "Info",    date: "2023-10-29", id: 32, sensor: "Humidity Sensor", problem: "Humidity at 55%",          note: "Stable conditions" },
    { status: "Warning", date: "2023-10-30", id: 33, sensor: "Light Sensor",    problem: "Light flicker detected",  note: "Bulb replacement needed" },
    { status: "Info",    date: "2023-10-31", id: 34, sensor: "Motion Sensor",    problem: "Motion in kitchen",       note: "Normal activity" },
    { status: "Warning", date: "2023-11-01", id: 35, sensor: "Smoke Detector",   problem: "Minor smoke from fireplace", note: "Ventilation increased" },
  ];

  useEffect(() => {
    setLogs(sampleLogs);
  }, []);

  // filter logic
  const filtered = logs.filter((row) => {
    if (statusFilter && row.status !== statusFilter) return false;
    if (dateFrom && row.date < dateFrom) return false;
    if (dateTo && row.date > dateTo) return false;
    if (searchText && !Object.values(row).join(' ').toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  // pagination calculations
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedLogs = filtered.slice(startIdx, startIdx + pageSize);

  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-poppins text-gray-800">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">Data Logging</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow">
          Filter
        </button>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2 text-gray-800 focus:ring-purple-300 focus:border-purple-500"
        >
          <option value="">All Statuses</option>
          <option value="Warning">Warning</option>
          <option value="Info">Info</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border rounded px-3 py-2 text-gray-800 focus:ring-purple-300 focus:border-purple-500"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border rounded px-3 py-2 text-gray-800 focus:ring-purple-300 focus:border-purple-500"
        />
        <input
          type="text"
          placeholder="Search data..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded px-3 py-2 text-gray-800 focus:ring-purple-300 focus:border-purple-500"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-100">
            <tr>
              {['Status', 'Date', 'ID', 'Sensor', 'Problem', 'Note', 'Actions'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedLogs.map((row, idx) => (
              <tr
                key={startIdx + idx}
                className={(startIdx + idx) % 2 === 0 ? 'bg-white' : 'bg-purple-50'}
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
                <td className="px-4 py-2 text-gray-900">{row.date}</td>
                <td className="px-4 py-2 text-gray-900">{row.id}</td>
                <td className="px-4 py-2 text-gray-900">{row.sensor}</td>
                <td className="px-4 py-2 text-gray-900">{row.problem}</td>
                <td className="px-4 py-2 text-gray-900">{row.note}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-purple-600 hover:text-purple-800">Download</button>
                  <button className="text-blue-600 hover:text-blue-800">✏️</button>
                  <button className="text-red-600 hover:text-red-800">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center space-x-2 text-gray-800">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded hover:bg-purple-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded hover:bg-purple-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
