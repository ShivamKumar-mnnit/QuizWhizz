import React from 'react'
import { useState, useEffect } from 'react'
import HashLoader from "react-spinners/HashLoader";
import logo from './img/quizzwizz.png'
import { Navbar } from './Navbar';
import Crousel from './Crousel';


const Home = () => {
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            
        },5000)

    },[])

  return (
    <>
        {
            loading?

            <div className="container d-flex justify-content-center align-items-center vh-100">


            <HashLoader color="#36d7b7" size={100} />

    <div className="text-center">
        <img src={logo} className="img-fluid mb-3" alt="Logo"/>
        <h3 className="my-3">-Quiz the best, Win the Rest!</h3>
    </div>
</div>



          :
          
          
       <>
       <Navbar/>
       <Crousel/>
       </>

        
        }

    </>
  )
}

export default Home
