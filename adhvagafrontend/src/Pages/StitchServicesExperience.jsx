import useCinematicEffects from "./useCinematicEffects";
import { useNavigate } from "react-router-dom";
import "./StitchServicesExperience.css";

const dotItems = [
  { href: "#services-hero", title: "Welcome" },
  { href: "#services-air-tickets", title: "Air Tickets" },
  { href: "#services-visa", title: "Visa Assistance" },
  { href: "#services-insurance", title: "Travel Insurance" },
  { href: "#services-corporate", title: "Corporate Services" },
  { href: "#services-customs", title: "Customs Services" },
  { href: "#services-car-rentals", title: "Car Rentals" },
  { href: "#services-domestic", title: "Domestic Holidays" },
  { href: "#services-international", title: "International Holidays" },
];

const sectionBackgrounds = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlgZLFf5payvzEnN2vzZD3t3z1PZ9bcyjqjsp1BlnNW0wI7w3ADKBNM9WCKp_-GPMgKfy0SVmX9Cl6r1JbyturLisu32B3Y0eQtJnpNgWjDy2DZCLT8WG0S6Xxqfcq-aLG5_OOYQoODMf2DyC48qg3mZK5VZ6_Ozse6d4vTxgiz8EANoIcFb_SKjH1cT4bYR3qX5C9XqnC4j4ba57pSzAZOPyM-SJ9vGuHl2Tv1H2dDoi_v_iFmAWq74Ifv3V3gtaMZQOXako1gJ61",
  airTickets: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtW0Faa2bxo4c7WzKrJ3sq_AZjpotrJdB7ZxLW6jo8z8F36sD_gyZ728eDDX-72U04usHaSR6wMB6KKwyAO1x1X58uCNzBeFGu6BazVfuwZmgSC-_6woJ6sWnseXEjjYY5wYewZXQ3OCwXizqcOO1IQEm-9vY3qs2D9f8p7W7qIhYnGYNqFyFnyqAiNeRK4oa1ooSF1-zs14MCE0b0Txk66FBiOSrdZwmaAb-b-fk0crEFXKZIuBMXTd5XoRtVCKTjDJkaRVxcEPfV",
  visa: "https://lh3.googleusercontent.com/aida-public/AB6AXuB73OIJwNxtFZGnXeYi-qt7VYDoGOkE8kfKKlNEo7hzhnxmlbvcqFtwMFbSaU-VtWVmUu_5LhDtNU_x7a_5YGMHg9qZWltJT6ufExPCDAMpN_o45Jkv3Z2DDcFIj4EsJEn3-AC7NLXEpSnBwm_oThlR9iUdL3Lo2hWraJ10HAV8865-jCnzVyh-agvny4_BzmvH35qoqqDKSedMa2-XQwh3QXdm3PajkIKxOc6Ss0L7PZlS6b3gNQYbrNq704S5maAPxnF2mWyUv_JJ",
  insurance: "https://lh3.googleusercontent.com/aida-public/AB6AXuAih4Bkqgfe42FBFHOkQr0in1svOwQjDK4sT9Vk9dbaBpL8d4Ffl2ZqfihNwIZWoQI5tg6_ZWw-XtmKYLLep8UduLCGsPt_kRTMa3PRnAAW3Y8mBTRkvuhFI5E450JU-dL6xYRtIo5eIceTWH5aLWhxE-PpJXAUfZz570_uNSaSuBr8ub03R9Al09LK6tZrt9ruyJFjpMS83f7p0rHvNmxW7LLsOkFXuzjkCul06UqTquByHhDr2fYPR4cjBpnAqAVUEk3STWfJBoiC",
  corporate: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM4mFWe54J7RW2_FyoRsfBboyr7-615ZxCGwQVTh4itWoZW_Nw-ixSfJczbYt5iLcOXtb2Qi2Knn6VOYZfm8-J-QYhIunSHq9oGx5OzIrVugYnjpGms9D0NOhPHdrOnMd5mtAI_v7dWAGPRIiHv7UztHstWeSsu71Em_8Z5CmbouzArv-g8TGxgGQrKxpTxaCB5v_FyZClGjcZL5MBhS5Xz8M4IozHj87G5E3AQbSDLsMGxMAl--F4kQ8HDJN4n0pBgP5YJ-nSSBsK",
  customs: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM274Rk5aJPZFqfvvpmsp6SdvAIDEuTmzrqXWlQ0Se5wQakxiXkDcnBA2HDZ8sKKw3DQne7LUhZZNPVubNCaA1JOz_ufUBGa_iPCUT1Y9yiRFKbY0TZIG3tRRPbHQmsur1NRAJMCh16piyKcRwGYSj-hl3bQOT7kGmqLLeOp8IXKoQYK5kG5uwEtA9tnBf_xfMq2dF1mx7-7HBbbxPqPqT0uf4p3Eb80af32iIuWWLHR2Cd-XLZn9ZfnQkG5KY14vP5x1cW6Plz7lU",
  carRentals: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFRX9YHgbv8G8ch355XwSEd42QF7Iby7-KalD9Yieas8TVjXlPXY9r_wF5_31yn7ZLgPuQSx3cukc-Im7-L4L2R0Hs3AxoO1749E2pCLY3gEOesG3_v1SzedVlkk7lc_6S3sSZW5-llHhx1ESuM-F6SM8DeHZp5GzAkzu0a_Z6pIcqQc8NMg7aDjQyE1P3bu4R5j_HW4BnIu-LkTQKzsup9nMyiRFnmoynnNV50URZ29DGKxAqs06vj3KElW9ENhDDPIhQm7KurR67",
  domestic: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEgtRHaeImRJCyUtRdxeZk1r3EvBBealZdOiGVsWfpeCHEl_R0VtWorQ1Y1W1MqgF_5dkqLvdfZmTRZzlYqPTFoDXzN6esJ2qTuvVjWVzuk3gcibTfJxKX5h-ymkA37Sjpc_XgFL4jj336qToRgAA1W_ZdWy_cpFpXfF12gEqyecTDIJGzfEA9XG4oo_9NjNHQ_hSV1HpsT97PneAPBizKC6GjKXKT9EesxSVzm4OfeDeHbBGpghRapxOlhIGymVmNn6R3FsJgXRl7",
  international: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw5dsdUNiCQV_4XhXlxAVSIS925sEOBpxn4aE_uODpANt0PzTmv29IbmDsZDG3jzY7FZsXR3x92PIs6T3PzoJG8wDQ1Hb8GJ2nrxSbGSQYD2sKq-U9bPVsStPIHn3lCC1HYnrIvoASQv_QMXmOQJVwZeNVl6YEtKNkvA13wVzqT4ZSHyw8NQ7oKWMzEkPZu9XGBPJOIXXQUa6X4jaMwGSp4W3LCoGD_8Ie4FNXsg3Go4PbnVYGLBd-6fIgEf6xBEGMAIAx06cys1TW",
};

