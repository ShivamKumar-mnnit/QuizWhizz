import React, { useEffect, useState } from 'react';
import Questions from './Questions';
import Timer from './Timer';
import { MoveNextQuestion, MovePrevQuestion } from '../../hooks/quiz/FetchQuestions';
import { PushAnswer } from '../../hooks/quiz/setResult';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Quiz() {
    const [check, setChecked] = useState(undefined);
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();
    const [timeExpired, setTimeExpired] = useState(false);
    const timeLimit = 50; // Time limit in seconds (300 seconds = 5 minutes)

    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check));
            }
        }
        setChecked(undefined);
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
    }

    const handleTimeExpired = () => {
        setTimeExpired(true);
        // Perform actions when time expires, e.g., navigate to result page
        // For example: history.push('/result');
    };

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>;
    }

    return (
        <div className='container backgroundimagesetter'>
            <h1 className='title text-dark text-center mt-5 mb-4'>Quiz Application</h1>
            {timeExpired ? (
                <Navigate to={'/result'} replace={true}></Navigate>
            ) : (
                <div>
                    <Timer timeLimit={timeLimit} onTimeExpired={handleTimeExpired} />
                    {/* Render the Timer component when quiz starts */}
                    <Questions onChecked={onChecked} />
                    <div className='d-flex justify-content-between mt-3'>
                        {trace > 0 ? (
                            <button className='btn btn-primary' onClick={onPrev}>
                                Prev
                            </button>
                        ) : (
                            <div></div>
                        )}
                        <button className='btn btn-primary' onClick={onNext}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
