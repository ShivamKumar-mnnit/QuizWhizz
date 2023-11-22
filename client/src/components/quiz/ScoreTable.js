import React, { useEffect, useState } from 'react';
import { getServerData } from '../../helper/quiz/helper';
import useFetch from '../../hooks/fetch.hook';

export default function ScoreTable() {
    const [data, setData] = useState([]);


  const [{ apiData }] = useFetch();
 
    useEffect(() => {
        getServerData(`http://localhost:8080/api/result/${apiData?.firstName || apiData?.username}`, (res) => {
            const sortedData = res.sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points; // Sort by 'points'
                } else {
                    return a.achieved - b.achieved; // Sort by 'achieved' (time)
                }
            });
            setData(sortedData);
        });
    }, [apiData?.firstName]);

    return (
        <div className="d-flex justify-content-center">
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className='table-header bg-primary text-light'>
                        <tr>
                            <th className='text-center'>S.no</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Questions attempted</th>
                            <th className='text-center'>Earn Points</th>
                            <th className='text-center'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && <tr><td colSpan="5" className="text-center">No Data Found</td></tr>}
                        {data.map((v, i) => (
                            <tr key={i}>
                                <td>
                                    {i + 1}
                                    
                                    
                                    
                                    
                                    </td>
                                <td className='text-center'>{v?.username || ''}</td>
                                <td className='text-center'>{v?.attempts || 0}</td>
                                <td className='text-center'>{v?.points || 0}</td>
                                <td className='text-center'>{v?.achieved || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
