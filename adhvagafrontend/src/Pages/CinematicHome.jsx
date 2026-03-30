import { Link } from "react-router-dom";
import { useState } from "react";
import useCinematicEffects from "./useCinematicEffects";
import {
  CinematicCursor,
  CinematicHeader,
  CinematicRightTab,
  CinematicSideDots,
} from "./CinematicLayout";
import "./CinematicExperience.css";

const dots = [
  { id: "home", label: "Home" },
  { id: "destinations", label: "Destinations" },
  { id: "packages", label: "Packages" },
  { id: "about", label: "About" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const destinationCards = [
  {
    label: "High Altitude",
    title: "Swiss Alps Traverse",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDu9mva_f9EtRFYYBuaSizibmbJ7Q0ctQpvJDzBvilHwYhcUcXHc5dxLJAlpcw0I8Ifkxla6rjtqvMEk6QQq_xViU6CyfKQ4RS7DGmU3AgmhjpDv7LWNGxzEvjA9s36yjf5RHIK5IbPQrxhPe_OADeUzw0bIoinHQVKsV_eyuEgO4KhaWy7N1eZCZ8mNJReh7GQhaHNwEHwZyUHOhY95XPYCJ74lBXfK5iW3CmrphaeCQuF5OO2d8iVVrkJSossEMdr3Vji6ONUtr8o",
  },
  {
    label: "Deep Green",
    title: "Amazon Basin Trek",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMnG1dOoXaSo1C-XPELNMb0EQnSQpZdQ9OtKBYqasLevgA0P9v8o5QZHzUl77KtXntIRpCwKe59QlKRViQdS31w9UNw0mP3qRe_EhiBp2wZKncKftrE00RrJ3DyPZsUmGJ33a8zY16dRd1F63zLJmoucGdj4DEfFV1KbLt8qM7Je44ZIwzAV8pnplE8mucKOjwCG6VRvJoEwYkYcJxKGa2oK_OsRYh1ldf0oJHTDtc9AF1DP9iAj77fRkgW7su1865ZH4ftKNDX8Lg",
  },
  {
    label: "Arid Sands",
    title: "Sahara Star Gazing",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtmpxcLnZ7RS-IQj7VPK9e1fIir0Lu6g5eAOPpJ0Rv2dVWIeKOmH7-I52DbCeXihMa8mWKnjmq2x-M5vzZxbGhn5prg0mIyvJyYeFEUpQfIdWqF_3Hf2AKCDQ_R2Eyb0jIIasrQAVyWPNc_ru7lzWFgUw1rD207p8n7EdEOh7oCYqx9Y9Ajmk8eIbftGfns6_fUA_EG1_CQcwb796n9kd3lHHKGBQo1Dy-JE9rBDrJnOp9nKvZXgU03OyJsezVGk1x3fS0ZakRkeWL",
  },
];

const galleryImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_vV3SxpvDRNBCCsb-pLfxDLxDAznO5lyGsEuOfZW1gbAG00UaMFn_hlRA0zuYfFe-ZXeP1jUIlE09tqQCLmBsv6GGOFLEXHea5PlgzoDvbSUBjq39XukAxraj4vK4lJyJlxTB2ComPiBcFODk7eEXV0Dwr7DLSu2lR2eyxcZvKNwU3aWzsLmjkOcmjbC0u9enSdQa9PjPTQeRN88XDYR_lF68aAebSOJkAKKI5G1F7rYk_azsu7YUk9WBuaLcQtVavxD8wVnNc6HA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAVqP0-tj1jLg9xHTvzq1kL7Vur3XTIEQqdNDKa4jfPFER4Y-vXxOt8Ce3IHEFB0XDAwa7WYMOtfPwwWBH1nSh7_0r32NGza9ONAVSjUkpcGRx2UZZcqmHxu0KI1j1rIifW0mVOaZKzakgKJlukBTNGvmZCVQ6Z6VEly87j_pwNSw2w5MLINEuLpy1Uc9u-TD93tx16WrcYR57C9EI42-MUQFWREm94hIs8eJGM9nUXZWAXlmhqRj8NQCBi21QKjSf0WwsJKQt60bc4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDREeZrSYeF5paIalppobNEOBbP6FS2FZBeDHMWBs5jE6z1Dr1_9TgrWMkMBg08z-ksy0_pTsAl66b3wiThLcsP3_2lTQLI_pHO4uY4_56MP734CdVEHxXK8gAfgYjvay3Xoo3YI0oYk018SqCh_X_Rq5Mp32wintvlPJ5Qr8mPJbGE3uQLjuqor00Tk7nMaWPSQuVPcSsHo0z9hUta26jrCtyO0uaf-XvqwGpAY4eKDo6-neAofNZINjEiz_E-dihVe6jFgxu97voi",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBfiou_GiXnWSp2-J6GA5Q0-unGi1gz3u0-8wNeqL9Ix3vZm0Qd9CtdlVrn5PNculr-Fl__teX06TcAzKDC7PlZ8yY3ebBeYzBZe2JWiFREFabFJ6RdwzEqUFinWgZhHfRCIu0niGdp8Rsu16Q6uA13FYUYZmdQv-cBW9rHLtKamaK1-2nLIm983iMSR_mDuRfTCSjzD1McceZC80HbISfpcj7NhXxKTEp1j_u7ab0JLuUyhplFbwwNOGZw0MN1cd__kQtZQ0469uL_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDhdvACz3PWmAz78FWY1XPCZrUppQeERrOaq_qoe02fNr7UPk8w8U6Xhn09FZZgP8Xbibsx4ZCZq1XwgJxS68UuYabbwWMgGDN31HSYeIO4V9kXxuik54DDUHifhxLFQpZ70KnfLI5SUak8K226zKRMP87RTfkux4CBVCAshc2VwFx1WhP2JlokCAoCZwt6bh7wlDsns5GzXvjZOAMxB6tnxbEacub-xiUWI70b6JK-o6qrAqQcJeyLA4umu43sRQuO5XLdUIqk-4mL",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDqjJO1GAGMe3R2G6DLxhrkVsJk95ruYS-AuDtqzSCJvdBL2Hpx0sSVAQiJsTsBrBQvm-hh48a508hlnebO0O-xE-v5jiWtlQtMRfzP2HzH8-ziqjJByyIVgjrB1Hn6RYpLdMdcXKqIotLT2nOo3aR-n4331_vmacgDTxNhEaZjm3DwQE7hjoHLtP5zF0Nkkm43yeuwbPVP24A2FPj-iFbIGYpB_Bjp5zHhmouzuX7NuZumH83iAk8ZOb89iurARXSxAgtGPNH-jfKl",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCjQAxSx99GXGWd4AI22Nb9Z73DwmUcUCqSVFn3ItMhc3DVjEHhLqoCtcx_p63C70EQMKtL5iz0l0sCgAmNdSoT25kcfhPDhG18nnbQbE5Or6_-jkfZ64lKflDK9IjGwO_Zmx9u4FgkwustAiuLW3Y3GZxwe_kPF8hFWjhg1DBAlFKLgcCaVZl3pdemAvNrxnh0_aT2FjWW2B4KISOWOJvmwM67EtZnHsLLpqjJ-9BuCcIseQ_-MsRoXbxnM0iUwXPBiZCWj649LiUQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBXyxEYtWEwPvPsq-Ha6ZCe_38qQQZ441puFvp_iPdCxZfbsHSp2B5fFqwpalwT8EGL-lYo5ncpyh7guEtdxBK6VhC2t2x9LC2Ju3dKWPKWUY5GnptWQEiT9lbloc8CrCB6nUwTFzUdnI2NcBaqUDCs9FJxMkoMhk5VQ9idP6TLQu46TTr__rGsq0z9MPvWlqI8aV9N6EqRJCMwwVlwhF2PzezFVeztfsAa3qv4fS-PCofyUsx8E49RhswN8gC-QtrE0E1-9Vs7KdxQ",
];

export default function CinematicHome() {
  useCinematicEffects();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    // basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill all fields ❌");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Inquiry sent successfully ✅");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to send ❌");
      }
    } catch (err) {
      console.error("ERROR:", err);
      setError("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="cinematic-page">
      <div className="cine-shell">
        <CinematicCursor />
        <CinematicHeader activeKey="home" />
        <CinematicSideDots dots={dots} />
        <CinematicRightTab label="Explore" />

        <section id="home" className="cine-hero">
          <div
            className="cine-hero-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.72)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtaSEm3YbWaYpGIrDaAMb-Xu9mVpWsn3D3SCCgsgGUwASmwdsYoT3XePmeDIfn6fuNBR7FhsdzlIK0193COxO2PRtoj7tGC5vklpOLeJLcu27cpy-ReuH5MIalB2BYmPuGEqYyOcAlu5hiwJ9sbdD09nDtiHc0zTFy3lNXm-I0G1wN_jT8AQSUiqR9tML1_J0198i2QBb1NF9NzlnDAY8F4VM6o2Bbfjplr1n5nQhlIo5OZ5s4tO3CfhvRAPsBoZftztdf9qQ7l1KH')",
            }}
          />
          <div className="cine-overlay" />

          <div className="cine-hero-copy cine-home-scroll-copy cine-home-intro-block">
            <h1 className="cine-title-main cine-home-signature-1 cine-home-hero-title">
              Ancient Ruins
            </h1>
            <p className="cine-title-script cine-home-signature-2 cine-home-hero-script">
              Cinematic Adventure
            </p>
            <p className="cine-subtext">
              Hand-crafted cinematic itineraries through heritage landscapes,
              hidden wilderness, and dramatic coastlines with premium logistics
              from takeoff to return.
            </p>
            <div className="cine-cta-actions">
              <Link className="cine-btn" to="/explore-globe">
                Explore World
              </Link>
              <Link className="cine-btn cine-btn-outline" to="/india-globe">
                Explore India
              </Link>
            </div>
          </div>

          <div className="cine-stats-strip">
            <div className="cine-stats">
              <div className="cine-stat">
                <small>Expeditions</small>
                <strong>150+</strong>
              </div>
              <div className="cine-stat">
                <small>Destinations</small>
                <strong>40+</strong>
              </div>
              <div className="cine-stat">
                <small>Happy Travelers</small>
                <strong>2.5k+</strong>
              </div>
              <div className="cine-stat">
                <small>Support</small>
                <strong>24/7</strong>
              </div>
            </div>
          </div>
        </section>

        <section
          id="destinations"
          className="cine-section cine-section-dark cine-home-destinations"
        >
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">The Selection</p>
            <h2 className="cine-heading">Epic Landscapes</h2>

            <div className="cine-home-filters">
              <button type="button" className="active">
                All Terrain
              </button>
              <button type="button">Mountains</button>
              <button type="button">Jungle</button>
              <button type="button">Desert</button>
            </div>

            <div className="cine-grid-3">
              {destinationCards.map((card) => (
                <article
                  key={card.title}
                  className="cine-card cine-home-destination-card"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="cine-parallax-img"
                    data-parallax="true"
                  />
                  <div className="cine-card-copy">
                    <p>{card.label}</p>
                    <h3>{card.title}</h3>
                    <button type="button" className="cine-home-inline-btn">
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="packages"
          className="cine-section cine-section-light cine-home-packages"
        >
          <div
            className="cine-home-fixed-stage cine-home-packages-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.62)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqlxVxccEK9vwOWuw-5CMj6iyB37DgmOgmtvUN8uUXrNvBB8-rEt4yyEbfHFOhwtQrXYDwWAiBWajWdNaohUcvbBc8LYx9N2RdI4uISjeMuTqDj1WKQBPV5FIBAL9Q2j4FRhEj6u_mEZl7tjC2otsFrxvcsrE6HsZPqm-nNu0f2FacjIKaonjW75tWymVqcJVvjxo8spDicvIe4ECO9h40uo0Fl4OaMQ5SYcpoIGgJ9r3nwSzPHyHsGTXpFfTnLedHEISB1JI9dRa1')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-anchor="center"
              data-rise-mode="symmetric"
              data-rise-distance="34"
              data-rise-opacity-mode="symmetric"
              data-rise-opacity-start="0.92"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1">Exclusive Deals</h2>
              <p className="cine-home-signature-2">Chosen For You</p>
            </div>
          </div>

          <div className="cine-container" data-reveal>
            <div className="cine-split">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeSnLl8KcMhe-VlR4S87DcMieDVbaM5pfRLw4Byj5C_QsdZjb1Olf3kk8zDPS_xKyfW4htGNlbZX104ZjzxzRnQdwFpuBZ2UamjxZl_Db5WcA2V4jwlGijivP_QrLaU9EGu3FGR5x8FWLdWStcea9GrV6AkWIlG8DwfYf1VNztdcB4c8Yil7vSyd3_g6o_7LR-SDueL7La4Jte17QUrwegakKBZ6qcmoL0dE7wBK0CByayGR3tY2SwRygUNVx2GdYANAKdJazOvBh8"
                alt="Patagonia Peaks"
              />

              <div>
                <p className="cine-heading-eyebrow">Premium Expedition</p>
                <h3
                  className="cine-heading"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  Patagonia Peaks
                </h3>
                <p>
                  Experience the raw beauty of South America with curated luxury
                  camps, private ground transfers, and photographers for summit
                  moments.
                </p>
                <div className="cine-feature-list">
                  <span>12 Days Journey</span>
                  <span>Private Guide</span>
                  <span>All Equipment</span>
                  <span>Luxury Tents</span>
                </div>
                <div className="cine-price">
                  <strong>$4,250</strong>
                  <button className="cine-btn" type="button">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="cine-split cine-split-reverse">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3BKaEf-og4nOGt3ZR1wJBpM20Ek_FsFW1Vbko3Fxa3bug9q2D143x3R6S8uqEoz7xJWMHgRL4XryH9E6RsRa7WE1YFDityg7CYkOzpz6-rALjige-cjGjE4S2Nd-jMVQsISth8Y9tLveauUiXxAAUxflBQoKehCL8Gtp_0U1HuzPNr29oMElVNxdfcwR0r31LlCrHve3ayX85o4Ex7RfuymSTWMj9Ov0nFN9ioqN75aub45hZRQeV7ov5RCLPJOINteR1vl3aRix3"
                alt="Mediterranean Odyssey"
              />

              <div>
                <p className="cine-heading-eyebrow">Coastal Escape</p>
                <h3
                  className="cine-heading"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  Mediterranean Odyssey
                </h3>
                <p>
                  Sail through sapphire waters and hidden limestone caves. A
                  refined blend of exploration and Mediterranean ease with
                  premium on-ground support.
                </p>
                <div className="cine-feature-list">
                  <span>8 Days Cruise</span>
                  <span>Yacht Access</span>
                  <span>Island Hopping</span>
                  <span>Wine Tasting</span>
                </div>
                <div className="cine-price">
                  <strong>$3,800</strong>
                  <button className="cine-btn" type="button">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="cine-section cine-section-dark cine-home-about"
        >
          <div
            className="cine-home-fixed-stage cine-home-about-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA7PPHap2khnZvaTAycka7EMlxWxV-lMnsCofm4KgOc2wqPiripV7wFQ2AC35rABDhDs8jmoqhtyYt79r_y-ML5XD_wiD7VY4mUEdO9WcnVxzx76HLLLEMFdXZslwU5eYMKqPWx7lW4t_VujI8v3Y0eyrjRyN6emKrOhHOlvCjNpIsrOABUCB1eRfajI8Zix9AUfJqLsROvLyIMDNaKv0eDnBnewCPWQ3_LBNb1okKNOqRwif8NUc92MWHrn8GEUU_qhlei-5-Kh_dO')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-distance="105"
              data-rise-opacity-start="0.8"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1 cine-home-muted">
                Our Legacy
              </h2>
            </div>
          </div>

          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Our Legacy</p>
            <h2 className="cine-heading">Decades Of Adventure</h2>
            <p
              className="cine-subtext"
              style={{
                marginInline: 0,
                maxWidth: "860px",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Founded in 1994, Advaga Holidays evolved from a small trekking
              collective into a full-scope travel design studio specializing in
              story-driven itineraries and high-touch support.
            </p>

            <div className="cine-grid-4">
              <div className="cine-glass" data-reveal>
                <h3>28+</h3>
                <p>Years of Heritage</p>
              </div>
              <div className="cine-glass" data-reveal>
                <h3>500k</h3>
                <p>Miles Explored</p>
              </div>
              <div className="cine-glass" data-reveal>
                <h3>120</h3>
                <p>Expert Guides</p>
              </div>
              <div className="cine-glass" data-reveal>
                <h3>100%</h3>
                <p>Satisfaction Focus</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="cine-section cine-section-dark cine-home-gallery"
        >
          <div
            className="cine-home-fixed-stage cine-home-gallery-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.56)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAh3_ySU1gP2o1v-3ARXIQlLG2cLf1DuicCFIw4clhF5DxJ77sWnUnhBW-PEwvjOcpUguxBRdVwErtgClVVkt5hfoff3m2a7M65mKZuiRWKI8gpH_Bv8WJEcU4-FTQWrMY1r_cBCN55XCuUS5nU2S43LmqZljpTbNGOke7udXHn1z5kyMGyEax91Mqf2BFZUCGpJyMY_RLvgNf6SKkJiVNgSxb2k_rVoC-sVHxVHJzq1-uxyHC9PMzbcfUI9k6VZSZb6iq6V1Vq-Fcx')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-distance="110"
              data-rise-opacity-start="0.82"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1 cine-home-white">Moments</h2>
              <p className="cine-home-signature-2">Frozen In Time</p>
            </div>
          </div>

          <div className="cine-container" data-reveal>
            <div className="cine-home-gallery-grid">
              {galleryImages.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Travel moment ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="cine-section cine-section-dark cine-home-testimonials"
        >
          <div
            className="cine-home-testimonials-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.72)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUhPTflSh6_ASOiHLHBN3oHveuhaHknfDjTeyyGqbVw9n6xW3mu3knaF8G_krPUpNaY7HXI6Dndn3n_4hJvZmedUXpOM8tCOfbStjDKpIGddv0k7xViaPwsKOGtWDX2OUNt5f51yBgOtDBclrrmsOqnoxt2Nb7azKXGyksxOIR5JpA06NiCgW1IM0XygMLvZnUD5CVZ8jE607cAueT7P8w3NO3aXJmvJr3KrtrgwPU85L15ZDhVU3c642RJyWekDVMtulTgTx_uTso')",
            }}
          />
          <div className="cine-container" data-reveal>
            <p className="cine-heading-eyebrow">Shared Journeys</p>
            <h2 className="cine-heading">Words From Travelers</h2>

            <div className="cine-home-testimonial-grid">
              <article className="cine-glass">
                <p className="cine-quote">
                  "The attention to detail was beyond anything I've experienced.
                  It felt like I was inside a cinematic masterpiece from start
                  to finish."
                </p>
                <strong>Elena Marek</strong>
                <span>Swiss Alps Expedition</span>
              </article>

              <article className="cine-glass cine-home-testimonial-featured">
                <p className="cine-quote">
                  "Advaga does not just plan trips; they curate life-changing
                  moments. Standing on that ridge at sunrise was the highlight
                  of my decade."
                </p>
                <strong>Julian West</strong>
                <span>Patagonia Trek 2023</span>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="cine-home-contact">
          <div
            className="cine-home-contact-visual cine-home-contact-stage"
            data-scroll-section="true"
          >
            <div
              className="cine-home-fixed-bg"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBziuni5FU_MSke7tP9qqOrvxzPf9L7FgZkiKFqMTkRXVOm6mamT-mQbatV4eDqvAux_kNCmkvIC_ryjVZR7KZpZ9ho_xbdTpd_e1GTo_0VoDF_QtDCkeUqOdNY1OHUjsKSG2j_Y0bvpdqTLKM-46swpw6F9_41m4yvMyhyO6wLxgNiJc7UFlyeQTU8FUoS4qv3LI5X3kVhjhLIL2_4mHKdKqRPea_vYSsxxYicthiD77Gdm_cjPFOsGx4bpoPtYGdYl2UVaOa4OtsX')",
              }}
            />
            <div
              className="cine-home-fixed-copy cine-home-stage-copy"
              data-scroll-rise="true"
              data-rise-distance="90"
              data-rise-opacity-start="0.84"
              data-rise-opacity-end="1"
            >
              <h2 className="cine-home-signature-1">Let's Go</h2>
              <p className="cine-home-signature-2">Together</p>
            </div>
          </div>

          <div className="cine-home-contact-form" data-reveal>
            <h2>Start Your Journey</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Service
                </option>
                <option value="AIR TICKETS">Air Tickets</option>
                <option value="VISA ASSISTANCE">Visa Assistance</option>
                <option value="TRAVEL ASSISTANCE">Travel Assistance</option>
                <option value="CORPORATE SERVICES">Corporate Services</option>
                <option value="COUSTOM SERVICES">Custom Services</option>
                <option value="CAR RENTAL">Car Rental</option>
              </select>

              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              {/* SUCCESS / ERROR (no UI break) */}
              {success && <p style={{ color: "lightgreen" }}>{success}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}

              <button type="submit" className="cine-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </section>

        <section className="cine-home-footer" aria-label="Home footer">
          <div className="cine-container">
            <h3>ADVAGADHOLIDAYS.INC</h3>
            <p>
              Pioneering cinematic travel and luxury expeditions since 1994.
              Explore breathtaking landscapes with confidence.
            </p>
            <div className="cine-home-footer-links">
              <a href="#home">Home</a>
              <a href="#destinations">Destinations</a>
              <Link to="/Services">Services</Link>
              <Link to="/Support">Contact</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
