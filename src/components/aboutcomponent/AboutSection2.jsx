import React from 'react';
import '../../static/about.css';

export default function AboutSection2() {
  return (
    <div className="vm-section">

      {/* Vision and Mission */}
      <div className="vm-top">
        <div className="vm-block vision">
          <h2 className="orange">Our Vision</h2>
          <p>
            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology
            with engaging content, fostering a dynamic and interactive learning experience.
          </p>
        </div>
        <div className="vm-block mission">
          <h2 className="cyan">Our Mission</h2>
          <p>
            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals
            can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue,
            and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="vm-stats">
        <div><strong>5K</strong><p>Active Students</p></div>
        <div><strong>10+</strong><p>Mentors</p></div>
        <div><strong>200+</strong><p>Courses</p></div>
        <div><strong>50+</strong><p>Awards</p></div>
      </div>

      {/* World-Class Learning CTA */}
      <div className="vm-cta">
        <div className="cta-left">
          <h2>
            World-Class Learning for <span className="highlight">Anyone, Anywhere</span>
          </h2>
          <p>
            Studynotion partners with more than 275+ leading universities and companies to bring flexible,
            affordable, job-relevant online learning to individuals and organizations worldwide.
          </p>
          <button>Learn More</button>
        </div>

        <div className="cta-right">
          <div className="cta-box"> 
            <h4>Curriculum Based on Industry Needs</h4>
            <p>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
          </div>
          <div className="cta-box">
            <h4>Our Learning Methods</h4>
            <p>Studynotion partners with more than 275+ leading universities and companies to bring</p>
          </div>
          <div className="cta-box">
            <h4>Certification</h4>
            <p>Studynotion partners with more than 275+ leading universities and companies to bring</p>
          </div>
          <div className="cta-box">
            <h4>Rating "Auto-grading"</h4>
            <p>Studynotion partners with more than 275+ leading universities and companies to bring</p>
          </div>
          <div className="cta-box">
            <h4>Ready to Work</h4>
            <p>Studynotion partners with more than 275+ leading universities and companies to bring</p>
          </div>
        </div>
      </div>
    </div>
  );
}
