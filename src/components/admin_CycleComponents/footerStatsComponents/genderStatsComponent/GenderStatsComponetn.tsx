import React from 'react'
import './GenderStatsComponent.scss'
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from 'recharts'
import { genderStats } from '../../../../screens/admin_School_Cycle/temp.data.test';
import { lighten,darken } from 'polished';
import { GenderStats } from '../../../../models/stadisticsModels/stadisticsModels';

interface props{
    data: GenderStats[];
}

export const GenderStatsComponetn = ({ data }: props) => {

    return (
        <div className='genderStatsContainer'>
            <div className="headerTitle">
                <p>Estudiantes</p>
            </div>
            <div className="pieChart">
                <ResponsiveContainer height={'100%'}>
                    <PieChart>
                    <Tooltip content={<CustomTooltip/>}/>
                        <Pie outerRadius={80} data={data} dataKey={'value'}>
                            {
                                data.map((entry, index) => {
                                    return (
                                        <Cell key={`cell-${index}`} fill={entry.color} name={entry.gender}/>
                                    )
                                })
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label" style={{color: payload[0].payload.payload.color}}>{`${payload[0].name}`}</p>
                <p className="desc">Cant. {payload[0].value}</p>
            </div>
        );
    }
    return null;
}