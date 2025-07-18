import React from 'react';
import '../static/footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-col">
          <h2 className="logo">StudyNotion</h2>
          <h4>Company</h4>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Affiliates</li>
          </ul>
          <div className="social-icons">
            <span>🌐</span>
            <span>🔍</span>
            <span>🐦</span>
            <span>▶️</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li>Articles</li>
            <li>Blog</li>
            <li>Chart Sheet</li>
            <li>Code challenges</li>
            <li>Docs</li>
            <li>Projects</li>
            <li>Videos</li>
            <li>Workspaces</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Plans</h4>
          <ul>
            <li>Paid memberships</li>
            <li>For students</li>
            <li>Business solutions</li>
          </ul>
          <h4>Community</h4>
          <ul>
            <li>Forums</li>
            <li>Chapters</li>
            <li>Events</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Subjects</h4>
          <ul>
            <li>AI</li>
            <li>Cloud Computing</li>
            <li>Computer Science</li>
            <li>Cybersecurity</li>
            <li>Data Analytics</li>
            <li>Data Science</li>
            <li>Developer Tools</li>
            <li>DevOps</li>
            <li>IT</li>
            <li>Machine Learning</li>
            <li>Mobile Development</li>
            <li>Web Design</li>
            <li>Web Development</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Languages</h4>
          <ul>
            <li>Bash</li>
            <li>C++</li>
            <li>C#</li>
            <li>Go</li>
            <li>HTML & CSS</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>PHP</li>
            <li>Python</li>
            <li>SQL</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Career building</h4>
          <ul>
            <li>Career paths</li>
            <li>Career services</li>
            <li>Interview prep</li>
            <li>Professional certification</li>
            <li>Full Catalog</li>
            <li>Beta Content</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

