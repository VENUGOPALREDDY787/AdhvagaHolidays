import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import { useSettings } from "../../context/SettingsContext";
import "./Footer.css";

function Footer() {
    const { settings } = useSettings();
    const quickLinks = [
        { label: "About Us", to: "/About" },
        { label: "Domestic", to: "/Domestic" },
        { label: "International", to: "/International" },
        { label: "Services", to: "/Services" },
        { label: "Support", to: "/Support" },
        { label: "Terms & Conditions", to: "/terms" },
    ];

    const topDestinations = [
        "Paris, France",
        "Bali, Indonesia",
        "Dubai, UAE",
        "Santorini, Greece",
        "Maldives",
    ];

    return (
        <footer className="site-footer" role="contentinfo" aria-label="Footer">
            <div className="site-footer-inner">
                <div className="site-footer-grid">
                    <section className="site-footer-brand">
                        <img src={logo} alt="Adhvaga Holidays logo" className="footer-logo" />
                        <h3>{settings.agencyName || "Adhvaga Holidays"}</h3>
                        <p>
                            {settings.tagline || "Curating extraordinary travel experiences with comfort, precision, and complete peace of mind."}
                        </p>
                        <div className="site-footer-social" aria-label="Social media links">
                            {settings.instagram && <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                            {settings.facebook && <a href={settings.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
                            {settings.twitter && <a href={settings.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
                        </div>
                    </section>

                    <section>
                        <h4>Quick Links</h4>
                        <nav className="site-footer-links" aria-label="Quick links">
                            {quickLinks.map((item) => (
                                <Link key={item.to} to={item.to}>
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </section>

                    <section>
                        <h4>Top Destinations</h4>
                        <div className="site-footer-links" aria-label="Top destinations">
                            {topDestinations.map((place) => (
                                <span key={place}>{place}</span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h4>Contact Us</h4>
                        <div className="site-footer-links" aria-label="Contact information">
                            <span>{settings.address || "JP Nagar 2nd Phase, Bangalore"}</span>
                            <a href={`tel:${settings.contactNumber || "+919620421494"}`}>{settings.contactNumber || "+91 96204 21494"}</a>
                            <a href={`mailto:${settings.email || "adhvagaholidaysinc@gmail.com"}`}>{settings.email || "adhvagaholidaysinc@gmail.com"}</a>
                            <span>Mon-Sat: {settings.workingHoursStart || "09:00"} - {settings.workingHoursEnd || "18:00"}</span>
                        </div>
                    </section>
                </div>

                <div className="site-footer-bottom">
                    <p>
                        We are passionate about creating memorable, comfortable, and
                        well-organized travel experiences for travelers across India and beyond.
                    </p>
                    <p>
                        Copyright {new Date().getFullYear()} {settings.agencyName || "Adhvaga Holidays"}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}














// import React from "react";
// function Footer() {
//   return (<footer style={{backgroundColor:"rgb(250,250,250)"}}>
//     <div className="container border-top mt-5">
//       <div className="row mt-5">
//         <div className="col">
//           <img src="media/logo.svg" style={{ width: "50%" }}></img>
//           <p className='text-muted mt-3' atyle={{fontSize:"20px"}}>
//             &copy;2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
//           </p>
//         </div>
//         <div className="col">
//           <p>Company</p>
//           <a href="#">About</a>
//           <br></br>
//           <a href="#">Products</a>
//           <br></br>
//           <a href="#">Pricing</a>
//           <br></br>
//           <a href="#">Referral programme</a>
//           <br></br>
//           <a href="#">Careers</a>
//           <br></br>
//           <a href="#">Zerodha.tech</a>
//           <br></br>
//           <a href="#">Press & media</a>
//           <br></br>
//           <a href="#">Zerodha cares (CSR)</a> <br></br>
//         </div>
//         <div className="col">
//           <p>Support</p>
//           <a href="#">Contact </a>
//           <br />
//           <a href="#">Support portal</a>
//           <br />
//           <a href="#">Z-Connect blog</a>
//           <br />
//           <a href="#">List of chargses</a>
//           <br />
//           <a href="#">Downloads & resoruces</a>
//           <br />
//         </div>
//         <div className="col">
//           <p>Account</p>
//           <a href="#"> Open an account</a>
//           <br />
//           <a href="#"> Funds transfer</a>
//           <br />
//           <a href="#">Pricing & chargses</a>
//           <br />
//           <a href="#">60 day challenge</a>
//           <br />
//         </div>
//       </div>
//       <div className="mt-5 text-muted" style={{fontSize:"12px"}}>
//       <p>
//         Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
//         no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking
//         Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: Zerodha
//         Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public
//         School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For
//         any complaints pertaining to securities broking please write to
//         complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure
//         you carefully read the Risk Disclosure Document as prescribed by SEBI |
//         ICF
//       </p>

//       <p>
//         Procedure to file a complaint on SEBI SCORES: Register on SCORES portal.
//         Mandatory details for filing complaints on SCORES: Name, PAN, Address,
//         Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy
//         redressal of the grievances
//       </p>

//       <p>Smart Online Dispute Resolution | Grievances Redressal Mechanism</p>

//       <p>
//         Investments in securities market are subject to market risks; read all
//         the related documents carefully before investing.
//       </p>

//       <p>
//         Attention investors: 1) Stock brokers can accept securities as margins
//         from clients only by way of pledge in the depository system w.e.f
//         September 01, 2020. 2) Update your e-mail and phone number with your
//         stock broker / depository participant and receive OTP directly from
//         depository on your e-mail and/or mobile number to create pledge. 3)
//         Check your securities / MF / bonds in the consolidated account statement
//         issued by NSDL/CDSL every month.
//       </p>

//       <p>
//         India's largest broker based on networth as per NSE. NSE broker
//         factsheet
//       </p>

//       <p>
//         "Prevent unauthorised transactions in your account. Update your mobile
//         numbers/email IDs with your stock brokers. Receive information of your
//         transactions directly from Exchange on your mobile/email at the end of
//         the day. Issued in the interest of investors. KYC is one time exercise
//         while dealing in securities markets - once KYC is done through a SEBI
//         registered intermediary (broker, DP, Mutual Fund etc.), you need not
//         undergo the same process again when you approach another intermediary."
//         Dear Investor, if you are subscribing to an IPO, there is no need to
//         issue a cheque. Please write the Bank account number and sign the IPO
//         application form to authorize your bank to make payment in case of
//         allotment. In case of non allotment the funds will remain in your bank
//         account. As a business we don't give stock tips, and have not authorized
//         anyone to trade on behalf of others. If you find anyone claiming to be
//         part of Zerodha and offering such services, please create a ticket here.
//       </p></div>
//     </div>
//     </footer>
//   );
// }

export default Footer;