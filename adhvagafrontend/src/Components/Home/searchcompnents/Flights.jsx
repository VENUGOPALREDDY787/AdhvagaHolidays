import { useState } from "react";
import "./Flights.css"; 
function Flights() {
    const [tripType, setTripType] = useState("one-way");
    return ( <div className="content">

          {/* Trip Type */}
          <div className="trip-types">
            {["one-way", "round-trip", "multi-city"].map((type) => (
              <label key={type} className="trip-option">
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                />
                <span className={`radio ${tripType === type ? "checked" : ""}`}></span>
                <span className="trip-label">{type.replace("-", " ")}</span>
              </label>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grids">

            <div className="cellbox">
              <p>Departure From</p>
              <h3>New Delhi</h3>
              <span>DEL, Indira Gandhi International...</span>
            </div>

            <div className="cellbox">
              <p>Going To</p>
              <h3>Mumbai</h3>
              <span>BOM, Chhatrapati Shivaji Int...</span>
            </div>

            <div className="cellbox">
              <p>Departure Date</p>
              <h3>25 <small>Dec' 25</small></h3>
              <span>Thursday</span>
            </div>

            <div className="cellbox">
              <p>Return Date</p>
              <span className="highlight">Book Round Trip to save extra</span>
            </div>

            <div className="cellbox">
              <p>Travellers & Class</p>
              <h3>1 Traveller</h3>
              <span>Economy</span>
            </div>

          </div>

          {/* Bottom */}
          <div className="bottom">
            <div className="categories">
              {["Regular", "Student", "Armed Forces", "Senior Citizen"].map((c) => (
                <button key={c}>{c}</button>
              ))}
              <label className="checkbox">
                <input type="checkbox" />
                Non-Stop Flights
              </label>
            </div>

            <button className="search-btn">SEARCH</button>
          </div>

        </div> );
}

export default Flights;