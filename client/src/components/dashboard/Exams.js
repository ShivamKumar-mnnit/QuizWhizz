import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TableCell from '@mui/material/TableCell';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  height: 100%;
  margin: 4% 7%;
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px 8px;
  text-align: left;
  background-color: #393e46;
  color: #eeeeee;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Header = styled.h1`
  text-align: center;
  padding-bottom: 10px;
  color: #222831;
`;

const Button = styled.button`
  background-color: #393e46;
  color: #eeeeee;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
`;

const Exams = () => {
  const token = localStorage.getItem('token');
  const [examDatas, setExamDatas] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const notify = () => toast.success('Link successfully copied to the clipboard');

  useEffect(() => {
    getExamDatas();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredExams(examDatas.filter((exam) => exam.examname.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, examDatas]);

  const getExamDatas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/exam', { headers: { Authorization: `Bearer ${token}` } });
      setExamDatas(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <Header>Status report</Header>
      <input
        type="text"
        placeholder="Search exams by name..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '15px', padding: '5px' }}
      />
      <Table>
        <Tr>
          <Th>Exam Name</Th>
          <Th>Link</Th>
        </Tr>
        {filteredExams.map((exam, index) => (
          <Tr key={index}>
            <Td>{exam.examname}</Td>
            <Td>
              <TableCell
                component="th"
                scope="row"
                onClick={() => {
                  navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_DOMAIN}examstarting/` + exam._id);
                  notify();
                }}
                style={{ cursor: 'pointer' }}
              >
                {exam.examname} <span style={{ color: '#CC0000' }}>{"=>"} Click for quiz link</span>
              </TableCell>
            </Td>
          </Tr>
        ))}
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default Exams;
