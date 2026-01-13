import React, { useState } from 'react';
export const FAQ_DATA = [
  {
    category: 'Booking',
    question: "How do I book a holiday package?",
    answer: "You can book directly through our website by selecting your desired destination and clicking 'Book Now'. Alternatively, call our 24/7 concierge at 1-800-ADHVAGA."
  },
  {
    category: 'Cancellations',
    question: "What is your refund policy?",
    answer: "Cancellations made 30 days prior to departure receive a 100% refund. For cancellations within 15-29 days, a 50% refund applies. Inside 14 days, bookings are non-refundable."
  },
  {
    category: 'Payments',
    question: "Which payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, AMEX), PayPal, and direct bank transfers for premium packages."
  },
  {
    category: 'General',
    question: "Do you offer travel insurance?",
    answer: "Yes, we partner with leading insurance providers to offer comprehensive travel protection plans. You can add this during the checkout process."
  },
  {
    category: 'Booking',
    question: "Can I customize an existing itinerary?",
    answer: "Absolutely! Adhvaga Holidays specializes in 'Bespoke Journeys'. Contact our travel designers to tweak any package to your preference."
  }
];
import './FAQSection.css';

const FAQSection = () => {
  // Logic remains the same: first item open by default
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Find quick answers to common queries about your next adventure.
          </p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  className="faq-button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className="faq-question-content">
                    <span className="faq-category">
                      {item.category}
                    </span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <svg
                    className={`faq-icon ${isOpen ? 'rotate' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>
                
                <div className={`faq-answer-wrapper ${isOpen ? 'show' : ''}`}>
                  <div className="faq-answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;