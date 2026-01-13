import { useState } from "react";
import "./Hotels.css";

function Hotels() {
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  return (
    <div className="content">

      {/* Main Grid */}
      <div className="grids hotel-grid">

        <div className="cellbox">
          <p>City / Hotel</p>
          <h3>Goa</h3>
          <span>India</span>
        </div>

        <div className="cellbox">
          <p>Check-in</p>
          <h3>28 <small>Dec' 25</small></h3>
          <span>Sunday</span>
        </div>

        <div className="cellbox">
          <p>Check-out</p>
          <h3>29 <small>Dec' 25</small></h3>
          <span>Monday</span>
        </div>

        <div className="cellbox">
          <p>Room & Guests</p>
          <h3>{rooms} Room, {guests} Guests</h3>
          <span>{guests} Adults</span>
        </div>

      </div>

      {/* Bottom */}
      <div className="bottom">
        <div className="categories">
          {["Business", "Couple Friendly", "Family", "Budget"].map((c) => (
            <button key={c}>{c}</button>
          ))}

          <label className="checkbox">
            <input type="checkbox" />
            Free Cancellation
          </label>
        </div>

        <button className="search-btn">SEARCH HOTELS</button>
      </div>

    </div>
  );
}

export default Hotels;
