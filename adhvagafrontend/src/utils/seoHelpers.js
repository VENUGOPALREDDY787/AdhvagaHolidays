/**
 * SEO Helpers - Reusable utilities for meta tags, structured data, and SEO best practices
 * Production-ready SEO configuration for Adhvaga Holidays
 */

// ==================== META TAG TEMPLATES ====================

export const SEO_METADATA = {
  home: {
    title: "Adhvaga Holidays | Best Travel Agency for Domestic & International Tours",
    description: "Adhvaga Holidays offers domestic and international holiday packages, air tickets, visa assistance, travel insurance, and customized travel services across India.",
    h1: "Adhvaga Holidays – Your Trusted Travel Partner",
    keywords: "domestic holidays, international tours, travel packages, air tickets, visa assistance",
    url: "https://adhvagaholidays.com",
    image: "https://adhvagaholidays.com/og-home.jpg"
  },
  about: {
    title: "About Adhvaga Holidays | Trusted Travel & Tour Company",
    description: "Learn about Adhvaga Holidays, our mission, values, and expertise in delivering exceptional travel experiences.",
    h1: "About Adhvaga Holidays",
    keywords: "about Adhvaga, travel company, tour operator, travel experience",
    url: "https://adhvagaholidays.com/about",
    image: "https://adhvagaholidays.com/og-about.jpg"
  },
  domestic: {
    title: "Domestic Holiday Packages in India | Adhvaga Holidays",
    description: "Explore domestic holiday packages across India with Adhvaga Holidays. Discover popular destinations with affordable travel plans.",
    h1: "Domestic Holiday Packages in India",
    keywords: "domestic holiday packages, India tours, domestic travel, holiday destinations",
    url: "https://adhvagaholidays.com/domestic",
    image: "https://adhvagaholidays.com/og-domestic.jpg"
  },
  international: {
    title: "International Holiday Packages from India | Adhvaga Holidays",
    description: "Book international holiday packages from India with Adhvaga Holidays. Explore global destinations with curated travel plans.",
    h1: "International Holiday Packages",
    keywords: "international holiday packages, foreign tours, world travel, global destinations",
    url: "https://adhvagaholidays.com/international",
    image: "https://adhvagaholidays.com/og-international.jpg"
  },
  services: {
    title: "Travel Services | Air Tickets, Visa & Insurance – Adhvaga Holidays",
    description: "Adhvaga Holidays provides air ticket booking, visa assistance, travel insurance, car rentals, corporate travel, and custom travel services.",
    h1: "Our Travel Services",
    keywords: "travel services, air tickets, visa assistance, travel insurance, car rentals",
    url: "https://adhvagaholidays.com/services",
    image: "https://adhvagaholidays.com/og-services.jpg"
  },
  terms: {
    title: "Terms & Conditions | Adhvaga Holidays",
    description: "Read the Terms & Conditions governing the use of Adhvaga Holidays services, bookings, payments, cancellations, and liabilities.",
    h1: "Terms & Conditions",
    keywords: "terms and conditions, Adhvaga Holidays terms, travel agency terms",
    url: "https://adhvagaholidays.com/terms",
    image: "https://adhvagaholidays.com/og-terms.jpg"
  }
};

export const SERVICE_METADATA = {
  airTickets: {
    title: "Domestic & International Air Ticket Booking | Adhvaga Holidays",
    description: "Book domestic and international air tickets with Adhvaga Holidays. Get best prices and seamless booking experience.",
    h1: "Air Ticket Booking Services",
    keywords: "air ticket booking, flight booking, airline tickets, cheap flights",
    url: "https://adhvagaholidays.com/services/air-tickets"
  },
  visa: {
    title: "Visa Assistance & Documentation | Adhvaga Holidays",
    description: "Complete visa assistance for international travel. Expert guidance on visa documentation and applications.",
    h1: "Visa Assistance Services",
    keywords: "visa assistance, visa documentation, international visa, travel visa",
    url: "https://adhvagaholidays.com/services/visa-assistance"
  },
  insurance: {
    title: "Travel Insurance Plans | Adhvaga Holidays",
    description: "Comprehensive travel insurance plans to protect your journey. Coverage for health, luggage, and emergency situations.",
    h1: "Travel Insurance Services",
    keywords: "travel insurance, trip insurance, travel protection, health insurance",
    url: "https://adhvagaholidays.com/services/travel-insurance"
  },
  carRentals: {
    title: "Car Rentals & Ground Transportation | Adhvaga Holidays",
    description: "Reliable car rental services for your travels. From economy to premium vehicles for all your journey needs.",
    h1: "Car Rental Services",
    keywords: "car rentals, ground transportation, vehicle hire, taxi services",
    url: "https://adhvagaholidays.com/services/car-rentals"
  },
  corporate: {
    title: "Corporate Travel Services | Adhvaga Holidays",
    description: "Customized corporate travel solutions for businesses. Group packages, MICE services, and corporate retreats.",
    h1: "Corporate Travel Services",
    keywords: "corporate travel, MICE services, group travel, business travel",
    url: "https://adhvagaholidays.com/services/corporate-services"
  },
  custom: {
    title: "Custom Travel Packages | Adhvaga Holidays",
    description: "Design your own travel experience with our custom travel packages. Personalized itineraries tailored to your needs.",
    h1: "Custom Travel Services",
    keywords: "custom travel packages, personalized tours, bespoke travel",
    url: "https://adhvagaholidays.com/services/custom-services"
  }
};

