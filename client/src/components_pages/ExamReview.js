import { useEffect, useState } from 'react'

import styled from 'styled-components'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Container = styled.table`
      width: 100%;
      height:40vh;
      border-collapse: collapse;
      text-align: center;
      border-radius:8px;
      overflow: hidden;
      background-color:#EEEEEE;
  `;
const Wrapper = styled.div`
  width:86%;
  margin:7%;
  max-width:1300px;
  `
const Check = styled.input`
  transform : scale(1.5);
    margin:20px;
    color:;
  `
const Label = styled.label`
  color:;
  maxWidth:1400px;
  `


const ExamReview = () => {
    const token = localStorage.getItem('token');

    const [userData, setUserData] = useState([]);
    const [examQuestions, setExamQuestions] = useState([]);
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const id = params;
    console.log(id);

    useEffect(() => {
        getUserInfos();
        // getExamInfos();
        // eslint-disable-next-line
    }, [])

    const getUserInfos = async () => {
        console.log(id.id);
        const { data } = await axios.get(`http://localhost:8080/api/users/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } });
        console.log(data)
        setUserData(data);
    }
    useEffect(() => {
        // getUserInfos();
        getExamInfos();
        // eslint-disable-next-line
    }, [userData])

    const getExamInfos = async () => {
        console.log(`${id.eid}_${userData?.firstName}`);
        const { data } = await axios.get(`http://localhost:8080/userexams/exam/${id.eid}_${userData.firstName}`,{ headers: { Authorization: `Bearer ${token}` } });
        console.log(data)
        setExamQuestions(data);
        setIsLoading(false);
    }



    if(isLoading){
        return(
            <>loading...</>
        )
    }

    return (
        <>
        <div className="d-flex">
            <div className="container my-4 mx-4">Exam Name : <span className='fw-bold'>{id.name}</span></div>
        <div className="container text-center my-4 d-flex flex-row-reverse"><img className='text-center' src={userData.profile} alt="..." /></div>
        </div>
        <div className="container text-center my-4">Name: <span className='fw-bold'>{userData?.firstName}</span></div>
            <Container>
                <Wrapper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "whitesmoke" }}>
                                Score: <span className='fw-bold'>{examQuestions[0].score}</span>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"><button className='btn btn-info'>Publish</button></TableCell>
                                </TableRow>
                            </TableHead>
                            {examQuestions?.map((exam, index) => (
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        key={exam._id} >
                                        <TableCell component="th" scope="exam" style={{ color: "#222831", fontSize: "16px", fontWeight: "600", padding: "25px" }}>
                                            {exam.examReview.map((examR, indexi) => (<>
                                                <Label><span style={{ color: "#4285F4" }}>{"Question Title )  "}</span>{examR.qTitle}</Label>
                                                <br /><Check type="radio" name={`${indexi + 1}`} />
                                                <Label><span style={{ color: "#FF8800" }}>{"User Answer ) "}</span> {examR.qAnswers}</Label>
                                                <br /><Check type="radio" name={`${indexi + 1}`} />
                                                <Label><span style={{ color: "#007E33" }}>{"Correct Answer ) "}</span>{examR.qCorrect}</Label>
                                                <br />
                                                <br />
                                            </>))}
                                        </TableCell>
                                        <br />
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Wrapper>
            </Container>
        </>
    )
}

export default ExamReview