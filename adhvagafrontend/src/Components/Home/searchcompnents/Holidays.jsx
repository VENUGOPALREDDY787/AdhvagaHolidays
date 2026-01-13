import { useState } from "react";
import "./Holidays.css";

function Holidays() {
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Ladakh");
  const [month, setMonth] = useState("Select Month");

  return (
    <div className="content holidays-content">

      {/* Main Grid */}
      <div className="grids holidays-grid">

        <div className="cellbox">
          <p>Depart From</p>
          <h3>{from}</h3>
          <span>&nbsp;</span>
        </div>

        <div className="cellbox">
          <p>Going To</p>
          <h3>{to}</h3>
          <span>&nbsp;</span>
        </div>

        <div className="cellbox">
          <p>Month of Travel (Optional)</p>
          <h3 className="muted">{month}</h3>
          <span className="dropdown-arrow">⌄</span>
        </div>

      </div>

      {/* Search */}
      <div className="holiday-search">
        <button className="search-btn">SEARCH</button>
      </div>

    </div>
  );
}

export default Holidays;
