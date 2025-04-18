<<<<<<< HEAD
=======

>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
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
<<<<<<< HEAD
import { borderRadius } from 'polished';

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

const Graph = ({ percentage }) => {
=======

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

const Graph = ({ percentage, size = "100%" }) => {
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Health',
<<<<<<< HEAD
        data: [100], // Always fill to 100
=======
        data: [100],
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 300, 0);
          gradient.addColorStop(0, 'red');
          gradient.addColorStop(0.5, 'yellow');
          gradient.addColorStop(1, 'green');
          return gradient;
        },
        borderRadius: 0,
<<<<<<< HEAD
        barThickness: 20,
=======
        barThickness: 'flex', // use flexible sizing
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
<<<<<<< HEAD
      x: {
        min: 0,
        max: 100,
        display: false,
      },
      y: {
        display: false,
      },
=======
      x: { min: 0, max: 100, display: false },
      y: { display: false },
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
<<<<<<< HEAD
      verticalLine: {
        value: percentage,
      },
=======
      verticalLine: { value: percentage },
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, chartArea, scales } = chart;
      const x = scales.x.getPixelForValue(pluginOptions.value);
<<<<<<< HEAD

=======
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
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

<<<<<<< HEAD
  return (
    <div className="health-container">
      <div className="health-header">
        <span className="label">Health</span>
        <span className="percent">{percentage}%</span>
      </div>
=======
return (
  <div className="health-container" style={{ width: size }}>
    <div className="health-header">
      <span className="label">Health</span>
      <span className="percent">{percentage}%</span>
    </div>

    <div className="ratio-box">
>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
      <div className="bar-wrapper">
        <Bar data={data} options={options} plugins={[verticalLinePlugin]} />
        <div className="bar-labels">
          <span>Bad</span>
          <span>Good</span>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  );
};

=======
  </div>
);

};


>>>>>>> ba48f313bd2036a636e18d3736b39f587debe065
export default Graph;
