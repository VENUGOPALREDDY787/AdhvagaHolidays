import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  if (status === 'success') {
    return (
      <div className="success-container">
        <div className="success-icon-circle">
          <svg className="spinner-icon" style={{width: '2rem', height: '2rem'}} fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#064e3b', marginBottom: '0.5rem'}}>
          Message Sent Successfully!
        </h3>
        <p style={{color: '#15803d'}}>Our travel experts will get back to you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="reset-button">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5 mb-5 pb-5">
    <div className="contact-container">
      <h3 className="form-title">Drop us a line</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid-row">
          <div className="form-group">
            <label className="input-label">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="input-label">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="john@example.com"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">Subject</label>
          <select className="form-select">
            <option>General Inquiry</option>
            <option>Booking Modification</option>
            <option>Billing Question</option>
            <option>Feedback & Suggestions</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="input-label">Your Message</label>
          <textarea 
            required
            rows={4}
            placeholder="Tell us how we can help you..."
            className="form-textarea"
            style={{resize: 'none'}}
          ></textarea>
        </div>

        <button 
          disabled={status === 'submitting'}
          type="submit"
          className="submit-button"
        >
          {status === 'submitting' ? (
            <>
              <svg className="spinner" viewBox="0 0 24 24">
                <circle style={{opacity: 0.25}} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"></circle>
                <path style={{opacity: 0.75}} fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : 'Send Message'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactForm;