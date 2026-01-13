import React from "react";
import "./SpecialOffers.css";
const OFFERS = [
  {
    id: 1,
    title: "Mauritius Holiday Packages",
    desc: "Complimentary Catamaran Cruise",
    price: "Starting price INR 79990",
    info: "Inclusive of Airfare",
    img: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?q=80&w=2070&auto=format&fit=crop",
    category: "Holidays",
  },
  {
    id: 2,
    title: "Amazing Thailand",
    desc: "Holiday Packages",
    price: "Starting at 15,500 Per Person",
    info: "Limited Time Offer",
    img: "https://images.unsplash.com/photo-1528181304800-2f140819898f?q=80&w=2070&auto=format&fit=crop",
    category: "Holidays",
  },
  {
    id: 3,
    title: "Holidays in Saudi Arabia",
    desc: "Spectacular Saudi",
    price: "Customizable Packages",
    info: "Explore the Kingdom",
    img: "https://images.unsplash.com/photo-1586724230419-440a5a30f372?q=80&w=2070&auto=format&fit=crop",
    category: "Holidays",
  },
  {
    id: 4,
    title: "Swiss Alps Adventure",
    desc: "Lucerne & Interlaken",
    price: "Starting at INR 1,20,000",
    info: "7 Days / 6 Nights",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    category: "Holidays",
  },
];

const CATEGORIES = [
  "All",
  "Flights",
  "Hotels",
  "Holidays",
  "Buses",
  "Rajasthan Attractions",
];

function SpecialOffers() {
  return (
   <div className="container  mb-5" style={{backgroundColor:"white", borderRadius:"20px"}}>
    <div className="offers  ps-5 pe-5 ">
         <div className="head ms-3 mt-5"><h2>Special Offers</h2></div>
  <div className="horizontal-scroll ">

    {OFFERS.map((offer) => (
      <div className="card mb-3 scroll-card" key={offer.id}>
        <div className="row g-0 h-100">
          
          <div className="col-md-5">
            <img
              src={offer.img}
              className="img-fluid h-100 rounded-start"
              alt={offer.title}
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title">{offer.title}</h5>
                <p className="card-text">{offer.desc}</p>
              </div>

              <div>
                <p className="fw-semibold mb-1">{offer.price}</p>
                <small className="text-body-secondary">{offer.info}</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    ))}

  </div>
  <div className="mb-2"><h2>View Offers</h2></div>
  </div>
</div>

  );
}

export default SpecialOffers;
