import React, { useState } from 'react';
import './CustomTourForm.css';

const PURPOSE_OPTIONS = [
  { id: 'Honeymoon', icon: 'fa-heart', label: 'Honeymoon' },
  { id: 'Family', icon: 'fa-users', label: 'Family Vacation' },
  { id: 'Friends', icon: 'fa-glass-cheers', label: 'Friends Trip' },
  { id: 'Solo', icon: 'fa-user', label: 'Solo Travel' },
  { id: 'Corporate', icon: 'fa-briefcase', label: 'Business' },
  { id: 'Pilgrimage', icon: 'fa-om', label: 'Religious' }
];

const FOOD_OPTIONS = [
  { id: 'Veg', label: 'Pure Veg' },
  { id: 'Non-Veg', label: 'Non-Veg' },
  { id: 'Jain', label: 'Jain Food' }
];

const ACTIVITY_OPTIONS = [
  "Paragliding", "Scuba Diving", "Trekking", "City Tours", "Shopping", "Historical Sites", "Spa & Wellness"
];

const INITIAL_DATA = {
  fullName: '', phone: '', email: '', cityCountry: '',
  startDate: '', endDate: '', isDateFlexible: false,
  destination: '', isInternational: false,
  adults: 2, children: 0, childAges: '', infants: 0,
  budgetPerPerson: '₹30,000 - ₹50,000',
  travelPurpose: 'Family', hotelCategory: '4-star',
  roomType: 'Double', extraBedNeeded: false,
  transportMode: 'Flight', airportPickupDrop: true,
  cabPreference: 'Private', foodPreference: 'Veg',
  foodAllergies: '', mealPlan: 'Breakfast Only',
  mustVisit: '', activities: [], travelPace: 'Relaxed',
  specialRequirements: '', passportValid: true,
  visaStatus: 'Not Required / Done', insuranceNeeded: true,
  additionalNotes: ''
};

const CustomTourForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleToggleActivity = (act) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(act)
        ? prev.activities.filter(a => a !== act)
        : [...prev.activities, act]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="tour-form-container">
      {/* Brand Header */}
      <div className="brand-header">
        <i className="fa-solid fa-plane-departure bg-icon"></i>
        <div className="header-content">
          <h2>Custom Tour Planner</h2>
          <p>Tell us everything. We'll handle the rest.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* SECTION 1: CUSTOMER DETAILS */}
        <section className="form-section">
          <h3 className="section-title">
            <div className="section-icon"><i className="fa-solid fa-user"></i></div>
            1. Basic Customer Details
          </h3>
          <div className="grid-2">
            <div>
              <label className="label-text">Full Name</label>
              <input required className="input-field" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="John Doe" />
            </div>
            <div>
              <label className="label-text">WhatsApp Number</label>
              <input required className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="label-text">Email Address</label>
              <input required type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
            </div>
            <div>
              <label className="label-text">City & Country</label>
              <input required className="input-field" value={formData.cityCountry} onChange={e => setFormData({...formData, cityCountry: e.target.value})} placeholder="Mumbai, India" />
            </div>
          </div>
        </section>

        {/* SECTION 2: JOURNEY DETAILS */}
        <section className="form-section">
          <h3 className="section-title">
            <div className="section-icon"><i className="fa-solid fa-globe"></i></div>
            2. Destination & Travel Dates
          </h3>
          <div className="grid-2">
            <div className="col-span-2">
              <label className="label-text">Destination(s)</label>
              <input required className="input-field" value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} placeholder="Goa, Kerala, Dubai, Kashmir..." />
            </div>
            <div>
              <label className="label-text">Tour Category</label>
              <div className="toggle-group">
                <button type="button" onClick={() => setFormData({...formData, isInternational: false})} className={`toggle-btn ${!formData.isInternational ? 'active' : ''}`}>Domestic</button>
                <button type="button" onClick={() => setFormData({...formData, isInternational: true})} className={`toggle-btn ${formData.isInternational ? 'active' : ''}`}>International</button>
              </div>
            </div>
            <div>
              <label className="label-text">Date Flexibility</label>
              <div className="toggle-group">
                <button type="button" onClick={() => setFormData({...formData, isDateFlexible: true})} className={`toggle-btn ${formData.isDateFlexible ? 'active' : ''}`}>Flexible</button>
                <button type="button" onClick={() => setFormData({...formData, isDateFlexible: false})} className={`toggle-btn ${!formData.isDateFlexible ? 'active' : ''}`}>Fixed</button>
              </div>
            </div>
            <div>
              <label className="label-text">Start Date</label>
              <input type="date" className="input-field" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
            </div>
            <div>
              <label className="label-text">End Date</label>
              <input type="date" className="input-field" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
            </div>
          </div>
        </section>

        {/* SECTION 3: TRAVELERS */}
        <section className="form-section">
          <h3 className="section-title">
            <div className="section-icon"><i className="fa-solid fa-users"></i></div>
            3. Number of Travelers
          </h3>
          <div className="grid-4">
            <div>
              <label className="label-text">Adults</label>
              <input type="number" min="1" className="input-field" value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className="label-text">Children</label>
              <input type="number" min="0" className="input-field" value={formData.children} onChange={e => setFormData({...formData, children: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className="label-text">Infants</label>
              <input type="number" min="0" className="input-field" value={formData.infants} onChange={e => setFormData({...formData, infants: parseInt(e.target.value)})} />
            </div>
            <div style={{ opacity: formData.children > 0 ? 1 : 0.3, pointerEvents: formData.children > 0 ? 'auto' : 'none' }}>
              <label className="label-text">Age of Children</label>
              <input className="input-field" value={formData.childAges} onChange={e => setFormData({...formData, childAges: e.target.value})} placeholder="e.g. 5, 12" />
            </div>
          </div>
        </section>

        {/* SECTION 4: BUDGET & PURPOSE */}
        <section className="form-section">
          <h3 className="section-title">
            <div className="section-icon"><i className="fa-solid fa-wallet"></i></div>
            4. Travel Purpose & Budget
          </h3>
          <div className="grid-6" style={{ marginBottom: '2rem' }}>
            {PURPOSE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFormData({...formData, travelPurpose: opt.id})}
                className={`purpose-card ${formData.travelPurpose === opt.id ? 'active' : ''}`}
              >
                <i className={`fa-solid ${opt.icon}`}></i>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          <div className="grid-2">
            <div>
              <label className="label-text">Budget Range</label>
              <select className="input-field" value={formData.budgetPerPerson} onChange={e => setFormData({...formData, budgetPerPerson: e.target.value})}>
                <option>₹20,000 - ₹40,000 per person</option>
                <option>₹40,000 - ₹80,000 per person</option>
                <option>₹80,000 - ₹1,50,000 per person</option>
                <option>₹1,50,000+ per person</option>
              </select>
            </div>
            <div>
              <label className="label-text">Comfort Preference</label>
              <select className="input-field" value={formData.hotelCategory} onChange={e => setFormData({...formData, hotelCategory: e.target.value})}>
                <option value="3-star">Economy (3★ Hotels)</option>
                <option value="4-star">Standard (4★ Hotels)</option>
                <option value="5-star">Luxury (5★ Hotels)</option>
                <option value="Resort/Villa">Resort / Private Villa</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 5: PREFERENCES */}
        <section className="form-section">
          <h3 className="section-title">
            <div className="section-icon"><i className="fa-solid fa-utensils"></i></div>
            5. Accommodation & Food
          </h3>
          <div className="grid-3">
             <div className="col-span-1">
                <label className="label-text">Food Preference</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {FOOD_OPTIONS.map(opt => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFormData({...formData, foodPreference: opt.id})}
                            className={`toggle-btn ${formData.foodPreference === opt.id ? 'active' : ''}`}
                            style={{ padding: '0.75rem', border: '2px solid #f5f5f4', textAlign: 'left', paddingLeft: '1rem' }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
             </div>
             <div className="col-span-2">
                <div className="grid-2" style={{ marginBottom: '1rem' }}>
                    <div>
                        <label className="label-text">Room Type</label>
                        <select className="input-field" value={formData.roomType} onChange={e => setFormData({...formData, roomType: e.target.value})}>
                            <option>Single</option>
                            <option>Double</option>
                            <option>Twin Beds</option>
                        </select>
                    </div>
                    <div>
                        <label className="label-text">Extra Bed?</label>
                        <div className="toggle-group">
                            <button type="button" onClick={() => setFormData({...formData, extraBedNeeded: true})} className={`toggle-btn ${formData.extraBedNeeded ? 'active' : ''}`}>Yes</button>
                            <button type="button" onClick={() => setFormData({...formData, extraBedNeeded: false})} className={`toggle-btn ${!formData.extraBedNeeded ? 'active' : ''}`}>No</button>
                        </div>
                    </div>
                </div>
                <label className="label-text">Meal Plan</label>
                <select className="input-field" value={formData.mealPlan} onChange={e => setFormData({...formData, mealPlan: e.target.value})}>
                    <option>Breakfast Only</option>
                    <option>Half Board</option>
                    <option>Full Board</option>
                </select>
             </div>
          </div>
        </section>

        {/* SECTION 6: LOGISTICS & ACTIVITIES */}
        <section className="form-section">
          <h3 className="section-title">
            <div className="section-icon"><i className="fa-solid fa-car"></i></div>
            6. Transport & Sightseeing
          </h3>
          <div className="grid-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label className="label-text">Mode of Transport</label>
                    <select className="input-field" value={formData.transportMode} onChange={e => setFormData({...formData, transportMode: e.target.value})}>
                        <option>Flight</option><option>Train</option><option>Bus</option>
                    </select>
                </div>
                <div>
                    <label className="label-text">Airport Pickup?</label>
                    <div className="toggle-group">
                        <button type="button" onClick={() => setFormData({...formData, airportPickupDrop: true})} className={`toggle-btn ${formData.airportPickupDrop ? 'active' : ''}`}>Required</button>
                        <button type="button" onClick={() => setFormData({...formData, airportPickupDrop: false})} className={`toggle-btn ${!formData.airportPickupDrop ? 'active' : ''}`}>Not Required</button>
                    </div>
                </div>
            </div>
            <div>
                <label className="label-text">Activities</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {ACTIVITY_OPTIONS.map(act => (
                        <button
                            key={act}
                            type="button"
                            onClick={() => handleToggleActivity(act)}
                            className={`activity-tag ${formData.activities.includes(act) ? 'active' : ''}`}
                        >
                            {act}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </section>

        {/* Final Submission */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid #f5f5f4', paddingTop: '3rem' }}>
          <p style={{ color: '#a8a29e', fontSize: '0.75rem', textAlign: 'center', marginBottom: '1.5rem', maxWidth: '320px' }}>
            Our AI Travel Specialist will analyze every detail to craft your itinerary.
          </p>
          <button type="submit" className="submit-btn">
            CREATE MY DREAM TOUR
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </button>
          <div className="footer-tags">
            <span>Free Planning</span> <div className="dot"></div>
            <span>No Obligation</span> <div className="dot"></div>
            <span>Expert Curated</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomTourForm;