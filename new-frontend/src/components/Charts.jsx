import React from 'react';
import { Line, Bar } from 'react-chartjs-2'; // Keep this import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Bar Chart Data and Options
export const barData = {
  labels: ['Rice', 'Millet', 'Corn', 'Ginger'],
  datasets: [
    {
      label: 'Sales (in tons)',
      data: [120, 90, 70, 40],
      backgroundColor: '#FF6B6B',
      borderColor: '#FF6B6B',
      borderWidth: 1,
      barThickness: 50,
      borderRadius: 10,
    },
  ],
};

export const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Top Selling Commodities',
    },
  },
};

// Line Chart Data and Options (Sample for 30-Day Performance)
export const lineData = {
  labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  datasets: [
    {
      label: 'Rice',
      data: [12, 19, 3, 5, 2, 3, 6, 8, 10, 12, 14, 15, 20, 25, 30, 32, 35, 40, 45, 47, 50, 52, 54, 55, 60, 65, 70, 73, 75, 80],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
    {
      label: 'Millet',
      data: [10, 15, 5, 6, 7, 12, 18, 20, 25, 28, 35, 37, 38, 40, 42, 43, 45, 46, 47, 48, 49, 50, 51, 52, 55, 58, 60, 63, 65, 70],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
    },
    {
      label: 'Corn',
      data: [5, 6, 8, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 42, 44, 46, 48, 50, 52],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
    {
      label: 'Ginger',
      data: [2, 4, 3, 6, 8, 7, 9, 11, 10, 12, 14, 15, 17, 18, 20, 22, 23, 24, 26, 28, 30, 31, 33, 35, 36, 38, 40, 42, 45, 48],
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      fill: true,
    },
  ],
};

export const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Days',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Sales',
      },
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
};

// Bar Chart Component
export const BarChart = () => (
  <Bar data={barData} options={barOptions} />
);

// Line Chart Component
export const LineChart = () => (
  <Line data={lineData} options={lineOptions} />
);
