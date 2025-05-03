import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Devices from "./pages/Devices.tsx";
import Sites from "./pages/Sites.tsx";
import Shifts from "./pages/Shifts.tsx";
import Reports from "./pages/Reports.tsx";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="sites" element={<Sites />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
