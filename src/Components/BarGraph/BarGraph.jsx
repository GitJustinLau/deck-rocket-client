import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraph = () => {
  // Define your data and options here
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar-graph">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
