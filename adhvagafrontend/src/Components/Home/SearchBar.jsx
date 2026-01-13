import { useState } from "react";
import './SearchBar.css';
import Flights from "./searchcompnents/Flights";
import Hotels from "./searchcompnents/Hotels";
import Trains from "./searchcompnents/Trains";
import Holidays from "./searchcompnents/Holidays";

const TravelMode = {
  FLIGHTS: "flights",
  HOTELS: "hotels",
  HOLIDAYS: "holidays",
  BUS: "bus",
  TRAINS: "trains",
  CABS: "cabs",
};

const TABS = [
  { id: TravelMode.FLIGHTS, icon: <i class="fa-solid fa-plane"></i>, label: "Flights" },
  { id: TravelMode.HOTELS, icon: <i class="fa-solid fa-hotel"></i>, label: "Hotels" },
  { id: TravelMode.HOLIDAYS, icon:<i class="fa-solid fa-umbrella-beach"></i>, label: "Holidays" },
  { id: TravelMode.BUS, icon: <i class="fa-solid fa-bus"></i>, label: "Bus" },
  { id: TravelMode.TRAINS, icon: <i class="fa-solid fa-train"></i>, label: "Trains" },
  { id: TravelMode.CABS, icon: <i class="fa-solid fa-car"></i>, label: "Cabs" },
];

function Searchbar() {
     const [activeTab, setActiveTab] = useState(TravelMode.FLIGHTS);
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <div className="search-container">
            <div className="tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab ${
                    activeTab === tab.id ? "active" : "nonactive"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
              {activeTab ==TravelMode.FLIGHTS && <Flights/>}
              {activeTab ==TravelMode.HOTELS && <Hotels/>}
              {activeTab ==TravelMode.TRAINS && <Trains/>}
              {activeTab ==TravelMode.HOLIDAYS && <Holidays/>}
               {activeTab ==TravelMode.BUS && <Trains/>}
                {activeTab ==TravelMode.CABS && <Trains/>}
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-10 offset-1 offer">
                 <div className="promo">
        {/* <span className="badge"> <b>New</b> </span> */}
        Winter Travel Fest is Now Live!
      </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Searchbar;
