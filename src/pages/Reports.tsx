// src/pages/Reports.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import saveAs from "file-saver"; 


interface ReportEntry {
  id: number;
  site: string;
  shift: string;
  date: string;
  completion: number;
  status: "complete" | "incomplete";
  fileUrl: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/reports", {
        params: {
          site: selectedSite,
          from: dateRange.from,
          to: dateRange.to,
        },
      });
      setReports(response.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [selectedSite, dateRange]);

  const downloadReport = async (url: string) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const filename = url.split("/").pop();
      saveAs(response.data, filename || "report.pdf");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">📄 Summary Reports</h2>

      <div className="flex gap-4 mb-6">
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          <option value="">Select Site</option>
          <option value="Rose Acres">Rose Acres</option>
          <option value="Pebble Rock">Pebble Rock</option>
          <option value="Oxford Heights">Oxford Heights</option>
        </select>

        <input
          type="date"
          className="bg-gray-800 text-white p-2 rounded"
          onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
        />
        <input
          type="date"
          className="bg-gray-800 text-white p-2 rounded"
          onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
        />
      </div>

      <div className="space-y-4">
        {reports.map((r) => (
          <div key={r.id} className="bg-gray-900 p-4 rounded shadow-md">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-bold">{r.site} - {r.shift}</h3>
                <p className="text-sm">Date: {format(new Date(r.date), "PPP")}</p>
                <p className="text-sm">Completion: {r.completion}%</p>
                <p className="text-sm">
                  Status: <span className={r.status === "complete" ? "text-green-400" : "text-red-400"}>{r.status}</span>
                </p>
              </div>
              <button
                onClick={() => downloadReport(r.fileUrl)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