const internationalCards = [
  {
    region: "Europe",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvONaf2zmtiXwWZGXvYe7ohnkMXjsDvpsYUdS_xYCANd-kZx2WHSsIVda0dXy_mdCmb6VaCn5MGZS_Xrhs0QlhBErvgosWHDANWKDwPXQhmGYx2_4tziJ__ZaQ8lXYjTfIAE8bJnLTKNCKeGHKbLGfplmGdsuAVpjsWejAI4JqtK0Xd_nNZ0aQ1bqnlihXhN8a3DmGH9lmiqydjFTDmpDyqTum2I4mPyA4XK9rWyXMpfgNPaqGZLDEj4Pk044pdl4o7MKP4HkZ5a44",
  },
  {
    region: "Tropics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNzlInN63LYRClqlk-bRO-rEg4HJHfJwaEcamytB6ogFEydq3rgXeLetXeiqtP_fmaD45n7RK8682nlFicMdZoo0JWc5u6JeQ8unuKk8u4_HZw-nkWDf12Ird_Xn9jLvMG9qVHpJa-lrZ-cp8ITa1A6Wi3iL3GDB_GDKcgYnR6qYVRCa7VGIVYcaqtjmZ5NRmXmidudSW5lxa2X3nfc093ZLtbzX7gyLVEX7fH28uTLzOCBACrnZacoM55hTYBGxzVENEIYjZu0svc",
  },
  {
    region: "Metropolis",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOfm6qkudTJXfgCbEFd2iTYh2QAAA61p4QJ-78wMcasjDQcSjG-hIKeatFe60PNOT-hVOcnAWYNnBvpN14Zk4rak9tg4dtN2ieEuzcNe6P9gbMmVQGGLE-_-nj-7FBgcowPI05IRHJ5MD1hDd5GBEqzjLbnbkRSAnQH_wWldOpFX3NUU6f85a1-EEuwLeWKf0dnvvivFDJsza7OdVJTo3YPdy2CSVHh7ytgNQaGcMqRnbghdcgPG9XVsav5YNrswoum04BTDKnYr4Q",
  },
  {
    region: "Wilderness",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCW2b3wynr6sbf9q9OUUHWQK1ySs60DH5bzhs8TWml8SKb6RdQhtjjBSAPgjHVuqlri4LVrzRumiAi3OKW18dD4peuxt7_WdJui5h_TQcKd34bD4YHgqBlN6BLj4Rj0SgAlBgtjmYcOnvTnjBFrLZB_SLYWg_01TPj_j-Y469apIiKp2xg5c-8lIeReOu_duNiwKzWbLrlS5a5KpiVcGQiBvgeNvwWBGB3CxDQdyY2wE_GbUmIb293x1fZE4AxnscIRyfLUDQQmK4cC",
  },
];

