import React from 'react';
import '../../static/about.css';
import img1 from '../../imgs/aboutus1.webp';
import img2 from '../../imgs/aboutus2.webp';
import img3 from '../../imgs/aboutus1.webp';

export default function AboutSection1() {
  return (
    <div className="about-section1">
      <div className="about-header">
        <h1>
          Driving Innovation in Online Education for a <span className="highlight-blue">Brighter Future</span>
        </h1>
        <p>
          Studynotion is at the forefront of driving innovation in online education.
          We're passionate about creating a brighter future by offering cutting-edge courses,
          leveraging emerging technologies, and nurturing a vibrant learning community.
        </p>
      </div>

      <div className="about-images">
        <img src={img1} alt="student1" />
        <img src={img2} alt="student2" />
        <img src={img3} alt="student3" />
      </div>

      <div className="about-footer">
        <p>
          We are passionate about revolutionizing the way we learn. Our innovative platform
          <span className="highlight-blue"> combines technology</span>,
          <span className="highlight-orange"> expertise</span>, and community to create an
          <span className="highlight-yellow"> unparalleled educational experience</span>.
        </p>
      </div>
    </div>
  );
}
