import './Cmc.scss';
import React from 'react';
import 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Colors, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Colors, Tooltip, Legend);

function Cmc({ TypedCards, deckCmc }) {
  Chart.defaults.borderColor = '#9c9a9b';

  const data = {
    labels: deckCmc,
    datasets: Object.keys(TypedCards).map((type) => {
      return {
        label: type,
        data: deckCmc.map((cmc) => TypedCards[type].filter((card) => card.cmc === cmc).length),
        stack: 0,
      }
    })
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
    }
  };
  return (
    <div className='cmc'>
      <h1>Converted Mana Cost</h1>
      <Bar data={data} options={config} />
    </div>
  );
}

export default Cmc;
