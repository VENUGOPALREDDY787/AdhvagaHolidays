import React from "react";
import "./PopularDestinations.css";

const domesticDestinations = [
  { city: "Mumbai", price: "9,401", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=300&h=450" },
  { city: "Bangalore", price: "11,198", image: "https://images.unsplash.com/photo-1596422846543-75c6fc1852ea?auto=format&fit=crop&w=300&h=450" },
  { city: "Pune", price: "9,655", image: "https://images.unsplash.com/photo-1567103473247-68c6502098e1?auto=format&fit=crop&w=300&h=450" },
  { city: "Kolkata", price: "7,997", image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=300&h=450" },
  { city: "Hyderabad", price: "8,199", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&h=450" },
  { city: "Goa", price: "9,504", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&h=450" },
  { city: "Chennai", price: "10,745", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&h=450" },
  { city: "Ahmedabad", price: "7,123", image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=300&h=450" }
];

const internationalDestinations = [
  { city: "Top Destination...", image: "https://images.unsplash.com/photo-1464817739973-0128fe79aa1b?auto=format&fit=crop&w=300&h=450" },
  { city: "Asia", image: "https://images.unsplash.com/photo-1535139262971-c3f8477c21bf?auto=format&fit=crop&w=300&h=450" },
  { city: "Middle East", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&h=450" },
  { city: "Africa", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=300&h=450" },
  { city: "Europe", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=300&h=450" },
  { city: "North America", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=300&h=450" },
  { city: "Hyderabad", price: "8,199", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&h=450" },
  { city: "Goa", price: "9,504", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&h=450" },
  { city: "Chennai", price: "10,745", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&h=450" },
  { city: "Ahmedabad", price: "7,123", image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=300&h=450" }

];

const SectionHeader = ({ type, from }) => (
  <div className="section-header">
    <div className="header-left">
      <div className="return-option">
        <span>Return</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>

      <h2>Flights to Popular {type} Destinations from</h2>

      <div className="from-option">
        <span>{from}</span>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </div>

    <button className="arrow-btn">
      <i className="fa-solid fa-chevron-right"></i>
    </button>
  </div>
);

const DestinationCard = ({ dest }) => (
  <div className="destination-card">
    <img src={dest.image} alt={dest.city} />
    <div className="overlay"></div>

    <div className="city-name">{dest.city}</div>

    {dest.price && (
      <div className="price">
        <p>Starting from</p>
        <h4>₹{dest.price}</h4>
      </div>
    )}
  </div>
);

const PopularDestinations = () => {
  return (
    <div className="container mt-5  pt-5">
    <div className="popular-wrapper">

      <section>
        <SectionHeader type="Domestic" from="Delhi" />
        <div className="cards-row">
          {domesticDestinations.map((dest, index) => (
            <DestinationCard key={index} dest={dest} />
          ))}
        </div>

        <div className="see-all">
          <a href="#">See all the locations</a>
        </div>
      </section>

      <section>
        <SectionHeader type="International" from="Delhi" />
        <div className="cards-row">
          {internationalDestinations.map((dest, index) => (
            <DestinationCard key={index} dest={dest} />
          ))}
        </div>
      </section>

    </div>
    </div>
  );
};

export default PopularDestinations;
