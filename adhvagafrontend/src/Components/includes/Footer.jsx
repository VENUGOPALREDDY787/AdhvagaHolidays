import React from 'react';
import logo from "../../assets/unnamed.jpg";
import './Footer.css'
function Footer() {
    return ( 
        <footer style={{backgroundColor:"antiquewhite"}}>
        <div className="container pt-5">
            <div className="row">
                <div className="col  pt-2">
                    <img src={logo} alt="Adhvaga" className='footer-logo'/>
                    <div className='social-icons ms-2 mt-3'>
                        <i class="fa-brands fa-square-instagram"></i>
                        <i class="fa-brands fa-square-youtube"></i>
                        <i class="fa-brands fa-square-facebook"></i>
                        <i class="fa-brands fa-square-whatsapp"></i>
                    </div>
                </div>
                <div className="col ms-5 pt-2">
                    <div className='footer-quick-links'>
                    <p className=''>Quick Links</p>
                    
                    <a href="">About Us</a><br />
                    <a href="">Destinations</a><br />
                    <a href="">Tour Packages</a><br />
                    <a href="">Custom Tours</a><br />
                    <a href="">Travel Blog</a><br />
                    
                    </div>
                </div>
                <div className="col ms-5 pt-2">
                    <p>Top Destinations</p>
                    
                   <a href="">Paris, France</a><br />
                   <a href="">Bali, Indonesia</a><br />
                    <a href="">Dubai, UAE</a><br />
                    <a href="">Santorini, Greece</a><br />
                    <a href="">Maldives</a><br />
                    
                </div>
                <div className="col ms-5 mt-2">
                    <p>Contact Us</p>
                    <a href="">📍 123 Travel Street, Suite 100 <br />
New York, NY 10001</a>
                    <a href="">📞 +1 (234) 567-890</a>
                    <a href="">✉️ info@adhyagaholidays.com</a>
                    <a href="">🕒 Mon-Sat: 9AM - 6PM</a>

                </div>
                
            </div>
            <div className="row">
                <div className="mt-5 text-muted" style={{fontSize:"12px"}}>
                
             <p>We are passionate about creating extraordinary travel experiences. With years of expertise and a commitment to excellence, we turn your travel dreams into reality.</p>
            <p>
<strong>1.</strong> Adhvaga Holidays is a trusted tours and travels company committed to creating memorable, comfortable, and well-organized travel experiences for travelers across India and beyond.<br />
We believe that travel is not just about reaching a destination, but about enjoying every moment of the journey with peace of mind and complete satisfaction.
</p>

<p>
<strong>2.</strong> With extensive experience in the travel industry, Adhvaga Holidays offers a wide range of domestic and international tour packages designed to suit different travel preferences and budgets.<br />
From scenic hill stations and relaxing beach holidays to cultural heritage tours and vibrant city escapes, our itineraries are carefully curated to deliver the best travel experiences.
</p>

<p>
<strong>3.</strong> Customer satisfaction is at the heart of everything we do at Adhvaga Holidays.<br/>
We provide end-to-end travel solutions including transportation, accommodation, sightseeing, and personalized assistance, ensuring a seamless and stress-free travel experience from start to finish.
</p>

<p>
<strong>4.</strong> Adhvaga Holidays is known for its transparent pricing, reliable services, and strong network of travel partners.<br/>
Whether it is a family vacation, honeymoon trip, group tour, corporate travel, or a solo adventure, we ensure safety, comfort, and quality service at every step of the journey.
</p>

<p>
<strong>5.</strong> We also promote responsible and meaningful travel by encouraging travelers to explore destinations respectfully and support local communities.<br/>
At Adhvaga Holidays, every trip is thoughtfully planned to create lasting memories, making your journey not just a tour, but a story worth remembering.
</p>

           </div>
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