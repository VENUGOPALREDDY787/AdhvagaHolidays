import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";
import { CinematicHeader } from "./CinematicLayout";
import WhatsAppModal from "../Components/Support/WhatsAppModal";
import AccessGateFlow from "../Components/includes/AccessGateFlow";
import { useSettings } from "../context/SettingsContext";
import "./Support.css";

const defaultFaqItems = [
    {
        question: "How early should I book my trip?",
        answer:
            "For best flight and hotel options, we recommend booking 4 to 8 weeks in advance for domestic trips and 8 to 12 weeks for international routes.",
    },
    {
        question: "Can you customize packages based on my budget?",
        answer:
            "Yes. We can tailor destinations, hotel categories, and activity inclusions to match your travel style and budget range.",
    },
    {
        question: "Do you assist with visa documentation?",
        answer:
            "Absolutely. Our team helps with document checklists, appointment guidance, and application support for multiple destinations.",
    },
    {
        question: "What payment options are available?",
        answer:
            "We support bank transfer and standard digital payment methods. Final payment details are shared clearly during booking confirmation.",
    },
    {
        question: "Can I request changes after booking?",
        answer:
            "Yes, modification requests are possible based on airline, hotel, and supplier policies. We will suggest the best available alternatives.",
    },
    {
        question: "Is travel insurance included by default?",
        answer:
            "Insurance depends on the selected package. If not included, we can add a suitable plan covering medical and trip interruption needs.",
    },
    {
        question: "Do you provide support during the trip?",
        answer:
            "Yes, we offer on-trip assistance for urgent travel issues, coordination, and support requests while you are traveling.",
    },
    {
        question: "How do cancellations and refunds work?",
        answer:
            "Cancellation and refund terms vary by destination and supplier. We share all policies before confirmation so you have full clarity.",
    },
];

function Support() {
    const { settings } = useSettings();
    const location = useLocation();
    const navigate = useNavigate();
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [showAccessGate, setShowAccessGate] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(0);
    const [selectedService] = useState(location.state?.serviceName || "");
    const metadata = SEO_METADATA.support;
    const breadcrumbs = [
        { name: "Home", url: "/home" },
        { name: "Support", url: "/support" },
    ];
    const faqItems = Array.isArray(settings?.faqItems) && settings.faqItems.length > 0
        ? settings.faqItems.filter((item) => item?.question && item?.answer)
        : defaultFaqItems;

    useEffect(() => {
        if (!location.state?.fromServiceBooking) {
            return;
        }

        const timer = setTimeout(() => {
            setShowAccessGate(true);
        }, 350);

        // Clear transient route state so refresh/back does not replay the gate.
        navigate(location.pathname, { replace: true });

        return () => clearTimeout(timer);
    }, [location.pathname, location.state, navigate]);

    return (
        <>
            <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/support"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
            />

            <main role="main" aria-label="Main content" className="cinematic-page support-cinematic-page">
                <CinematicHeader />
                <section className="support-split-layout">
                    <div className="support-cinematic-visual">
                        <div className="support-visual-overlay" />
                        <div className="support-visual-content">
                            <div className="support-hero-signature">
                                <h1>LET&apos;S</h1>
                                <p>Go Together</p>
                            </div>

                            <div className="support-contact-lines">
                                <div>
                                    <small>Headquarters</small>
                                    <strong>123 Adventure Way, Mountain View, CA 94043</strong>
                                </div>
                                <div>
                                    <small>Direct Line</small>
                                    <strong>+1 (555) 123-4567</strong>
                                </div>
                                <div>
                                    <small>Electronic Mail</small>
                                    <strong>hello@advagadholidays.inc</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="support-cinematic-form-pane">
                        <div className="support-form-shell">
                            <h2>Booking Inquiry</h2>
                            <p>
                                Tell us where you want to go, and we will craft the perfect cinematic
                                journey for you.
                            </p>

                            <form onSubmit={(event) => event.preventDefault()}>
                                <label htmlFor="supportFullName">Full Name</label>
                                <input id="supportFullName" type="text" placeholder="John Doe" />

                                <div className="support-form-grid">
                                    <div>
                                        <label htmlFor="supportEmail">Email Address</label>
                                        <input id="supportEmail" type="email" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="supportPhone">Phone Number</label>
                                        <input id="supportPhone" type="tel" placeholder="+1 (555) 000-0000" />
                                    </div>
                                </div>

                                <label htmlFor="supportDestination">Dream Destination</label>
                                <input
                                    id="supportDestination"
                                    type="text"
                                    placeholder="The Swiss Alps"
                                    defaultValue={selectedService}
                                />

                                <div className="support-form-grid">
                                    <div>
                                        <label htmlFor="supportDates">Travel Dates</label>
                                        <input id="supportDates" type="text" placeholder="MM/YYYY" />
                                    </div>
                                    <div>
                                        <label htmlFor="supportTravelers">No. of Travelers</label>
                                        <input id="supportTravelers" type="number" min="1" placeholder="2" />
                                    </div>
                                </div>

                                <label htmlFor="supportMessage">Message (Optional)</label>
                                <textarea
                                    id="supportMessage"
                                    rows="3"
                                    placeholder="Any specific requirements..."
                                />

                                <div className="support-form-actions">
                                    <button type="submit">Plan My Adventure</button>
                                    <button
                                        type="button"
                                        className="support-whatsapp-btn"
                                        onClick={() => setIsWhatsAppOpen(true)}
                                    >
                                        Chat on WhatsApp
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="support-faq-section" aria-label="Frequently asked questions">
                    <div className="support-faq-container">
                        <p className="support-faq-eyebrow">Need Quick Answers?</p>
                        <h2>Frequently Asked Questions</h2>
                        <p className="support-faq-intro">
                            Here are a few common questions travelers ask before booking.
                        </p>

                        <div className="support-faq-grid">
                            {faqItems.map((item, index) => (
                                <article
                                    key={item.question}
                                    className={`support-faq-item ${openFaqIndex === index ? "is-open" : ""}`}
                                >
                                    <button
                                        type="button"
                                        className="support-faq-question"
                                        onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
                                        aria-expanded={openFaqIndex === index}
                                    >
                                        <span>{item.question}</span>
                                        <span className="support-faq-icon" aria-hidden="true">+</span>
                                    </button>
                                    {openFaqIndex === index ? <p>{item.answer}</p> : null}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <WhatsAppModal
                isOpen={isWhatsAppOpen}
                onClose={() => setIsWhatsAppOpen(false)}
            />

            {showAccessGate && (
                <AccessGateFlow onComplete={() => setShowAccessGate(false)} />
            )}
        </>
    );
}

export default Support;