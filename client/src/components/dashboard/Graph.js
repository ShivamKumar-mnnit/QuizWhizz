import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
const pdata = [
  {
    sno: 1,
    score: 10
  },
  {
    sno: 2,
    score: 15
  },
  {
    sno: 3,
    score: 5
  },
  {
    sno: 4,
    score: 25
  },
  {
    sno: 5,
    score: 50
  },
  

];

const Graph = () => {
  return (
    <>
    <h1 className="chart-heading">Line Chart</h1>
    <ResponsiveContainer width="120%" aspect={2}>
      <LineChart data={pdata} width={500} height={300} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sno" interval={'preserveStartEnd'} tickFormatter={(value) => value + " Attempt"} />
        <YAxis/>
        <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="red" activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>

   
  </>
  )
}

export default Graph
