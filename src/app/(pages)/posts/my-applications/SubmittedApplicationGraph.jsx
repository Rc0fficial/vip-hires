import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const SubmittedApplicatinGraph = () => {
  const applied = 15;
  const submitted = 10;
  const percentage = (submitted / applied) * 100;

  const data = {
    labels: ["Submitted", "Remaining"],
    datasets: [
      {
        data: [submitted, applied - submitted],
        backgroundColor: ["#3CB371", "#D3F5E3"], // Green & light green
        borderWidth: 0,
        cutout: "70%", // Controls thickness
        circumference: 180, // Makes it half-circle
        rotation: 270, // Starts from the left
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="w-auto h-full bg-white rounded-3xl p-5 shad xl:p-8 ">
      <div className="flex justify-between  gap-3">
        <h3 className="text font-medium">Total Submitted Application</h3>
        <PiDotsThreeVerticalBold size={30} />
      </div>
      <div className="relative h-[150px] flex justify-center items-center">
        <Doughnut data={data} options={options} />
        <div className="absolute top-1/2 left-1/2 transform text-center -translate-x-1/2  text-2xl font-semibold">
          Total <br />
          <span className="text-2xl">{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <div className="flex justify-center mt-7 text-xs">
        <span className="flex items-center mr-3">
          <span className="w-2 h-2 bg-[#C1F3E0] rounded-full mr-1.5"></span>
          Applied <span className="text-[#B0B0B0] ml-2"> {applied}</span>
        </span>
        <span className="flex items-center">
          <span className="w-2 h-2 bg-[#61C6A5] rounded-full mr-1.5"></span>
          Submitted <span className="text-[#B0B0B0] ml-2"> {submitted}</span>
        </span>
      </div>
    </div>
  );
};

export default SubmittedApplicatinGraph;
