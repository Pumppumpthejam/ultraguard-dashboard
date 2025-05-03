import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartCard = () => {
  const data = {
    labels: ['Site A', 'Site B', 'Site C', 'Site D'],
    datasets: [
      {
        label: 'Activity',
        data: [12, 19, 7, 14],
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // Tailwind blue-500
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Site Activity</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartCard;
