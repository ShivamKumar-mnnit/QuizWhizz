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

const Anlyze = () => {
    const token = localStorage.getItem('token');

    const [examInfo, setExamInfo] = useState([]);
    // eslint-disable-next-line
    const [start, setStart] = useState(true);

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExam();
        // eslint-disable-next-line
    }, [])

    const getExam = async () => {
        try {
          const response = await axios.get(`/exam/exam/${id.id}`, {
            headers: {
              Authorization: `Bearer ${token}` // Assuming the token is used for authentication
            }
          });
          console.log(response.data);
          setExamInfo(response.data);
          setStart(false); // Set start to false to stop displaying the loading message
        } catch (error) {
          console.error('Error fetching exam:', error);
          // Handle error state or display an error message
        }
      };

      



    if (start) {
        return (
            <>
                loading...
            </>)
    }
   
    return (
        <Container>
            <Header>Exam analysis</Header>
            <Table>
                <tbody>
                    <Tr>
                        <Th>User's Unique Id</Th>
                        <Th>Exam</Th>
                        <Th>Review</Th>
                        <Th>Publish Status</Th>
                    </Tr>
                    {examInfo.examGivers.map((giverId, index) => (
                        <Tr key={index}>
                            <Td>{giverId}</Td> {/* Assuming this is the user ID */}
                            <Td>{examInfo.examname}</Td>
                            
                            <Td>
                                <Link to={`/examreview/${examInfo.examname}/${giverId}/${id.id}`}>
                                    <Button>Click me</Button>
                                </Link>
                            </Td>
                            <Td>review to Publish </Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
    
}

export default Anlyze