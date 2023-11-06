import React from 'react'
import crousel1 from './img/crousel1.png';
import crousel2 from './img/crousel2.png';
import crousel3 from './img/crousel3.png';
import crousel4 from './img/crousel4.png';

const Crousel = () => {
  return (
    <>
<div className="">
<div id="carouselExample" className="carousel slide">

  <div className="carousel-inner">
    <div className="carousel-item active">
    <img src={crousel1} className="d-block w-100" style={{ height: '500px' }} alt="..." />

    </div>
    <div className="carousel-item">
      <img src={crousel2} height={20} className="d-block w-100" style={{ height: '500px' }} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={crousel3} className="d-block w-100" style={{ height: '500px' }} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={crousel4} className="d-block w-100" style={{ height: '500px' }} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

</div>
    </>
  )
}

export default Crousel
