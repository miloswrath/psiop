import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from 'chart.js';
import './Graph.css';

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

const Graph = ({ percentage, size = "100%" }) => {
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Health',
        data: [100],
        backgroundColor: (ctx) => {
          const chartWidth = ctx.chart.width;
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, chartWidth, 0);
          gradient.addColorStop(0, 'red');
          gradient.addColorStop(0.5, 'yellow');
          gradient.addColorStop(1, 'green');
          return gradient;
        },
        borderRadius: 0,
        barThickness: 'flex', // use flexible sizing
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: { min: 0, max: 100, display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      verticalLine: { value: percentage },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, chartArea, scales } = chart;
      const x = scales.x.getPixelForValue(pluginOptions.value);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, chartArea.top);
      ctx.lineTo(x, chartArea.bottom);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'green';
      ctx.stroke();
      ctx.restore();
    },
  };

return (
  <div className="health-container" style={{ width: size }}>
    <div className="health-header">
      <span className="label">Health</span>
      <span className="percent">{percentage}%</span>
    </div>

    <div className="ratio-box">
      <div className="bar-wrapper">
        <Bar data={data} options={options} plugins={[verticalLinePlugin]} />
        <div className="bar-labels">
          <span>Bad</span>
          <span>Good</span>
        </div>
      </div>
    </div>
  </div>
);

};


export default Graph;
