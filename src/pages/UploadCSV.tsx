// src/pages/UploadCSV.tsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import saveAs from "file-saver";


interface ReportRow {
  waypoint: string;
  timeIn: string;
  timeOut: string;
  timeSpent: string;
  status: string;
}

const UploadCSV: React.FC = () => {
  const [params] = useSearchParams();
  const site = params.get("site");

  const [report, setReport] = useState<ReportRow[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !site) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("site", site);

    setLoading(true);

    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMeta({
      site: data.site,
      device: data.device,
      shift: data.shift,
      date: data.date,
      completion: data.completion,
    });
    setReport(data.report);
    setLoading(false);
  };

  const handleExportPDF = async () => {
    const res = await fetch("http://localhost:4000/api/export/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...meta, report }),
    });

    const blob = await res.blob();
    saveAs(blob, `PatrolReport_${meta.site}_${meta.date}.pdf`);
  };

  const handleExportExcel = async () => {
    const res = await fetch("http://localhost:4000/api/export/excel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...meta, report }),
    });

    const blob = await res.blob();
    saveAs(blob, `PatrolReport_${meta.site}_${meta.date}.xlsx`);
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">📤 Upload CSV for Site: {site}</h1>

      <input type="file" accept=".csv" onChange={handleUpload} className="mb-4" />

      {loading && <p className="text-gray-400">Processing CSV...</p>}

      {meta && (
        <>
          <div className="bg-gray-800 p-4 rounded mb-4">
            <p><strong>Site:</strong> {meta.site}</p>
            <p><strong>Device:</strong> {meta.device}</p>
            <p><strong>Shift:</strong> {meta.shift}</p>
            <p><strong>Date:</strong> {meta.date}</p>
            <p><strong>Completion:</strong> {meta.completion}%</p>

            <div className="mt-4 flex gap-4">
              <button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Export PDF
              </button>
              <button onClick={handleExportExcel} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Export Excel
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded">
            <table className="min-w-full text-sm bg-gray-900 text-white">
              <thead>
                <tr className="bg-gray-700 text-left">
                  <th className="p-2">Waypoint</th>
                  <th className="p-2">Time In</th>
                  <th className="p-2">Time Out</th>
                  <th className="p-2">Time Spent</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {report.map((row, i) => (
                  <tr key={i} className="border-t border-gray-800">
                    <td className="p-2">{row.waypoint}</td>
                    <td className="p-2">{row.timeIn}</td>
                    <td className="p-2">{row.timeOut}</td>
                    <td className="p-2">{row.timeSpent}</td>
                    <td className={`p-2 ${row.status === "ok" ? "text-green-400" : "text-red-500"}`}>
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadCSV;
