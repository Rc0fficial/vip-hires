import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

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
    <div style={{
      width: "300px",
      height: "250px",
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>Total Submitted Application</h3>
      <div style={{ position: "relative", height: "150px" }}>
        <Doughnut data={data} options={options} />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "18px",
          fontWeight: "bold"
        }}>
          Total <br />
          <span style={{ fontSize: "24px" }}>{percentage.toFixed(0)}%</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", fontSize: "12px" }}>
        <span style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
          <span style={{ width: "8px", height: "8px", background: "#D3F5E3", borderRadius: "50%", marginRight: "5px" }}></span>
          Applied {applied}
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={{ width: "8px", height: "8px", background: "#3CB371", borderRadius: "50%", marginRight: "5px" }}></span>
          Submitted {submitted}
        </span>
      </div>
    </div>
  );
};

export default SubmittedApplicatinGraph;
