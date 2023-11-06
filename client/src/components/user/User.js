import React from 'react';
import profile from '../../assets/profile.png';
import useFetch from '../../hooks/fetch.hook';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/profile');
  };

  const [{ isLoading, apiData, serverError }] = useFetch();

  if (isLoading) {
    return <h1 className='text-2xl font-bold'>Loading...</h1>;
  }

  if (serverError) {
    return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '70vh', // Make the container full-height of the viewport
      }}
    >
      <div className='container' style={{
        border: '1px solid black',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.1)'
      }}>
        <div className='row'>
          <div className='col-md-4'>
            <div className='profile-img'>
              <img src={profile} style={{ height: '150px' }} alt='Profile' className='img-fluid rounded-circle' />
            </div>
          </div>
          <div className='col-md-8'>
            <div className='d-flex justify-content-end'>
              <button className='btn btn-primary' onClick={handleEditProfileClick}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className='col-md-8' style={{ border: '1px solid black', borderRadius: '10px', padding: '20px' }}>
            <div className='tab-content profile-tab' id='myTabContent'>
              <div className='tab-pane fade show active' id='home' role='tabpanel'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label className='font-weight-bold'>{apiData?.username || ''}</label>
                  </div>
                  <div >
                    <p>{apiData?.mobile || ''}</p>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label className='font-weight-bold'>Role: {apiData?.role || ''}</label>
                  </div>
                  <div className='col-md-6'>
                    <p>{apiData?.address || ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-4' style={{ border: '1px solid black', borderRadius: '10px', padding: '20px' }}>
            <div className='profile-work'>
              <h5 className='text-center mb-3'>Social Links</h5>
              <a href='https://www.youtube.com/watch?v=kHEhhV3EyPU&list=WL&index=1&t=71s' className='btn btn-link' target='_blank'>
                Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
