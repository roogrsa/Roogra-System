import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeProps {
  series: number[];
  labels: string[];
  statesData: { label: string; count: number; color: string }[];
  title: string;
  total: number;
}

const ChartThree: React.FC<ChartThreeProps> = ({
  series = [],
  labels = [],
  statesData = [],
  title = '',
  total = 0,
}) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: statesData.map((state) => state.color),
    labels: labels,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 150,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="sm:px-7.5 col-span-12 bg-[#FFFFFF] px-5 pb-5 pt-7.5 rounded-[25px] dark:bg-[#1E1E26] xl:col-span-6">
      <div className="mb-3 justify-center ">
        <h5 className="text-[20px] text-center font-[400] text-black dark:text-white">
          {title}
          <span className="mx-2">({total})</span>
        </h5>
      </div>

      <div className="flex justify-center col-span-12">
        <div className="pt-3 w-55 text-right">
          <div id="chartThree" className="mx-auto flex ">
            <ReactApexChart options={options} series={series} type="donut" />
          </div>
        </div>

        <div className="w-32 pt-5 flex flex-col gap-1">
          {statesData.length > 0 ? (
            statesData.map((state, index) => (
              <div key={index} className="flex">
                <p className="flex w-full justify-between text-[20px] font-[400] text-black dark:text-white">
                  <span>({state.count})</span>
                  <span>{state.label}</span>
                </p>
                <span
                  className="mr-2 mt-2 block my-1 h-3 w-full max-w-3 rounded-full"
                  style={{ backgroundColor: state.color }}
                ></span>
              </div>
            ))
          ) : (
            <p>No state data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
