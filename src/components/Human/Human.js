import React from 'react';
import { ReactComponent as HumanSVG } from '../../assets/svgs/human.svg';
import { useNavigate } from 'react-router-dom';
import './Human.css';


const HumanOverlay = ({ dotData = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="human-wrapper">
      <HumanSVG className="human-svg" />
      {dotData.map(({ id, x, y, color, to }) => (
        <button
          key={id}
          className="overlay-dot"
          style={{ top: y, left: x, backgroundColor: color }}
          onClick={() => navigate(to)}
          aria-label={`Navigate to ${to}`}
        />
      ))}
    </div>
  );
};

export default HumanOverlay;
