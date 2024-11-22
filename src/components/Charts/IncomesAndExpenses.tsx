import React from 'react';
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {
        name: 'Ocak',
        gider: -4000,
        gelir: 2400,
    },
    {
        name: 'Şubat',
        gider: -3000,
        gelir: 1398,
    },
    {
        name: 'Mart',
        gider: -2000,
        gelir: 6000,
    },
    {
        name: 'Nisan',
        gider: -2780,
        gelir: 3908,
    },
    {
        name: 'Mayıs',
        gider: -1890,
        gelir: 4800,
    },
    {
        name: 'Haziran',
        gider: -2390,
        gelir: 3800,
    },
    {
        name: 'Temmuz',
        gider: -1290,
        gelir: 3500,
    },
    {
        name: 'Ağustor',
        gider: -3490,
        gelir: 5300,
    },
    {
        name: 'Eylül',
        gider: -1490,
        gelir: 2300,
    },
    {
        name: 'Ekim',
        gider: -3490,
        gelir: 4300,
    },
    {
        name: 'Kasım',
        gider: -3290,
        gelir: 4300,
    },
    {
        name: 'Aralık',
        gider: -999,
        gelir: 6000,
    },
];

const IncomesAndExpenses = () => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                stackOffset="sign"
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={0} stroke="#000" />
                <Bar dataKey="gelir" fill="#059669" stackId="stack" />
                <Bar dataKey="gider" fill="#f87171" stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default IncomesAndExpenses