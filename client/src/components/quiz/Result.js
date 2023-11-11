import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ResultTable from './ResultTable';
import { useDispatch, useSelector } from 'react-redux';
import { attempts_Number, earnPoints_Number, flagResult } from '../../helper/quiz/helper';

// import actions  
import { resetAllAction } from '../../redux/quiz/question_reducer';
import { resetResultAction } from '../../redux/quiz/result_reducer';
import { usePublishResult } from '../../hooks/quiz/setResult';


export default function Result() {
    const dispatch = useDispatch();
    const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state);
    const totalPoints = queue.length * 10;
    const attempts = attempts_Number(result);
    const earnPoints = earnPoints_Number(result, answers, 10);
    const flag = flagResult(totalPoints, earnPoints);
 
    // store user result 
    usePublishResult({
        result,
        username: userId,
        attempts,
        points: earnPoints,
        achieved: flag ? 'Passed' : 'Failed'
    });

    function onRestart() {
        dispatch(resetAllAction());
        dispatch(resetResultAction());
    }

    return (
        <div className='bg-dark text-light' style={{ minHeight: '100vh', backgroundImage: 'url(your-background-image-url)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='container py-5'>
                <h1 className='title text-center mb-4'>Quiz Application</h1>

                <div className='result flex-center text-center'>
                    {/* User Name and Result Table */}
                    <div>
                        <h4>User Name: {userId || ''}</h4>
                        <ResultTable />
                    </div>
                </div>

                <div className='text-center mt-4'>
                    {/* Attempts, Total Quiz Points, Total Earn Points, Quiz Result */}
                    <p>Total Attempts: {attempts || 0}</p>
                    <p>Total Quiz Points: {totalPoints || 0}</p>
                    <p>Total Earn Points: {earnPoints || 0}</p>
                    <p>Quiz Result: <span style={{ color: `${flag ? '#2aff95' : '#ff2a66'}` }}>{flag ? 'Passed' : 'Failed'}</span></p>
                </div>

                <div className='start text-center mt-4'>
                    {/* Restart Button */}
                    <Link className='btn btn-primary' to={'/'} onClick={onRestart}>
                        Restart
                    </Link>
                </div>
            </div>
        </div>
    );
}
