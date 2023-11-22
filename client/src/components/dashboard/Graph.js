import React, { useEffect, useState } from 'react';
import { getServerData } from '../../helper/quiz/helper';
import useFetch from '../../hooks/fetch.hook';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';



const Graph = () => {

  const [data, setData] = useState([]);
  const [{ apiData }] = useFetch();
  useEffect(() => {
    getServerData(`http://localhost:8080/api/result/${apiData?.firstName || apiData?.username}`, (res) => {
        const sortedData = res.sort((a, b) => {
           
        });
        setData(sortedData);
    });
}, [apiData?.firstName]);


const xAxisData = data.map((_, index) => index + 1); 

  return (
    <>
      <h1 className="chart-heading">Score Chart</h1>
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={'preserveStartEnd'} tickFormatter={(value) => `${value+1} Attempt`} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
          <Legend />
          <Line type="monotone" dataKey="points" stroke="red" name="Score" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default Graph
