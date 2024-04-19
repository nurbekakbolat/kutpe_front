import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DataPoint {
  date: string;          // ISO string date format
  waiting_time: number;  // Waiting time in seconds
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null); // Reference to store the chart instance

  useEffect(() => {
    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      if (ctx) {
        const formattedData = data.map(d => {
          const timeString = new Date(d.date).toISOString().substring(11, 16); // Extract time in HH:mm format
          return { time: timeString, waiting_time: d.waiting_time };
        });

        // Create new chart instance and assign to ref
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: formattedData.map(d => d.time),
            datasets: [{
              label: 'Waiting Time',
              data: formattedData.map(d => d.waiting_time),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'category',
                title: {
                  display: true,
                  text: 'Time (HH:mm)'
                }
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Waiting Time (seconds)'
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }

    // Cleanup function to destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]); // Re-run effect if data changes

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default LineChart;
