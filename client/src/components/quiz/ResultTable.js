import React, { useEffect, useState } from 'react';
import { getServerData } from '../../helper/quiz/helper';

export default function ResultTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getServerData(`http://localhost:8080/api/result`, (res) => {
            const sortedData = res.sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points; // Sort by 'points'
                } else {
                    return a.achieved - b.achieved; // Sort by 'achieved' (time)
                }
            });
            setData(sortedData);
        });
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className='table-header bg-primary text-light'>
                        <tr>
                            <th>Ranks</th>
                            <th>Name</th>
                            <th>Questions attempted</th>
                            <th>Earn Points</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && <tr><td colSpan="5" className="text-center">No Data Found</td></tr>}
                        {data.map((v, i) => (
                            <tr key={i}>
                                <td>
                                    {i + 1}
                                    {
                                        i===0?
                                        <>🌟</>:<></>
                                    }
                                    
                                    
                                    
                                    </td>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td>{v?.achieved || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
