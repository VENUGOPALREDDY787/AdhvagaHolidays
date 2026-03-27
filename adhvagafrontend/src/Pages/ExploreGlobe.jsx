import SEOHead from "../Components/SEO/SEOHead";
import { SEO_METADATA, generateBreadcrumbSchema } from "../utils/seoHelpers";
import DomeGallery from "../Components/DomeGallery/DomeGallery";

// --- International Tourist Places Images (optimized with fast CDN URLs) ---
const INTERNATIONAL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80", alt: "Paris", name: "Paris", info: "The City of Light with iconic Eiffel Tower" },
  { src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80", alt: "Rome", name: "Rome", info: "The Eternal City, home to ancient history" },
  { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80", alt: "Tokyo", name: "Tokyo", info: "Neon skyscrapers meet ancient temples" },
  { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=300&q=80", alt: "London", name: "London", info: "Historic capital with Big Ben & Tower Bridge" },
  { src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=300&q=80", alt: "New York", name: "New York", info: "The city that never sleeps, Times Square" },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80", alt: "Dubai", name: "Dubai", info: "Futuristic city with Burj Khalifa" },
  { src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=300&q=80", alt: "Sydney", name: "Sydney", info: "Stunning Opera House & Harbour Bridge" },
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80", alt: "Bali", name: "Bali", info: "Tropical paradise with beaches & temples" },
  { src: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=300&q=80", alt: "Cairo", name: "Cairo", info: "Gateway to the Great Pyramids of Giza" },
  { src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&q=80", alt: "Santorini", name: "Santorini", info: "White-washed houses on volcanic cliffs" },
  { src: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=300&q=80", alt: "Barcelona", name: "Barcelona", info: "Gaudi's masterpieces & Mediterranean beaches" },
  { src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=300&q=80", alt: "Venice", name: "Venice", info: "Romantic canals & gondolas of Italy" },
  { src: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=300&q=80", alt: "Amsterdam", name: "Amsterdam", info: "Canals, tulips & artistic heritage" },
  { src: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=300&q=80", alt: "Prague", name: "Prague", info: "Medieval city with stunning architecture" },
  { src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=300&q=80", alt: "Singapore", name: "Singapore", info: "Modern city-state with Gardens by the Bay" },
  { src: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=300&q=80", alt: "Bangkok", name: "Bangkok", info: "Golden temples & vibrant street life" },
  { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=300&q=80", alt: "Maldives", name: "Maldives", info: "Crystal-clear waters & overwater bungalows" },
  { src: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=300&q=80", alt: "Hong Kong", name: "Hong Kong", info: "Dazzling skyline & Victoria Harbour" },
  { src: "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=300&q=80", alt: "Las Vegas", name: "Las Vegas", info: "Entertainment capital with dazzling casinos" },
  { src: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=300&q=80", alt: "Rio de Janeiro", name: "Rio de Janeiro", info: "Christ the Redeemer & Copacabana Beach" },
  { src: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=300&q=80", alt: "Vienna", name: "Vienna", info: "Imperial palaces & classical music heritage" },
  { src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=300&q=80", alt: "Istanbul", name: "Istanbul", info: "Where East meets West, historic bazaars" },
  { src: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=300&q=80", alt: "Lisbon", name: "Lisbon", info: "Colorful tiles & historic tram rides" },
  { src: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=300&q=80", alt: "Seoul", name: "Seoul", info: "K-pop culture & traditional palaces" },
  { src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=300&q=80", alt: "Cape Town", name: "Cape Town", info: "Table Mountain & stunning coastline" },
  { src: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=300&q=80", alt: "Abu Dhabi", name: "Abu Dhabi", info: "Grand Mosque & luxury desert experiences" },
  { src: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=300&q=80", alt: "Marrakech", name: "Marrakech", info: "Vibrant souks & Moroccan architecture" },
  { src: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=300&q=80", alt: "Athens", name: "Athens", info: "Ancient Acropolis & Greek mythology" },
  { src: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=300&q=80", alt: "Kuala Lumpur", name: "Kuala Lumpur", info: "Petronas Twin Towers & diverse culture" },
  { src: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=300&q=80", alt: "Phuket", name: "Phuket", info: "Thailand's largest island with stunning beaches" },
  { src: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?auto=format&fit=crop&w=300&q=80", alt: "Reykjavik", name: "Reykjavik", info: "Northern Lights & geothermal wonders" },
  { src: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=300&q=80", alt: "Edinburgh", name: "Edinburgh", info: "Historic castle & Scottish highlands gateway" },
  { src: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=300&q=80", alt: "Berlin", name: "Berlin", info: "History, art & Brandenburg Gate" },
  { src: "https://images.unsplash.com/photo-1559511260-66a68e27c6b6?auto=format&fit=crop&w=300&q=80", alt: "Vancouver", name: "Vancouver", info: "Mountains meet ocean in stunning harmony" },
  { src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=300&q=80", alt: "Buenos Aires", name: "Buenos Aires", info: "Tango capital with European elegance" },
  { src: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&w=300&q=80", alt: "Cancun", name: "Cancun", info: "Caribbean beaches & Mayan ruins nearby" },
  { src: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=300&q=80", alt: "Florence", name: "Florence", info: "Renaissance art & Tuscan beauty" },
  { src: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=300&q=80", alt: "Miami", name: "Miami", info: "Art Deco beaches & vibrant nightlife" },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80", alt: "Kyoto", name: "Kyoto", info: "Ancient temples & traditional gardens" },
  { src: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=300&q=80", alt: "Los Angeles", name: "Los Angeles", info: "Hollywood glamour & Pacific beaches" },
  { src: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=300&q=80", alt: "Mykonos", name: "Mykonos", info: "White beaches & legendary Greek nightlife" },
  { src: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=300&q=80", alt: "Hanoi", name: "Hanoi", info: "Ancient temples & French colonial charm" },
  { src: "https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&w=300&q=80", alt: "Jerusalem", name: "Jerusalem", info: "Sacred city with millennia of history" },
  { src: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=300&q=80", alt: "Beijing", name: "Beijing", info: "Forbidden City & Great Wall gateway" },
  { src: "https://images.unsplash.com/photo-1558370781-d6196949e317?auto=format&fit=crop&w=300&q=80", alt: "Seville", name: "Seville", info: "Flamenco passion & Moorish architecture" },
  { src: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=300&q=80", alt: "Mauritius", name: "Mauritius", info: "Paradise island with turquoise lagoons" },
  { src: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=300&q=80", alt: "Queenstown", name: "Queenstown", info: "Adventure capital with alpine beauty" },
  { src: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?auto=format&fit=crop&w=300&q=80", alt: "Petra", name: "Petra", info: "Ancient rose-red city carved in stone" },
  { src: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?auto=format&fit=crop&w=300&q=80", alt: "Shanghai", name: "Shanghai", info: "Futuristic skyline meets historic Bund" },
  { src: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=300&q=80", alt: "Stockholm", name: "Stockholm", info: "Nordic beauty spread across 14 islands" }
];

export default function TouristGlobe() {
  const metadata = SEO_METADATA.exploreGlobe;
  const breadcrumbs = [
    { name: "Home", url: "/home" },
    { name: "Explore Globe", url: "/explore-globe" }
  ];

  return (
    <>
      <SEOHead
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        url="/explore-globe"
        image={metadata.image}
        structuredData={generateBreadcrumbSchema(breadcrumbs)}
      />
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#060010' }}>
        <DomeGallery
          images={INTERNATIONAL_IMAGES}
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={0}
          segments={34}
          dragDampening={2}
          grayscale
          showInfo
        />
      </div>
    </>
  );
}