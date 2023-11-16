import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../../redux/quiz/result_reducer';
import '../quick-quiz/Home.css';
import useFetch from '../../hooks/fetch.hook';

export default function Main() {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [{ apiData }] = useFetch();

    function startQuiz() {
        dispatch(setUserId(apiData?.firstName || apiData?.email));
    }

    return (
        <>
            <div className='container backgroundimagesetter fw-bold text-center'>
                <h1 className='title text-danger py-4'>Quiz Application</h1>
                <ol>
                    <li>You will be asked 10 questions one after another.</li>
                    <li>10 points are awarded for the correct answer.</li>
                    <li>Each question has three options. You can choose only one option.</li>
                    <li>You can review and change answers before the quiz finishes.</li>
                    <li>The result will be declared at the end of the quiz.</li>
                </ol>
                <form id='form' className='my-4 text-center'>
                    <input
                        ref={inputRef}
                        className='userid text-center'
                        type='text'
                        placeholder='Username*'
                        defaultValue={apiData?.firstName || apiData?.username}
                        readOnly
                    />
                </form>
                <div className='start'>
                    <Link className='btn btn-success' to={'quiz'} onClick={startQuiz}>
                        Start Quiz
                    </Link>
                </div>
                <div className='my-4'>
                    <Link to='/resultTable'>
                        <button className='btn btn-info my-2 mx-4'>Your Scores</button>
                    </Link>
                    <Link to='/resultTable'>
                        <button className='btn btn-info'>LeaderBoard</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
