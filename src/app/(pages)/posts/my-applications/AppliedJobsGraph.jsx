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
import { PiDotsThreeVerticalBold } from "react-icons/pi";

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
        display: false,
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
    <div className="p-5 rounded-3xl shad bg-white max-h-[320px] xl:p-8">
      <div className="flex justify-between  gap-3">
              <h3 className="text font-medium">Total Submitted Application</h3>
              <PiDotsThreeVerticalBold size={30} />
            </div>
            <div className="w-full max-w-[574px] mx-auto h-full max-h-[250px] flex justify-center">

      <Line data={data} options={options} />
            </div>
    </div>
  );
};

export default AppliedJobGraph;
