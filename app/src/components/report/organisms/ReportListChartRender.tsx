import React from "react";
import { Line } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: true,
          labelString: "スコア",
        },
      },
    ],
    xAxes: [
      {
        type: "time",
        unit: "month",
        time: {
          displayFormats: {
            day: "M/D",
          },
        },
        scaleLabel: {
          display: true,
          labelString: "作成日",
        },
      },
    ],
  },
};

type PropsType = {
  data: {
    date: Date;
    score: number;
  }[];
};

export default function ReportChartRender(props: PropsType) {
  const data = {
    // labels: [ new Date(2020, 5, 1),new Date(2020, 6, 15), new Date(2020, 7)],
    labels: props.data.map((dat) => {
      return dat.date;
    }),
    datasets: [
      {
        label: "分析スコア",
        // data: [12, 19, 3, 5, 2, 3],
        data: props.data.map((dat) => {
          return dat.score;
        }),
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  return (
    <>
      {/* <div className='header'>
              <h1 className='title'>Line Chart</h1>
              <div className='links'>
                  <a
                      className='btn btn-gh'
                      href='https://github.com/reactchartjs/react-chartjs-2/blob/react16/example/src/charts/Line.js'
                  >
                      Github Source
                  </a>
              </div>
          </div> */}
      <Line data={data} options={options} type="" />
    </>
  );
}
