import React, { useState } from 'react';
import axios from 'axios';
import '../static/contactus.css'
import { Footer } from '../components/Footer';

export default function Contactus() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace this with your actual API endpoint
      const response = await axios.post('https://your-backend-api.com/contact', formData);
      console.log('Form submitted successfully:', response.data);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className='contactus'>
      <div className="contact-wrapper">
        {/* Left Info Section */}
        <div className="contact-left">
          <div className="info-item">
            <span className="icon">💬</span>
            <div  className='info-data'>
              <h4>Chat on us</h4>
              <p>Our friendly team is here to help.<br />info@studynotion.com</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📍</span>
            <div className='info-data'>
              <h4>Visit us</h4>
              <p>Akshya Nagar 1st Block 1st Cross,<br />Ramamurthy nagar, Bangalore-560016</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📞</span>
            <div className='info-data'>
              <h4>Call us</h4>
              <p>Mon - Fri From 8am to 5pm<br />+123 456 7869</p>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <form className="contact-right" onSubmit={handleSubmit}>
          <h2>Got a Idea? We've got the skills.<br />Let's team up</h2>
          <p>Tell us more about yourself and what you've got in mind.</p>

          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              placeholder="12345 67890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Enter your message here"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}
