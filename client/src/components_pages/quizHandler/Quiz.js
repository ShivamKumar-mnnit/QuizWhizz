import { useEffect, useState } from "react";
import React from "react";
import Question from "./Question";

const Quiz = ({ questions, score, setScore, setQuestions, userId, exam_id}) => {

    const [options, setOptions] = useState([]);
    const [currQues, setCurrQues] = useState(0);
    const [correct, setCorrect] = useState('');


    useEffect(() => {
        startFunction();
    }, [currQues, questions]);

    const startFunction = () => {
        if (questions && questions[currQues]) {
          const data = questions[currQues].options;
          setOptions(data);
    
          const correctOption = data.find((option) => option.isCorrect);
          if (correctOption) {
            setCorrect(correctOption.option);
          }
        }
      };
  
    return (
        <div className="quiz">
            {questions ? (
                <>
                    <div className="quizInfo">
                        <span>
                            Score : {score}
                        </span>
                        </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions[currQues]}
            options={options}
            correct={correct}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            userId={userId}
          />
        </>
      ) : (
        <div>Sorry, we couldn't find any questions</div>
      )}
    </div>
    );
};
export default Quiz;