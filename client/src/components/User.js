import React, { useEffect, useState } from 'react';
import profile from '../assets/profile.png'
export default function App() {
  useEffect(() => {
    const tabList = Array.from(document.querySelectorAll('[data-toggle="tab"]'));
    tabList.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').replace('#', '');
        const targetPane = document.getElementById(targetId);
        const tabPanes = Array.from(targetPane.parentElement.children);

        tabPanes.forEach((pane) => {
          pane.classList.remove('show', 'active');
        });

        targetPane.classList.add('show', 'active');
      });
    });
  }, []);


  const mainDivStyle = {
    border: '1px solid black',
    borderRadius: '10px',
    padding: '50px 20px',
    margin: 'auto auto',
    alignContent: 'center',
  };
  const editButtonContainerStyle = {
    display: 'flex',
    justifyContent: 'flex-end', // Align items to the right
    marginTop: '-10px', // Adjust the margin as needed
  };

  const [userData, setUserData] = useState("")
  useEffect(() => {

    fetch('http://localhost:8080/api/user')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Data Not Fetched...")
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data)
      })
      .catch((error) => {
        console.log("Data Not Fetched.....", error)
      })
  }, [])

  return (
    <div className="container mt-4" style={{ margin: 'auto auto', alignContent: 'center', border: '1px solid black', padding: '50px 20px', borderRadius: '10px' }}>
      <form method="">
        <div className="row" style={mainDivStyle}>
          <div className="col-md-4">
            <div className="profile-img">
              <img src={profile} alt="Image" className="img-fluid rounded-circle" />
            </div>
          </div>

          <div className="col-md-4" style={mainDivStyle}>
            <div className="content p-3 bg-light">
              <h5 className="mb-3">Hitesh</h5>
              <h6 className="text-muted">Web Developer</h6>
              <p className="mt-3 mb-4">{userData.firstname}</p>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" href="#home" data-toggle="tab" role="tab">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#profile" data-toggle="tab" role="tab">
                    History
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-md-4' style={mainDivStyle}>
            <button className="btn btn-primary" style={editButtonContainerStyle}>Edit Profile</button>
          </div>
        </div>

        <div className='row mt-4' >
          {/* leftside */}
          <div className='col-md-4' style={mainDivStyle} >
            <div className='profile-work'>
              <h5 className="text-center mb-3">Social Links</h5>
              <a href="https://www.youtube.com/watch?v=kHEhhV3EyPU&list=WL&index=1&t=71s" className="btn btn-link" target="_blank">Youtube</a>
            </div>
          </div>

          {/* rightside */}
          <div className='col-md-8 about-info' style={mainDivStyle}>
            <div className='tab-content profile-tab' id="myTabContent">
              <div className='tab-pane fade show active' id="home" role='tabpanel'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label className="font-weight-bold">User ID</label>
                  </div>
                  <div className='col-md-6'>
                    <p>95975495</p>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label className="font-weight-bold">Name</label>
                  </div>
                  <div className='col-md-6'>
                    <p>Pakistani</p>
                  </div>
                </div>
              </div>
              <div className='tab-pane fade' id='profile' role='tabpanel'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label className="font-weight-bold">Experience</label>
                  </div>
                  <div className='col-md-6'>
                    <p>Example History Content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
