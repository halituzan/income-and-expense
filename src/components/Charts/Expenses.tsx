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
    gider: 2400,
  },
  {
    name: "Page B",
    gider: 1398,
  },
  {
    name: "Page C",
    gider: 9800,

  },
  {
    name: "Page D",
    gider: 3908,

  },
  {
    name: "Page E",
    gider: 4800,
  },
  {
    name: "Page F",
    gider: 3800,
  },
  {
    name: "Page G",
    gider: 4300,
  },
];

const Expenses = () => {
  return (
    <ResponsiveContainer width='100%' height='100%' >
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
        <XAxis dataKey='name' className={"fill-expenses"} />
        <YAxis />
        <Tooltip />
        <Bar dataKey='gider' className='fill-expenses bg-transparent ' activeBar={<Rectangle />} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Expenses;
