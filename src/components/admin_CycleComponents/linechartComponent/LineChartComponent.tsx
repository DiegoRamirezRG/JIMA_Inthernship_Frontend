import React from 'react'
import './LineChartComponent.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts'
import { data } from '../../../screens/admin_School_Cycle/temp.data.test';

export const LineChartComponent = () => {
    return (
        <div className="chartContainer">
            <p className='chartTitle'>Silly Title</p>
            <div className="innerChartContainer">
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={data} margin={{bottom: 10, left: 10, right: 10, top: 10}}>
                        <CartesianGrid strokeDasharray="0 0" />
                        <XAxis dataKey="name" padding={{right: 40, left: 0}} dy={20}/>
                        <YAxis dx={-20}/>
                        <Tooltip />
                        <Line type='monotone' dataKey='uv' stroke="#6941C6" strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
