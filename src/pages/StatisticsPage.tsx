import { DatePicker, Input } from "antd";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import api from "../api/Api";

export const StatisticsPage = () => {
  const [orderTotal, setOrderTotal] = useState<
    { date: string; total: string }[]
  >([]);
  useEffect(() => {
    api
      .post(`/api/statistics/daily-order-totals`, {
        startDate: "2025-03-30",
        endDate: "2025-04-30",
      })
      .then((res) => {
        console.log(res.data);
        setOrderTotal(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const { RangePicker } = DatePicker;
  return (
    <div className=" container">
      <div id="chart">
        <ReactApexChart
          options={{
            chart: {
              height: 350,
              type: "area",
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: "top",
                },
              },
            },
            dataLabels: {
              enabled: false,
              formatter: function (val) {
                return val + "%";
              },
              // offsetY: -20,
              // style: {
              //   fontSize: "12px",
              //   colors: ["#304758"],
              // },
            },

            xaxis: {
              categories: orderTotal.map((item) => item.date),
              position: "",
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              crosshairs: {
                fill: {
                  type: "gradient",
                  gradient: {
                    colorFrom: "#D8E3F0",
                    colorTo: "#BED1E6",
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  },
                },
              },
              tooltip: {
                enabled: true,
              },
            },
            yaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
            title: {
              text: "Monthly Inflation in Argentina, 2002",
              floating: true,
              offsetY: 330,
              align: "center",
              style: {
                color: "#444",
              },
            },
          }}
          series={[
            {
              name: "Inflation",
              data: orderTotal?.map((i) => Number(i.total)),
            },
          ]}
          
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>

      <div className="w-38 flex flex-col">
      <RangePicker />
        <Input />
      </div>
    </div>
  );
};
