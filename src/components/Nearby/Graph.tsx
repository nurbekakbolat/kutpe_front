import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Monthly Sales',
              data: [12, 19, 3, 5, 2, 3, 9],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }, []);

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default LineChart;
