import React, { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { BASE_URL } from '../../config/api';
import './WhatsAppModal.css';

const WhatsAppModal = ({ isOpen, onClose }) => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    termsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const whatsappNumber = (settings.whatsappNumber || settings.contactNumber).replace(/[\s\-\(\)\+]/g, '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      setError('Please enter your name and phone number');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions to proceed');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/api/whatsapp-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit');
      }

      // Success - open WhatsApp with pre-filled message
      const userMessage = formData.message 
        ? `Hi Adhvaga Holidays, I'm ${formData.name}. ${formData.message}`
        : `Hi Adhvaga Holidays, I'm ${formData.name}. I'd like to inquire about your travel packages.`;
      
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(userMessage)}`;
      window.open(whatsappLink, '_blank');
      
      // Reset and close
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        termsAccepted: false
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="whatsapp-modal-overlay" onClick={onClose}>
      <div className="whatsapp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <div className="whatsapp-icon">💬</div>
          <h2>Chat with Us on WhatsApp</h2>
          <p>Please provide your details before we connect</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Email (Optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Your Query (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're looking for..."
              rows={3}
            />
          </div>

          <div className="terms-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              <span className="terms-text">
                I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and 
                consent to be contacted via WhatsApp for travel-related inquiries.
              </span>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Please wait...' : 'Continue to WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppModal;
