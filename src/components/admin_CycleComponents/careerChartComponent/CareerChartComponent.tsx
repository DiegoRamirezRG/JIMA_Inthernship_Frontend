import React, { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom';
import { stadisticObjStudentByCareer, stattsCycleStudent } from '../../../models/stadisticsModels/stadisticsModels';

interface innerProps {
    nonformatedData: stattsCycleStudent[];
}

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, midAngle} = props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <g>
            <text x={cx} y={cy - 150} dy={8} textAnchor="middle" fill={fill}>
                {payload.career}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${value}`}
            </text>
        </g>
    );
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.35;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={25}>
            {`${value}`}
        </text>
    );
};


export const CareerChartComponent = ({ nonformatedData }: innerProps) => {

    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const handleIndex = (index: number | undefined) => {
        setActiveIndex(index);
    }

    const formattedData: stadisticObjStudentByCareer[] = nonformatedData.reduce((acc : stadisticObjStudentByCareer[], estudiante) => {
        const carrera = estudiante.Carrera;
        const existingCareer = acc.find((item: stadisticObjStudentByCareer) => item.career === carrera);

        if (existingCareer) {
            existingCareer.students += estudiante.Numero;
        } else {
            acc.push({
                career: carrera,
                students: estudiante.Numero,
            });
        }
        
        return acc;
    }, []);


    return (
        <ResponsiveContainer width="100%" height="80%">
            <PieChart>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={formattedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                dataKey="students"
                label={renderCustomizedLabel}
                labelLine={false}
                onMouseLeave={() => handleIndex(undefined)}
            >
                {
                data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DarkColorsForWhite[index * 3]} onMouseEnter={() => handleIndex(index)}/>
                ))
            }
            </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];