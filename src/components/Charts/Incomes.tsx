import React from "react";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "Page A",
        gelir: 4000,


    },
    {
        name: "Page B",
        gelir: 3000,

    },
    {
        name: "Page C",
        gelir: 2000,

    },
    {
        name: "Page D",
        gelir: 2780,

    },
    {
        name: "Page E",
        gelir: 1890,

    },
    {
        name: "Page F",
        gelir: 2390,

    },
    {
        name: "Page G",
        gelir: 3490,

    },
];

const Incomes = () => {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='gelir' fill="#059669" activeBar={<Rectangle />} />
            </BarChart>
        </ResponsiveContainer>
    );
};
export default Incomes;
