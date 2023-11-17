import { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'

const Container = styled.div`
width: 100%;
height:60vh;
border-collapse: collapse;
align-items: center;
justify-content: center;
text-align: center;
border-radius:8px;
overflow: hidden;
background-color:#EEEEEE;
`
const Wrapper = styled.div`
width:86%;
height:100%;
margin:0% 7%;
align-items: center;
justify-content: center;  
background-color:white;
`
const Form = styled.form`
height:100%;
margin:0% 10%;
display: flex;
flex-wrap: wrap;
background-color:#EEEEEE;
`
const Input = styled.input`
min-width:500px;
margin:20px 10px 0px 0px;
padding:5px;
border:none;
border-radius:3px;
`
const Label = styled.label`
font-size:14px;
padding: 10px;
`
const Section = styled.div`
margin:10px 20px;
`
const Button = styled.button`
font-size:16px;
font-weight:400;
border:none;
border-radius:3px;
background-color:#0275d8;
color:white;
margin:10px 20px;
padding:10px 30px;
cursor: pointer;
`

// ... (imports)

const Configure = () => {
    const [myStartDatas, setMyStartDatas] = useState([]);
    const [examName, setExamName] = useState("");
    const [examGrade, setExamGrade] = useState(0);
    const [examTime, setExamTime] = useState(0);
    const navigate = useNavigate();
  
    const token = localStorage.getItem('token');
    const params = useParams();
    const id = params;
  
    useEffect(() => {
      getConfigureData();
      // eslint-disable-next-line
    }, []);
  
    const getConfigureData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/exam/exam/` + id.id,{ headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data);
        setExamName(response.data.examname);
        setExamGrade(response.data.passGrade);
        setExamTime(response.data.time);
        console.log(response.status);
        setMyStartDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const handleConfigure = (e) => {
      e.preventDefault();
      const exam = {
          examname: examName,
          time: examTime,
          passGrade: examGrade,
        };
      axios.patch(`http://localhost:8080/exam/` + id.id,exam,{ headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        console.log(response.status);
        console.log(response.data);
        navigate("/examDashboard");
      });
    };
  
   
  
    return (
      <>
        <Container>
          <Wrapper>
            <Form onSubmit={handleConfigure}>
              <Section>
                <Label htmlFor="quizName">Quiz Name</Label>
                <Input
                  type="text"
                  name="quizName"
                  placeholder={`${myStartDatas[0]?.examname || ""}`}
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
              </Section>
              <Section>
                <Label htmlFor="time">Time Limit</Label>
                <Input
                  type="number"
                  name="time"
                  placeholder={`${myStartDatas[0]?.time || ""}`}
                  value={examTime}
                  onChange={(e) => setExamTime(e.target.value)}
                />
              </Section>
              <Section>
                <Label htmlFor="grade">Pass Grade</Label>
                <Input
                  type="text"
                  name="grade"
                  placeholder={`${myStartDatas[0]?.passGrade || ""}`}
                  value={examGrade}
                  onChange={(e) => setExamGrade(e.target.value)}
                />
              </Section>
              <Section>
                <Button type="submit" align="right" style={{ margin: "0px 400px 20px 20px" }}>
                  Save
                </Button>
              </Section>
            </Form>
          </Wrapper>
        </Container>
      </>
    );
  };
  
  export default Configure;
  