import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from 'axios'
import { useParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`

const Result = () => {

  const token = localStorage.getItem('token')
  const [score, setScore] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params;

  useEffect(() => {
    getExamNames();
  }, [setScore])

  const getExamNames = async () => {
    const { data } = await axios.get(`http://localhost:8080/userexams/exam/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } });
    setScore(data);
    getPassGrade();
  }

  const getPassGrade = async () => {
    await axios.get(`http://localhost:8080/exam/exam/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      setPassGrade(response.data);
    });
    setIsLoading(false);
  }

 
  return (
    <>

      <Container>
        <span>Final Score : {score[0]?.grade}</span> <br />
        {passGrade[0]?.passGrade < score[0]?.grade ? (<><span>congratulations you passed the exam</span><br /><img src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png"  alt="..." style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>) : (<><span>sorry you failed the exam</span><br /><img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png" alt="..." style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>)}
        <Link to="/examdashboard">
          <button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
          >
            Go to dashboard
          </button>
        </Link>
      </Container>

    </>
  );
};

export default Result;