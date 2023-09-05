import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";

const TALoading = ({ show }) => {
  const props = useSpring({
    from: { transform: 'rotate(0deg)' },
    to:   { transform: 'rotate(360deg)'},
    config: { tension: 50, friction: 10},
    loop: true,
  });

  const [angle, setAngle] = useState(0);
  const majorAxis = 110;
  const [minorAxis, setMinorAxis ] = useState(230);
  const lastTimeRef = useRef(Date.now());


  const animate = () => {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    setAngle(prevAngle => {
      const newAngle = (prevAngle + (120 * deltaTime )) % 360;

      if (newAngle >= 179 && newAngle <= 181) {
        setMinorAxis(120);
      } else if (newAngle >= 359 || (newAngle >= 0 && newAngle <= 1)) {
        setMinorAxis(280);
      }

      return newAngle;
    });
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => {};
  });


  const x = majorAxis * Math.cos((angle * Math.PI) / 180);
  const y = minorAxis * Math.sin((angle * Math.PI) / 180);

  return (
    <div
      className="loading"
      style={{
        transition: `opacity 5s ease-out`,
        opacity: show ? 0 : 1,
      }}
    >
    <div className='loading-container'>
      <div className="ta-logo">
        <div className="ta">
          <span>T</span>
          <span>A</span>
          <div className="orbitOne">
            <span
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >•</span>
          </div>
            <span>•</span>
        </div>
    </div>
      <div className="centered-box">
        <animated.div className='spinner' style={props}></animated.div>
      </div>
    </div>
    </div>
  )
};

export default TALoading;
