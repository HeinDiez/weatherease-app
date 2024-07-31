'use client';

import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

export default function AverageTemperature() {

    const chartConfig = {
        height: 240,
        series: [
            {
                name: "Celsius",
                data: [7, 15, 10, 20, 22, 27, 25, 20, 17],
            },
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
            },
            title: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#1435e1"],
            stroke: {
                lineCap: "round",
                curve: "smooth" as "smooth",
            },
            markers: {
                size: 0,
            },
            xaxis: {
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
                categories: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                    "Monday",
                    "Tuesday",
                ],
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#616161",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                    },
                },
            },
            grid: {
                show: true,
                borderColor: "#dddddd",
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 5,
                    right: 20,
                },
            },
            fill: {
                opacity: 0.8,
            },
            tooltip: {
                theme: "dark",
            },
        },
    } as ApexOptions;


    return (
        <div>
            <div className='flex justify-between '>
                <h3 className="text-base font-semibold leading-6 text-gray-900">Average Temperature</h3>

                <span className='text-sm text-primary cursor-pointer' >More Details</span>
            </div>

            <Chart type={'line'} {...chartConfig} />
        </div>
    )
}
