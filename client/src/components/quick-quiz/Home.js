import React from 'react'
import './Home.css';

import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
     <div className="container backgroundimagesetter fw-bold">
        
        
     <ul>
            <li className='my-1'>You will be asked 10 questions one after another.</li>
            <li className='my-1'>10 points is awarded for the correct answer.</li>
            <li className='my-1'>Each question has four options. You can choose only one options.</li>
            <li className='my-1'>You can review and change answers before the quiz finish.</li>
            <li className='my-1'>The result will be declared at the end of the quiz.</li>
    </ul>


<div className="my-4">


{/* Search Input */}
<div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Enter the topic'
        />
      </div>

</div>

        <div className='my-4'>
<Link to='/quick_quiz/option'><button className=" btn btn-warning">Next</button></Link>
        </div>



        </div> 
    </>
  )
}

export default Home