// ==================== STRUCTURED DATA GENERATORS ====================

/**
 * Generate Organization Schema
 * https://schema.org/Organization
 */
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Adhvaga Holidays",
    url: "https://adhvagaholidays.com",
    logo: "https://adhvagaholidays.com/logo.png",
    description: "Leading travel agency offering domestic and international holiday packages, air tickets, visa assistance, and travel insurance.",
    sameAs: [
      "https://www.facebook.com/adhvagaholidays",
      "https://www.instagram.com/adhvagaholidays",
      "https://twitter.com/adhvagaholidays"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+91-XXXX-XXXX-XXXX",
      email: "support@adhvagaholidays.com"
    }
  };
};

/**
 * Generate TravelAgency Schema
 * https://schema.org/TravelAgency
 */
export const generateTravelAgencySchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Adhvaga Holidays",
    url: "https://adhvagaholidays.com",
    logo: "https://adhvagaholidays.com/logo.png",
    areaServed: [
      { "@type": "Country", name: "IN" },
      { "@type": "Country", name: "US" },
      { "@type": "Country", name: "UK" },
      { "@type": "Country", name: "AU" }
    ],
    priceRange: "$$"
  };
};

/**
 * Generate BreadcrumbList Schema
 * https://schema.org/BreadcrumbList
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: `https://adhvagaholidays.com${crumb.url}`
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
};

/**
 * Generate Service Schema
 * https://schema.org/Service
 */
export const generateServiceSchema = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Adhvaga Holidays",
      url: "https://adhvagaholidays.com"
    },
    areaServed: {
      "@type": "Country",
      name: "IN"
    }
  };
};

/**
 * Generate LocalBusiness Schema (for holiday destinations)
 * https://schema.org/LocalBusiness
 */
export const generateDestinationSchema = (destination) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: destination.name,
    description: destination.description,
    image: destination.image,
    url: destination.url,
    areaServed: {
      "@type": "City",
      name: destination.city,
      containedInPlace: {
        "@type": "Country",
        name: "IN"
      }
    }
  };
};

/**
 * Generate Product/Tour Schema
 * https://schema.org/Product
 */
export const generateTourPackageSchema = (tour) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.name,
    description: tour.description,
    image: tour.image,
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock"
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Adhvaga Holidays"
    }
  };
};

// ==================== URL HELPERS ====================

/**
 * Format URL to kebab-case and ensure SEO-friendly structure
 */
export const formatSEOUrl = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

/**
 * Get canonical URL for a route
 */
export const getCanonicalUrl = (path) => {
  const baseDomain = "https://adhvagaholidays.com";
  return `${baseDomain}${path}`;
};

// ==================== IMAGE ALT TEXT GENERATOR ====================

/**
 * Generate SEO-friendly alt text for destination images
 */
export const generateDestinationAlt = (destination, packageType = "holiday package") => {
  return `${destination} ${packageType} from India - Adhvaga Holidays`;
};

/**
 * Generate alt text for feature images
 */
export const generateAltText = (text) => {
  return `${text} - Adhvaga Holidays`;
};

// ==================== OPEN GRAPH & TWITTER TAGS ====================

/**
 * Generate Open Graph meta tags
 */
export const generateOGTags = (metadata) => {
  return {
    "og:title": metadata.title,
    "og:description": metadata.description,
    "og:url": metadata.url,
    "og:image": metadata.image || "https://adhvagaholidays.com/og-default.jpg",
    "og:type": "website",
    "og:site_name": "Adhvaga Holidays"
  };
};

/**
 * Generate Twitter Card meta tags
 */
export const generateTwitterTags = (metadata) => {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": metadata.title,
    "twitter:description": metadata.description,
    "twitter:image": metadata.image || "https://adhvagaholidays.com/og-default.jpg",
    "twitter:site": "@adhvagaholidays"
  };
};

// ==================== ACCESSIBILITY HELPERS ====================

/**
 * Generate ARIA attributes for navigation
 */
export const generateNavAriaLabel = (label) => {
  return {
    role: "navigation",
    "aria-label": label
  };
};

/**
 * Generate ARIA attributes for main content
 */
export const generateMainAriaLabel = () => {
  return {
    role: "main",
    "aria-label": "Main content"
  };
};

export default {
  SEO_METADATA,
  SERVICE_METADATA,
  generateOrganizationSchema,
  generateTravelAgencySchema,
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateDestinationSchema,
  generateTourPackageSchema,
  formatSEOUrl,
  getCanonicalUrl,
  generateDestinationAlt,
  generateAltText,
  generateOGTags,
  generateTwitterTags,
  generateNavAriaLabel,
  generateMainAriaLabel
};
