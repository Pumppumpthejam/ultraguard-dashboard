import React, { useEffect, useState } from "react";
import axios from "axios";

interface RawRow {
  timestamp: string;
  latitude: number;
  longitude: number;
  matchedWaypoint: string;
}

interface ReportData {
  shift: {
    start: string;
    end: string;
  };
  visited: { point: string; time: string }[];
  missed: string[];
  summary: {
    totalWaypoints: number;
    visited: number;
    missed: number;
    logsAnalyzed: number;
  };
  rawData: RawRow[];
}

const ReportViewer: React.FC = () => {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("http://localhost:3000/report");
        setReport(res.data);
      } catch (err) {
        console.error("Error loading report:", err);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <p>Loading patrol report...</p>;
  if (!report) return <p>No report found. Please upload a CSV.</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Patrol Report</h2>
      <p className="text-sm text-gray-600 mb-2">
        Shift: {report.shift.start} to {report.shift.end}
      </p>
      <table className="w-full text-sm table-auto border">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Latitude</th>
            <th className="p-2 border">Longitude</th>
            <th className="p-2 border">Matched Waypoint</th>
          </tr>
        </thead>
        <tbody>
          {report.rawData.map((row, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2 border">{row.timestamp}</td>
              <td className="p-2 border">{row.latitude}</td>
              <td className="p-2 border">{row.longitude}</td>
              <td className="p-2 border">{row.matchedWaypoint}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-700">
        <p>✅ Visited: {report.visited.length}</p>
        <p>❌ Missed: {report.missed.join(", ") || "None"}</p>
        <p>Total Logs Analyzed: {report.summary.logsAnalyzed}</p>
      </div>
    </div>
  );
};

export default ReportViewer;
