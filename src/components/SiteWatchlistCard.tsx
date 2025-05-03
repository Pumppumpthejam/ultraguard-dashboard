import React from 'react';

const sites = [
  { name: 'Site A', status: 'Active' },
  { name: 'Site B', status: 'Offline' },
  { name: 'Site C', status: 'Active' },
  { name: 'Site D', status: 'Maintenance' },
];

const statusColor = {
  Active: 'bg-green-500',
  Offline: 'bg-red-500',
  Maintenance: 'bg-yellow-500',
};

const SiteWatchlistCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl">
      <h2 className="text-lg font-semibold mb-4">Site Watchlist</h2>
      <ul className="space-y-3">
        {sites.map((site, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{site.name}</span>
            <span
              className={`text-white text-xs px-2 py-1 rounded ${statusColor[site.status as keyof typeof statusColor]}`}
            >
              {site.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteWatchlistCard;
