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
`;

const SingleQuestion = styled.div`
  width: 95%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 5px solid blue;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px; /* Adjust this value as needed for space between questions */
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const OptionBox = styled.button`
  width: 45%;
  margin: 5px;
  padding: 10px;
  border: 2px solid ${({ isSelected }) => (isSelected ? 'blue' : '#ccc')};
  background-color: ${({ isSelected }) => (isSelected ? 'blue' : 'white')};
  
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? 'lightblue' : 'initial')};
  }
`;





const Question = ({qid,qno,selected,setSelected,correct,setCorrect,questionMarks,setQuestionMarks,qt,setQt}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    const [loading,setLoading]= useState(true);
    const [question,setQuestion]= useState();
    const [option,setOption]=useState();
    
    


    useEffect(() => {
        getExams();
    }, [qid])
  
    const getExams = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/examquestions/${qid}`, { headers: { Authorization: `Bearer ${token}` } });
            console.log(data);
            setQuestion(data[0]);
            setOption(data[0].options);
            setQt(data[0].questionTitle);
            setQuestionMarks(data[0].questionMarks)
            setLoading(false); // Once the data is fetched, set loading to false

            const correctOption = data[0].options.find(option => option.isCorrect);
    if (correctOption) {
      setCorrect(correctOption.option);
    }
          } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false); // In case of an error, also set loading to false
          }
        }
        
        if(loading){
          return <>loading...</>
        }

      const generateLabel = (index) => {
        return String.fromCharCode(65 + index); // 'A', 'B', 'C', ...
      };
console.log(correct);
console.log(questionMarks);

  return (
    <Container>
      <h1>Question {qno + 1} :</h1>
      <SingleQuestion>
        <h2>{question.questionTitle}</h2>
        <Options>
        {option &&
  option.map((opt, index) => (
    <OptionBox
      key={opt._id}
      isSelected={selected === opt.option} // Check if the option is selected
      onClick={() => setSelected(opt.option)} // Set the selected option
    >
      {/* Display options */}
      <div className="d-flex">
        <div className="mx-4 fw-bold">{generateLabel(index)}:</div>{' '}
        {opt.option}
      </div>
    </OptionBox>
  ))}
          
        </Options>

      
      </SingleQuestion>
    </Container>
  )
}

export default Question
