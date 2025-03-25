'use client'
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AppliedJobGraph = () => {
  const data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "2022",
        data: [2, 1, 4, 3, 6, 2, 5], // Example values
        fill: true,
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        borderColor: "#0ABF824D",
        pointBackgroundColor: "#0ABF824D",
        pointBorderColor: "#fff",
        tension: 0.4, // Curve smoothness
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: "Total Applied Jobs",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", padding: "20px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default AppliedJobGraph;
