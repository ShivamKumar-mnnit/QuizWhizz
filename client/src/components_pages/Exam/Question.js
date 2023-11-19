import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import styled from "styled-components"


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SingleQuestion = styled.div`
  width: 95%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 5px solid grey;
  padding: 20px;
  margin-top: 10px;
`
const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`
// eslint-disable-next-line
const SingleOption = styled.button`
  width: 46%;
  height: 50px;
  padding: 15px 20px;
  margin: 10px;
  box-shadow: 0 0 2px black;
`
const Control = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
// eslint-disable-next-line
const Select = styled.div`
  background-color: rgb(7, 207, 0);
  color: white;
  box-shadow: 0 0 1px black;
`
// eslint-disable-next-line
const Wrong = styled.div`
  background-color: rgb(233, 0, 0);
  color: white;
  box-shadow: 0 0 1px black;
`





const Question = ({qid,qno,score,setScore,qtotal}) => {

    const token = localStorage.getItem('token');
    console.log(qid);
    console.log(qno);
    console.log(score);
    console.log(setScore);
    console.log(qtotal);
    const navigate = useNavigate()

    const [loading,setLoading]= useState(true);
    const [question,setQuestion]= useState();
    const [option,setOption]=useState();
    const [selected, setSelected] = useState();
    const [correct, setCorrect] = useState();
    const [error, setError] = useState(false);


    useEffect(() => {
        getExams();
    }, [])
  
    const getExams = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/examquestions/${qid}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log(data);
            setQuestion(data[0]);
            setOption(data[0].options);
            setLoading(false); // Once the data is fetched, set loading to false
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false); // In case of an error, also set loading to false
          }
        }
        
        if(loading){
          return <>loading...</>
        }
        console.log(question);


    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
      };

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) { setScore(score + 1); }
     
      }; 


      const handleNext = () => {
        if (qno+1 >= qtotal) {
          navigate(`/dashboard`);
        } else if (selected) {
          setSelected();
        } else setError("Please select an option first");
      };

    console.log(question);



    const handleReview = (i) => {
          const userOptions = {
            examReview: {
              qAnswers: i,
              qCorrect: correct,
              qTitle: question[qno].questionTitle,
            }
          };
          console.log(userOptions)
          axios.put(`http://localhost:8080/userexams/${qid}`, userOptions,{ headers: { Authorization: `Bearer ${token}` } }).then((response) => {
            console.log(response.status);
            console.log(response.data);
          });
       
      }



  return (
    <Container>
    <h1>Question {qno+1} :</h1>
    <SingleQuestion>
      <h2>{question.questionTitle}</h2>
      <Options>
        {option &&
          option.map((option) => (
            <button className={`singleOption  ${selected && handleSelect(option.option)}`}
              key={option._id} creator
              onClick={() => { handleCheck(option.option); handleReview(option.option) }}
              disabled={selected}>
              {option.option}
            </button>
          ))}
      </Options>
      <Control>
        <button
          variant="contained"
          color="primary"
          size="large"
          style={{ width: 185 }}
          onClick={handleNext}>
          (<span>Next Question</span>)
        </button>
      </Control>
    </SingleQuestion>
  </Container >
  )
}

export default Question
