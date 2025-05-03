import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar.tsx';
import LiveReportCard from './components/LiveReportCard';
import AIAssistantCard from './components/AIAssistantCard';
import BarChartCard from './components/BarChartCard';
import SiteWatchlistCard from './components/SiteWatchlistCard';




const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <LiveReportCard />
    <AIAssistantCard />
    <BarChartCard />
    <SiteWatchlistCard />
  
  </div>
</main>

      </div>
    </div>
  );
};

export default App;
