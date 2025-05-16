import React from 'react';
import PiHeader from './PiHeader'; // Make sure PiHeader.js is in the same folder
import './MainPIHome.css';

const MainPIHome = () => {
  return (
    <div className="main-pi-home">
      <PiHeader />
      <div
        className="hero-section"
        style={{ backgroundImage: "url('/images/mendis.jpeg')" }}
      >
        <div className="overlay">
          <h1>Welcome to the Product and Inventory Management module</h1>
          <p>
            Here, you can manage inventory, add and edit products, monitor sales trends,
            generate reports, and oversee supplier records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPIHome;
