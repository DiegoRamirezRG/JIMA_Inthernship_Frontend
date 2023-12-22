import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { stadisticObjCareers, stattsCycleStudent } from '../../../models/stadisticsModels/stadisticsModels';
import { DarkColorsForWhite } from '../../../utils/colorRandom/ColorArrayRandom';

interface innerProps {
  nonFomatData: stattsCycleStudent[];
}

export const StudentChartComponent = ({ nonFomatData }: innerProps) => {

  const estadisticasPorCarrera : stadisticObjCareers[] = [];

  nonFomatData.forEach((estudiante) => {
    const carrera = estudiante.Carrera;
    const grado = `${estudiante.Numero}°`;

    const existente = estadisticasPorCarrera.find((estadistica) => estadistica.Carrera === carrera);

    if (existente) {
      existente[grado] = (existente[grado] || 0) as number + 1;
    } else {
      const nuevaEstadistica: stadisticObjCareers = {
        Carrera: carrera,
        [grado]: 1,
      };
      estadisticasPorCarrera.push(nuevaEstadistica);
    }
  })

  const allGrades = Array.from(
    new Set(estadisticasPorCarrera.flatMap((carrera) => Object.keys(carrera).filter((key) => key !== 'Carrera')))
  );

    return (
        <ResponsiveContainer width="100%" height="80%">
            <BarChart
                width={450}
                height={300}
                data={estadisticasPorCarrera}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Carrera" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                  allGrades.map((grado, index) => (
                    <Bar key={grado} dataKey={grado} stackId="a" fill={DarkColorsForWhite[index]} />
                  ))
                }
            </BarChart>
        </ResponsiveContainer>
    )
}