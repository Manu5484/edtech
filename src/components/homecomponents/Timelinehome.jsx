import React from 'react';
import '../../static/homecss.css';
import TimelineIcon1 from '../../imgs/leadership.svg';
import TimelineIcon2 from '../../imgs/hat.svg';
import TimelineIcon3 from '../../imgs/diamond.svg';
import TimelineIcon4 from '../../imgs/code.svg';
import WorkImage from '../../imgs/workhome.png';

const timelineItems = [
  {
    icon: TimelineIcon1,
    title: "Leadership",
    description: "Fully committed to the success company"
  },
  {
    icon: TimelineIcon2,
    title: "Responsibility",
    description: "Students will always be our top priority"
  },
  {
    icon: TimelineIcon3,
    title: "Flexibility",
    description: "The ability to switch is an important skills"
  },
  {
    icon: TimelineIcon4,
    title: "Solve the problem",
    description: "Code your way to a solution"
  }
];

const Timelinehome = () => {
  return (
    <div className="timeline-container">
      <div className="timeline">
        {timelineItems.map((item, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-icon">
              <img src={item.icon} alt={item.title} />
            </div>
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            {index < timelineItems.length - 1 && <div className="timeline-line"></div>}
          </div>
        ))}
      </div>
      <div className="image-section">
        <img src={WorkImage} alt="Work" className="main-image" />
        <div className="info-banner">
          <div className="info-box">
            <h2>10</h2>
            <p>YEARS<br />EXPERIENCES</p>
          </div>
          <div className="info-box">
            <h2>250</h2>
            <p>TYPES OF<br />COURSES</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timelinehome;
