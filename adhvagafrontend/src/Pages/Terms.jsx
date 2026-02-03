import React from "react";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA } from "../utils/seoHelpers";
import "./TermsPage.css";

export default function TermsPage() {
  const metadata = SEO_METADATA.terms;

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/terms"
        image={metadata.image}
      />

      <main className="terms-page" role="main" aria-label="Terms and Conditions">
        <div className="terms-overlay" aria-hidden="true" />
        <div className="terms-container">
          <header className="terms-header">
            <p className="terms-kicker">Adhvaga Holidays Inc</p>
            <h1>Terms &amp; Conditions</h1>
            <p className="terms-effective">Effective Date: 01-Jan-2026</p>
            <p className="terms-intro">
              These Terms &amp; Conditions ("Terms") govern access to and use of
              the website and services provided by Adhvaga Holidays Inc
              ("Company", "we", "us", "our"). By accessing this website or
              availing our services, you agree to be legally bound by these
              Terms, in accordance with the Consumer Protection Act, 2019 and
              applicable Indian laws.
            </p>
          </header>

          <section className="terms-section">
            <h2>1. Nature of Services</h2>
            <p>Adhvaga Holidays Inc operates as a travel agent and intermediary facilitating services such as:</p>
            <ul>
              <li>Flight bookings</li>
              <li>Hotel reservations</li>
              <li>Holiday packages</li>
              <li>Visa assistance</li>
              <li>Travel insurance and allied services</li>
            </ul>
            <p>
              All actual travel services are provided by independent third-party service providers
              (airlines, hotels, transport operators, embassies, insurers, etc.).
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Accuracy &amp; Disclosure</h2>
            <p>We make reasonable efforts to ensure accuracy of information on our website. However:</p>
            <ul>
              <li>Prices, availability, itineraries, and inclusions are subject to change</li>
              <li>Final details are confirmed only after booking confirmation</li>
              <li>Website content does not constitute a binding offer</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Bookings &amp; Payments</h2>
            <ul>
              <li>All bookings are subject to availability and confirmation by the respective service provider</li>
              <li>Prices are dynamic and may change until full payment is received</li>
              <li>Partial or full advance payment may be required</li>
              <li>Adhvaga Holidays Inc reserves the right to cancel bookings due to non-payment or incorrect information</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Cancellations, Amendments &amp; Refunds</h2>
            <ul>
              <li>Cancellation, amendment, and refund policies are governed by the respective third-party service providers</li>
              <li>Service fees, consultation charges, and convenience fees charged by Adhvaga Holidays Inc are strictly non-refundable</li>
              <li>Refund timelines depend on third-party processing and banking systems</li>
            </ul>
            <p>
              Refunds, where applicable, shall be processed within a reasonable time as per Indian consumer protection norms.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Visa &amp; Immigration</h2>
            <ul>
              <li>Visa approval, rejection, or delay is solely at the discretion of the concerned embassy or consulate</li>
              <li>Adhvaga Holidays Inc does not guarantee visa approval</li>
              <li>Visa fees and service charges are non-refundable regardless of outcome</li>
            </ul>
            <p>
              Denial of boarding or entry due to immigration or airline rules shall not be treated as a deficiency of service.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Customer Responsibilities</h2>
            <p>The customer is solely responsible for:</p>
            <ul>
              <li>Providing accurate and complete information</li>
              <li>Holding valid passport, visa, insurance, and travel documents</li>
              <li>Complying with immigration, customs, airline, and health regulations</li>
            </ul>
            <p>
              Adhvaga Holidays Inc shall not be liable for losses arising from incorrect or incomplete information provided by the customer.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Force Majeure</h2>
            <p>Adhvaga Holidays Inc shall not be liable for failure or delay in performance due to events beyond reasonable control, including but not limited to:</p>
            <ul>
              <li>Natural disasters</li>
              <li>Pandemics or health emergencies</li>
              <li>Government orders</li>
              <li>Strikes, war, political unrest</li>
              <li>Technical or system failures</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted under Indian law:</p>
            <ul>
              <li>Adhvaga Holidays Inc shall not be liable for indirect, incidental, or consequential damages</li>
              <li>Total liability, if any, shall be limited to the service fee received by Adhvaga Holidays Inc</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>9. Indemnification</h2>
            <p>The customer agrees to indemnify and hold harmless Adhvaga Holidays Inc from any claims, losses, damages, liabilities, or expenses arising from:</p>
            <ul>
              <li>Misuse of services</li>
              <li>Breach of these Terms</li>
              <li>Violation of applicable laws</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>10. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. All disputes shall be
              subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Amendments</h2>
            <p>
              Adhvaga Holidays Inc reserves the right to modify these Terms at any time without prior notice. Continued use of
              the website or services constitutes acceptance of the revised Terms.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
