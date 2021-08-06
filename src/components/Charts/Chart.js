import React from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";

const options = {
  bezierCurve: false,
  legend: {
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: { display: false },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
  },
};

const Charts = ({ data, isDark }) => {
  const lineChart1 = data.cases_time_series ? (
    <Line
      data={{
        labels: data.cases_time_series.map(({ date }) => date),
        datasets: [
          {
            data: data.cases_time_series.map(
              ({ dailydeceased }) => dailydeceased
            ),
            label: "Deaths",
            borderColor: "#ff3333",
            fill: true,
            backgroundColor: "rgba(218, 31, 31, 0.5)",
            borderWidth: 1,
          },
        ],
      }}
      options={{
        ...options,
        title: {
          display: true,
          text: "Deceased Cases",
          fontColor: `${isDark ? "white" : "grey"}`,
          fontSize: 20,
          position: "left",
        },
      }}
    />
  ) : null;
  const lineChart2 = data.cases_time_series ? (
    <Line
      data={{
        labels: data.cases_time_series.map(({ date }) => date),
        datasets: [
          {
            data: data.cases_time_series.map(
              ({ dailyconfirmed }) => dailyconfirmed
            ),
            label: "Infected",
            borderColor: "#3333ff",
            backgroundColor: "rgba(56, 56, 244, 0.5)",
            borderWidth: 1,
            fill: true,
          },
        ],
      }}
      options={{
        ...options,
        title: {
          display: true,
          text: "Confirmed Cases",
          fontColor: `${isDark ? "white" : "grey"}`,
          fontSize: 20,
          position: "left",
        },
      }}
    />
  ) : null;
  const lineChart3 = data.cases_time_series ? (
    <Line
      data={{
        labels: data.cases_time_series.map(({ date }) => date),
        datasets: [
          {
            data: data.cases_time_series.map(
              ({ dailyrecovered }) => dailyrecovered
            ),
            label: "Recovered",
            borderColor: "#33ff33",
            fill: true,
            backgroundColor: "rgba(56, 244,56 , 0.5)",
            borderWidth: 1,
          },
        ],
      }}
      options={{
        ...options,
        title: {
          display: true,
          text: "Recovered Cases",
          fontSize: 20,
          fontColor: `${isDark ? "white" : "grey"}`,
          position: "left",
        },
      }}
    />
  ) : null;

  return (
    <div className="chart-container">
      <div className={`chart ${isDark && "chart--darkMode"}`}>{lineChart1}</div>
      <div className={`chart ${isDark && "chart--darkMode"}`}>{lineChart2}</div>
      <div className={`chart ${isDark && "chart--darkMode"}`}>{lineChart3}</div>
    </div>
  );
};
export default Charts;