export default function StitchServicesExperience() {
  const navigate = useNavigate();

  useCinematicEffects();

  const handleServiceBooking = (serviceName) => {
    navigate("/Support", {
      state: {
        fromServiceBooking: true,
        serviceName,
      },
    });
  };

  return (
    <div className="cinematic-page svc-page">
      <div className="svc-dot-nav" aria-label="Section navigation">
        {dotItems.map((item, index) => (
          <a
            key={item.href}
            className={`cine-dot ${index === 0 ? "active" : ""}`}
            href={item.href}
            title={item.title}
            aria-label={item.title}
          />
        ))}
      </div>

      <div className="svc-left-tab" aria-hidden="true">
        <span>EXPLORE</span>
      </div>

      <main>
        <section id="services-hero" className="svc-section svc-hero">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.hero}')` }} />
          <div className="svc-overlay svc-overlay-hero" />
          <div className="svc-container svc-center" data-reveal>
            <div className="svc-eyebrow-wrap">
              <div className="svc-line" />
              <span className="svc-eyebrow">Our Services</span>
            </div>
            <div className="svc-title-wrap">
              <h1 className="svc-title">SERVICES</h1>
              <span className="svc-script">Curated Excellence</span>
            </div>
            <p className="svc-hero-subtext">Bespoke Journeys Crafted for the Discerning Explorer</p>
          </div>
          <a className="svc-scroll-indicator" href="#services-air-tickets" aria-label="Scroll to next section">
            <span>Scroll to Discover</span>
            <span className="svc-scroll-arrow" aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="services-air-tickets" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.airTickets}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Fly Anywhere, Anytime</span>
            <h2 className="svc-heading">Air Tickets</h2>
            <div className="svc-grid-two">
              <div>
                <p className="svc-text">
                  Elevating the journey before you even leave the ground. Our global network ensures
                  access to premier cabins and exclusive flight paths tailored to your itinerary.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Air Tickets")}>Book This Service</button>
              </div>
              <div className="svc-metric-grid svc-metric-grid-left">
                <div>
                  <h4>Global Reach</h4>
                  <p>Connecting 180+ Hubs</p>
                </div>
                <div>
                  <h4>First Class</h4>
                  <p>Curated In-flight Care</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services-visa" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.visa}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block svc-right" data-reveal>
            <span className="svc-script svc-script-right">Hassle-Free Processing</span>
            <h2 className="svc-heading">Visa Assistance</h2>
            <div className="svc-grid-two">
              <div className="svc-metric-grid svc-metric-grid-right">
                <div>
                  <h4>Fast Track</h4>
                  <p>Priority Government Filings</p>
                </div>
                <div>
                  <h4>Concierge</h4>
                  <p>Dedicated Case Managers</p>
                </div>
              </div>
              <div>
                <p className="svc-text">
                  Navigating complex international borders with ease. Our legal team simplifies
                  documentation, ensuring your entry into over 150 countries is seamless.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Visa Assistance")}>Book This Service</button>
              </div>
            </div>
          </div>
        </section>

        <section id="services-insurance" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.insurance}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Travel with Confidence</span>
            <h2 className="svc-heading">Insurance</h2>
            <div className="svc-grid-two">
              <div>
                <p className="svc-text">
                  Beyond the basics. We provide comprehensive protection that covers elite medical
                  emergencies, luxury item loss, and high-stakes cancellations.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Travel Insurance")}>Book This Service</button>
              </div>
              <div className="svc-glass-panel">
                <div className="svc-panel-row">
                  <span>Coverage</span>
                  <strong>$2M+ Premium</strong>
                </div>
                <div className="svc-panel-row">
                  <span>Global Support</span>
                  <strong>24/7 Hotline</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services-corporate" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.corporate}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-center" data-reveal>
            <span className="svc-script svc-script-center">Smart Business Solutions</span>
            <h2 className="svc-heading">Corporate</h2>
            <div className="svc-card-grid">
              <article className="svc-card">
                <span className="material-symbols-outlined">analytics</span>
                <h3>Policy Optimization</h3>
                <p>Maximize efficiency with data-driven travel logistics.</p>
              </article>
              <article className="svc-card">
                <span className="material-symbols-outlined">group</span>
                <h3>MICE Events</h3>
                <p>Bespoke conferences and incentive tours globally.</p>
              </article>
              <article className="svc-card">
                <span className="material-symbols-outlined">receipt_long</span>
                <h3>Expense Mgmt</h3>
                <p>Unified billing for global corporate enterprises.</p>
              </article>
            </div>
            <button type="button" className="svc-btn svc-btn-center" onClick={() => handleServiceBooking("Corporate Services")}>Book This Service</button>
          </div>
        </section>

        <section id="services-customs" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.customs}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <div className="svc-grid-two svc-grid-two-wide">
              <div>
                <span className="svc-script svc-script-left">Smooth Clearance</span>
                <h2 className="svc-heading svc-heading-customs">Customs</h2>
                <p className="svc-text">
                  Elite cargo and personal goods logistics. We manage the delicate complexities of
                  international import and export laws for your valuables.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Customs Services")}>Book This Service</button>
              </div>
              <div className="svc-feature-stack">
                <article>
                  <h4>White-Glove Handling</h4>
                  <p>For fine art and luxury assets.</p>
                </article>
                <article>
                  <h4>Duty Optimization</h4>
                  <p>Strategic tax and tariff management.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="services-car-rentals" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.carRentals}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Your Ride, Your Schedule</span>
            <h2 className="svc-heading">Car Rentals</h2>
            <div className="svc-rental-panel">
              <div>
                <h4>Luxury Fleet</h4>
                <p>
                  Access to the world's most prestigious marques: Bentley, Rolls-Royce, and
                  high-performance supercars in every major city.
                </p>
                <ul>
                  <li>+ Chauffeur Options</li>
                  <li>+ Armored Transport</li>
                  <li>+ Airport Concierge</li>
                </ul>
              </div>
              <div className="svc-rental-cta">
                <p>Drive the Extraordinary</p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Car Rentals")}>Book This Service</button>
              </div>
            </div>
          </div>
        </section>

        <section id="services-domestic" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.domestic}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-block" data-reveal>
            <span className="svc-script svc-script-left">Discover India</span>
            <h2 className="svc-heading">Domestic</h2>
            <div className="svc-grid-two svc-grid-two-wide">
              <div>
                <p className="svc-text">
                  Unveiling the hidden soul of the subcontinent. From the palaces of Rajasthan to the
                  serene backwaters of Kerala.
                </p>
                <button type="button" className="svc-btn" onClick={() => handleServiceBooking("Domestic Holidays")}>Book This Service</button>
              </div>
              <div className="svc-image-stack">
                <article>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_2U150PRfl12h88t2rzmkdwCsOghwnWIxha7WMLMCtYp45m61oyMRvXochj3PGwdMsZuHj5eeX0ubXb6VV1l048uO7hCyDA0BrAAe5OCw2M3kJ2eu1j4MPil8Rp3NOUVMCDKxNDqSWSeKdogJ15--44vF0GGIuCbVqnsCGR3SPXMZP1jj66dnMUDktxiwv9pV_2KTO4z88LvYkSEhNE1Fs-VRb4T4qCgtJmSETssfHnynfL0ey2rpEmLTlsG5H8MtQh0b6vTCJATQ"
                    alt="Heritage Trails"
                  />
                  <span>Heritage Trails</span>
                </article>
                <article>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuChXBPKdBsQSO_UQvMMTf9-jLCSyqO85TI1NqIsY_5vStgV9oD6o2exRGWnm7mTnjrlDTSfn_xRuC4Gow5BTyzij_Rfo39eVG_zq5NZw_zr7rAEu9mPZ5j6aLH-1eGo4QleiZD11ER-Q1GbicXTBZge9BhbrqduRP4fpRgce8RrAVbNmYKmUfz9X-IxXWpgDBBxCs58gG1Mq5wuWh1YmMqFG_n5OMT9j2wndxB8onr1_Y5NASgOdwn3prQcLy85wc3-2AAeE0Z0wI-k"
                    alt="Nature Retreats"
                  />
                  <span>Nature Retreats</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="services-international" className="svc-section">
          <div className="svc-bg" style={{ backgroundImage: `url('${sectionBackgrounds.international}')` }} />
          <div className="svc-overlay" />
          <div className="svc-container svc-center" data-reveal>
            <span className="svc-script svc-script-center">The World is Closer</span>
            <h2 className="svc-heading">International</h2>
            <p className="svc-text" style={{ margin: "0 auto 2.4rem", textAlign: "center" }}>
              Our curated international packages open borders safely, with seamless global flights, 
              local hosts, and handpicked premium properties spanning across the continents.
            </p>
            <div className="svc-intl-grid">
              {internationalCards.map((card) => (
                <article key={card.region}>
                  <img src={card.image} alt={card.region} />
                  <span>{card.region}</span>
                </article>
              ))}
            </div>
            <button type="button" className="svc-btn svc-btn-center" onClick={() => handleServiceBooking("International Holidays")}>Book This Service</button>
          </div>
        </section>
      </main>
    </div>
  );
}
