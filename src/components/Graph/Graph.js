import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import './Graph.css';

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

const HealthBar = ({ percentage }) => {
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Health',
        data: [percentage],
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 300, 0);
          gradient.addColorStop(0, 'red');
          gradient.addColorStop(0.5, 'yellow');
          gradient.addColorStop(1, 'green');
          return gradient;
        },
        borderRadius: 10,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 100,
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="health-container">
      <div className="health-header">
        <span className="label">Health</span>
        <span className="percent">{percentage}%</span>
      </div>
      <div className="bar-wrapper">
        <Bar data={data} options={options} height={50} />
        <div className="bar-labels">
          <span>Bad</span>
          <span>Good</span>
        </div>
      </div>
    </div>
  );
};

export default HealthBar;
