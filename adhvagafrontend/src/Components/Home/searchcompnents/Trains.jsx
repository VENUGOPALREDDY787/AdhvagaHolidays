import { useState } from "react";
import "./Trains.css";

function Trains() {
  const [from, setFrom] = useState("New Delhi");
  const [to, setTo] = useState("Mumbai Central");

  return (
    <div className="content train-content">

      {/* Main Grid */}
      <div className="grids train-grid">

        <div className="cellbox">
          <p>Depart From</p>
          <h3>{from}</h3>
          <span>NDLS</span>
        </div>

        {/* Swap Icon */}
        <div className="swap-box">
          ⇄
        </div>

        <div className="cellbox">
          <p>Going To</p>
          <h3>{to}</h3>
          <span>BCT</span>
        </div>

        <div className="cellbox">
          <p>Depart Date</p>
          <h3>28 <small>Dec' 25</small></h3>
          <span>Sunday</span>
        </div>

      </div>

      {/* Search Button */}
      <div className="train-search">
        <button className="search-btn">SEARCH</button>
      </div>

    </div>
  );
}

export default Trains;
