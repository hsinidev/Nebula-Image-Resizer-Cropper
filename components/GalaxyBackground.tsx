
import React from 'react';

const GalaxyBackground: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes animate-stars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        
        .stars-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: -1;
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
          overflow: hidden;
        }

        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .stars {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: animate-stars 150s linear infinite;
        }

        .stars2 {
          background-image: 
            radial-gradient(1px 1px at 10px 90px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 30px 170px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 80px 110px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 120px 140px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 150px 180px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 180px 50px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 250px 250px;
           animation: animate-stars 100s linear infinite;
        }

        .stars3 {
          background-image: 
            radial-gradient(2px 2px at 5px 15px, #eee, rgba(0,0,0,0)),
            radial-gradient(3px 3px at 25px 65px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 75px 100px, #ddd, rgba(0,0,0,0)),
            radial-gradient(3px 3px at 110px 160px, #fff, rgba(0,0,0,0)),
            radial-gradient(3px 3px at 140px 10px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 300px 300px;
          animation: animate-stars 50s linear infinite;
        }
      `}</style>
      <div className="stars-container">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-black/50 z-[-1]"></div>
    </>
  );
};

export default GalaxyBackground;
