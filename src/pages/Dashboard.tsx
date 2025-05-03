import React from "react";
import LiveReportCard from "../components/LiveReportCard";
import AIAssistantCard from "../components/AIAssistantCard";
import BarChartCard from "../components/BarChartCard";
import SiteWatchlistCard from "../components/SiteWatchlistCard";

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LiveReportCard />
      <AIAssistantCard />
      <BarChartCard />
      <SiteWatchlistCard />
    </div>
  );
};

export default Dashboard;
