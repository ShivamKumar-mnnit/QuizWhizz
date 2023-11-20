import styled from 'styled-components'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Container = styled.div`
height:100%;
margin: 4% 7%;
`
const Table = styled.table`
font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`
const Td = styled.td`
border: 1px solid #ddd;
  padding: 8px;
`
const Th = styled.th`
    border: 1px solid #ddd;
  padding: 12 8px;
  text-align: left;
  background-color: #393E46;
  color: #EEEEEE; 
`
const Tr = styled.tr`
&:nth-child(even){
    background-color: #f2f2f2;
}
&:hover {
    background-color:#ddd;
  }
`
const Header = styled.h1`
  text-align:center;
  padding-bottom:10px;
  colot:#222831;
`
const Button = styled.button`
background-color:#393E46;
color:#EEEEEE;
border:none;
border-radius:15px;
font-size:14px;
cursor: pointer;
`

const Anlyze = (CUId) => {
    const token = localStorage.getItem('token');

    const [examInfo, setExamInfo] = useState([]);
    // eslint-disable-next-line
    const [start, setStart] = useState(true);

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExamInfos();
        // getExam();
        // eslint-disable-next-line
    }, [])


    const getExamInfos = async () => {
        const { data } = await axios.get(`http://localhost:8080/userexams/exam/${id.id}`,{ headers: { Authorization: `Bearer ${token}` } });
        setExamInfo(data);
        setStart(false);
    }
    if (start) {
        return (
            <>
                loading...
            </>)
    }
   
    return (
        <>
         
            <Container>
                <Header>Exam analysis</Header>
                <Table>
                    <Tr>
                        <Th>User Name</Th>
                        <Th>Exam</Th>
                        <Th>Score</Th>
                        <Th>Review</Th>
                    </Tr>
                    {examInfo.map((exam) => (
                        <Tr
                            key={exam._id}>
                            <Td>{exam.userInfo.username}</Td>
                            <Td>{exam.userInfo.examname}</Td>
                            <Td>{exam.grade}</Td>
                            <Td><Link to={`/examreview/${id.id}`}><Button>Click me</Button></Link></Td>
                        </Tr>
                    ))}
                </Table>
            </Container>
        
        </>
    )
}

export default Anlyze