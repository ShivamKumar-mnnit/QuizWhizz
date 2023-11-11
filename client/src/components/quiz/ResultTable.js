import React, { useEffect, useState } from 'react';
import { getServerData } from '../../helper/quiz/helper';

export default function ResultTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, (res) => {
            setData(res);
        });
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className='table-header bg-primary text-light'>
                        <tr>
                            <th>Name</th>
                            <th>Attempts</th>
                            <th>Earn Points</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 && <tr><td colSpan="4" className="text-center">No Data Found</td></tr>}
                        {data.map((v, i) => (
                            <tr key={i}>
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
