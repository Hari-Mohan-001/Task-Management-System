
import { Pie } from "react-chartjs-2";
import {  ArcElement,  } from "chart.js"; // Import the required components from Chart.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend,PointElement } from 'chart.js';

// Register the chart components
ChartJS.register(ArcElement);
// Register necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,   // For Bar Chart
    LineElement,  // For Line Chart
    Title, 
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  );

// Pie chart configuration
export const PieChart = ({ completed, pending }: { completed: number; pending: number }) => {
  const data = {
    labels: ["Completed Tasks", "Pending Tasks"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, pending], // Data for the chart
        backgroundColor: ["#4caf50", "#ff9800"], // Colors for each section
        borderColor: ["#4caf50", "#ff9800"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Pie data={data} options={pieOptions} />;
};


export const LineChart = ({ completed, pending }: { completed: number; pending: number }) => {
    // Data for Completed vs Pending Tasks
    const data = {
      labels: ['Tasks'],
      datasets: [
        {
          label: 'Completed',
          data: [completed],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Pending',
          data: [pending],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Completed vs Pending Tasks',
        },
      },
    }
    return  <Bar data={data} options={options} />
}