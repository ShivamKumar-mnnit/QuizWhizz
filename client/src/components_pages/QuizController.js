import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Quiz from "./quizHandler/Quiz";
import { useParams, useNavigate } from 'react-router-dom'
import CountDownTimer from "./elements/CountDownTimer";

const QuizController = (CUId) => {

    const userId = CUId.CUId
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [exam_id, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const navigate = useNavigate()

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();
    }, [])

 
    const getExams = async () => {
        try {
          const { data } = await axios.get('http://localhost:8080/examquestions/' + id.id);
          setQuestions(data);
          userCheck();
        } catch (error) {
          console.error(error);
        }
      };

    console.log(questions);





    const securityData = async () => {
        axios.all([
            await axios.get('http://localhost:8080/api/users/' + CUId.CUId),
            await axios.get('http://localhost:8080/exam/exam/' + id.id)
        ]).then(axios.spread((data, data2) => {
            if (data2.data.creatorUserId === CUId.CUId) {
                setTimerData(data2.data.time)
                console.log(data2.data.time)
                alert("You are in preview mode that means your question data will not be saved")
            } else {
                const dummyData = {
                    userId: CUId.CUId,
                    examId: id.id,
                    userInfo: {
                        username: data.data.firstname + " " + data.data.lastname,
                        examname: data2.data.examname,
                        score: 0,
                    }
                };
                axios.post("http://localhost:8080/userexams/", dummyData).then((response) => {
                    console.log(response.status);
                    console.log(response.data);
                    setExam_id(response.data._id)
                });
                setTimerData(data2.data.time)
            }
            setTimeout(() => {
                navigate("/result/" + id.id)
            }, ((data2.data.time) * 60) + "000");
        }))
    }

    const userCheck = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/userexams/' + CUId.CUId);
            const myData = await Promise.all(data.map((d) => d.examId))
            for (let i = 0; i <= myData.length; i++) {
                if (myData[i] === id.id) {
                    navigate("/examdashboard")
                    alert("you have already took this exam")
                    return
                }
            }
            securityData();
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            alert("you have already took this exam")
        }
    }

    const hoursMinSecs = {hours:0, minutes: timerData, seconds: 0}
 
    if (questions === undefined || isLoading) {
        return <div>Loading...</div>;
      }
    

    return (
        <div>
           
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                userId={userId}
                exam_id={exam_id}
            />
          
        </div>
    );
}

export default QuizController;