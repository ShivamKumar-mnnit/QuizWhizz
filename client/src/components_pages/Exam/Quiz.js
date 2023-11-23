import React, { useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Question from './Question';
import CountDownTimer from '../../components_pages/elements/CountDownTimer';
import { useParams, useNavigate } from 'react-router-dom';

export default function Quiz() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const photoRef = useRef(null);


  const { state } = useLocation();
  const userexamid = state?.userexamid;
  console.log(userexamid);

  const token = localStorage.getItem('token');
  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionMarks,setQuestionMarks] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState('');
  const [selected, setSelected] = useState();
  const [hasPhoto,setHasPhoto]=useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);

  const [qt,setQt]=useState("");
const [score,setScore] = useState(0);


  const params = useParams();
  const id = params;

  useEffect(() => {
    getExams();
  }, []);

  
useEffect(() => {
  
  // Call handleCapture every 1 minute
  const captureInterval = setInterval(() => {
    handleCapture();
  }, 29999); // just less than .5 min

  // Clean up the interval on component unmount
  return () => clearInterval(captureInterval);
}, []);



  const getExams = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/exam/exam/${id.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(data.examQuestions);
      setTime(data.time);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };








const handleReview = () => {
 
    const userOptions = {
      examReview: {
        qAnswers: selected,
        qCorrect: correct,
        qTitle: qt,
      }
    };
    console.log(userOptions)
    axios.put(`http://localhost:8080/userexams/${userexamid}`, userOptions,{ headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });
  
}
const handleCapture = () => {
 takePhoto();
 // Get the canvas element reference
 let canvas = photoRef.current;

 // Convert the canvas image to a base64 data URL
 const imageDataURL = canvas.toDataURL('image/jpeg'); // You can specify the image format (e.g., 'image/jpeg', 'image/png')


    const userOptions = {
      proctore: {
        proctoreImage: imageDataURL,
      }
    };
    console.log(userOptions)
    axios.put(`http://localhost:8080/userexams/proctore/${userexamid}`, userOptions,{ headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });

}




const handleScore = () => {
  // Calculate the final score or perform any final actions before submitting the score

  const finalScore = score;
  
  // Create payload for submitting final score
  const scorePayload = {
    score: finalScore // Assuming the API requires the final score in this format
  };
console.log(userexamid);
  axios.put(`http://localhost:8080/userexams/score/${userexamid}`, scorePayload, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then((response) => {
    if (response.status === 200) {
      console.log("Final score submitted successfully:", response.data);
      // Perform any actions after successful submission
    } else {
      console.log("Submission failed with status:", response.status);
      // Handle failure scenarios if needed
    }
  })
  .catch((error) => {
    console.error("Error submitting final score:", error);
    // Handle error scenarios
  });
  setIsExamFinished(true);
};





  const handleNextQuestion = () => {
    if(selected!==undefined && selected!=='' && selected===correct){
      setScore((prevscore)=>prevscore+questionMarks);
      setSelected();
    }
    handleReview();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handleSubmit=()=>{
    handleScore();
    alert("Your Exam hasbeen finished");
    navigate('/');
  }
  


// for camera proctoring
useEffect(() => {
  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 1920, height: 1080 }
    }).then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    }).catch(err => {
      console.log(err);
    });

    return () => {
      // Clean up the video stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  };

  getVideo();
}, [videoRef]);


const takePhoto = ()=>{
  const width=414;
  const height= width/(16/9);

  let video = videoRef.current;
  let photo = photoRef.current;
  
  photo.width = width;
  photo.height = height;

  let ctx = photo.getContext('2d');
  ctx.drawImage(video,0,0,width,height);
  setHasPhoto(true);
}


useEffect(() => {
  if (isExamFinished) {
    // If the exam is finished, clean up the video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }
}, [isExamFinished]);





  if (loading) {
    return <>Loading...</>;
  }

  const hoursMinSecs = { hours: 0, minutes: time, seconds: 0 };


  return (
    <div className="container backgroundimagesetter">

{/* proctoring */}

<div className="camera" style={{ width: '50%', height: 'auto', margin: '0 auto' }}>
  <video ref={videoRef}></video>
</div>
<div className={'result' + (hasPhoto ? ' hasPhoto' : '')} style={{ width: '50%', height: 'auto', margin: '0 auto' }}>
  <canvas ref={photoRef} hidden={true}></canvas>
</div>


{/* proctoringend */}

      <CountDownTimer hoursMinSecs={hoursMinSecs} handleTimerEnd={handleSubmit} />

      <h1 className="title text-dark text-center mt-5 mb-4">Quiz Application</h1>
      {currentQuestionIndex < questions.length ? (
        <div className="text-center">
          <Question
            qid={questions[currentQuestionIndex]}
            qno={currentQuestionIndex}
            // score={score}
            // setScore={setScore}
            // qtotal={questions.length}
            selected={selected}
            setSelected={setSelected}
            correct={correct}
            setCorrect={setCorrect}
            questionMarks={questionMarks}
            setQuestionMarks={setQuestionMarks}
            qt={qt}
            setQt={setQt}

          />
          <div className="text-center mt-4 py-3">
            <button className="btn btn-success" onClick={handleNextQuestion}>

{
  (currentQuestionIndex) === (questions.length-1)? <>
  
  
  
  submit
  
  
  </> : <>Next</>
}


            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 py-3">
          <p className='my-2'>All questions answered!</p>
          <p className='my-2'>Temporary Score : <span className='fw-bold'>{score}</span></p>
          <button className='btn btn-success' onClick={handleSubmit}>Final Submit the Exam</button>
          
        </div>
      )}
    </div>
  );
}
