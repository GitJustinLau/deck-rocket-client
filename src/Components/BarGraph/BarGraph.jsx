import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineController, LineElement } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function BarGraph() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'My Data',
        data: [10, 20, 15, 25, 30],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: "#2F7DEE", //"#52b2bc",
        // pointBackgroundColor: "#52b2bc",  // "#55bae7",
        // pointBorderColor: "#52b2bc",
        pointHoverBackgroundColor: "#dd151a",  // "#52b2bc",
        pointHoverBorderColor: "#dd151a" //  "#52b2bc"//"#55bae7",

      },
    ],
  };

  const options = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category', // Specify the scale type for the x-axis
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        type: 'linear', // Specify the scale type for the y-axis
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div>
      <h1>My Line Chart</h1>
      <Line data={data} options={options} />
    </div>
  );
}

export default BarGraph;
