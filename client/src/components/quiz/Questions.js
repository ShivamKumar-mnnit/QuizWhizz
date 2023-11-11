import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// Custom Hook 
import { useFetchQestion } from '../../hooks/quiz/FetchQuestions';
import { updateResult } from '../../hooks/quiz/setResult';

export default function Questions({ onChecked }) {
    const [checked, setChecked] = useState(undefined);
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, apiData, serverError }] = useFetchQestion();
    const questions = useSelector(state => state.questions.queue[state.questions.trace]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateResult({ trace, checked }));
    }, [checked]);

    function onSelect(i) {
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({ trace, checked }));
    }

    if (isLoading) return <h3 className='text-light'>isLoading</h3>;
    if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>;

    return (
        <div className='questions d-flex flex-column align-items-center justify-content-center'>
            <h2 className='text-dark text-center mt-4 mb-4'>{questions?.question}</h2>

            <ul key={questions?.id} className='list-unstyled text-center'>
                {questions?.options.map((q, i) => (
                    <li key={i} className='mb-3'>
                        <div className='form-check d-flex align-items-center justify-content-center'>
                            <input
                                type='radio'
                                className='form-check-input'
                                value={false}
                                name='options'
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                                checked={result[trace] === i}
                            />
                            <label className='form-check-label text-primary ms-2' htmlFor={`q${i}-option`}>{q}</label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
