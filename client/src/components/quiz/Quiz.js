import React, { useEffect, useState } from 'react';
import Questions from './Questions';

import { MoveNextQuestion, MovePrevQuestion } from '../../hooks/quiz/FetchQuestions';
import { PushAnswer } from '../../hooks/quiz/setResult';

// redux store import 
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';


export default function Quiz() {
    const [check, setChecked] = useState(undefined);
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch();

    // next button event handler 
    function onNext() {
        if (trace < queue.length) {
             //  increase the trace value by one using MoveNextAction 
            dispatch(MoveNextQuestion());

            if (result.length <= trace) {
                // insert a new result in the array. 
                dispatch(PushAnswer(check));
            }
        }
        // reset the value of the checked variable
        setChecked(undefined);
    }

    // Prev button event handler 
    function onPrev() {
        if (trace > 0) {
            // decrease the trace value by one using MovePrevQuestion 
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check);
    }
    // finished exam after the last question
    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>;
    }

    return (
        <div className='container backgroundimagesetter'>
            <h1 className='title text-dark text-center mt-5 mb-4'>Quiz Application</h1>
            {/* display questions */}
            <Questions onChecked={onChecked} />

            <div className='d-flex justify-content-between mt-3'>
                {trace > 0 ? 
                    <button className='btn btn-primary' onClick={onPrev}>
                        Prev
                    </button>

                    :
                    <div></div>
                }
                <button className='btn btn-primary' onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}
