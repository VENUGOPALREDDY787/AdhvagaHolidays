import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsProvider } from "./context/SettingsContext";
import Navbar from "./Components/includes/Navbar";
import Footer from "./Components/includes/Footer";
import LoadingScreen from "./Components/includes/LoadingScreen";
import FlyersSplash from "./Components/includes/FlyersSplash";
import AboutPage from "./Pages/AboutPage";
import Home from "./Pages/Home";
import Support from "./Pages/Support";
import International from "./Pages/InternationalPackages.jsx";
import Domestic from "./Pages/DomesticPackages.jsx";
import ServicesPage from "./Pages/Servicespage.jsx";
import VisaPage from "./Pages/VisaPage.jsx";
import VisaDetails from "./Pages/VisaDetails.jsx";
import TermsPage from "./Pages/Terms";
import ThankYou from "./Pages/ThankYou";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./config/ProtectedRoute.jsx";
import LoginPage from "./Components/Login/LoginPage.jsx";
import PackageDetails from "./PackageDetails.jsx";
import AdminDashboard from "./Pages/AdminDashboard";
import ExploreGlobe from "./Pages/ExploreGlobe.jsx";
import IndiaGlobe from "./Pages/IndiaGlobe.jsx";
import NotFound from "./Pages/NotFound";
import ScrollToTop from "./Components/SEO/ScrollToTop.jsx";
import { ScrollProgress } from "./Components/includes/ScrollAnimations.jsx";
import "./Components/includes/ScrollAnimations.css";
import "./App.css";

/* ��� Page Transition Wrapper */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ��� Layout controller */
function Layout() {
  const location = useLocation();

  // Hide navbar & footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");
  const cinematicRoutes = new Set([
    "/home",
    "/about",
    "/domestic",
    "/international",
    "/support",
  ]);
  const isCinematicRoute = cinematicRoutes.has(location.pathname.toLowerCase());
  const showGlobalChrome = !isAdminRoute;

  return (
    <>
      {/* Scroll progress bar - shows reading progress */}
      {showGlobalChrome && <ScrollProgress />}

      {/* Scroll to top on route change - essential for SEO and UX */}
      <ScrollToTop />

      {showGlobalChrome && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ================= DEFAULT ROUTE ================= */}
          <Route path="/" element={<Navigate to="/Home" replace />} />

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/About" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/Home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/Support" element={<PageTransition><Support /></PageTransition>} />
          <Route path="/International" element={<PageTransition><International /></PageTransition>} />
          <Route path="/packages/:id" element={<PageTransition><PackageDetails /></PageTransition>} />
          <Route path="/Domestic" element={<PageTransition><Domestic /></PageTransition>} />
          <Route path="/Services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/visa" element={<PageTransition><VisaPage /></PageTransition>} />
          <Route path="/visa/:id" element={<PageTransition><VisaDetails /></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
          <Route path="/thank-you" element={<PageTransition><ThankYou /></PageTransition>} />
          <Route path="/explore-globe" element={<PageTransition><ExploreGlobe /></PageTransition>} />
          <Route path="/india-globe" element={<PageTransition><IndiaGlobe /></PageTransition>} />

          {/* ================= ADMIN AUTH ================= */}
          <Route path="/admin/login" element={<PageTransition><LoginPage /></PageTransition>} />

          {/* ================= PROTECTED ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PageTransition><AdminDashboard /></PageTransition>
              </ProtectedRoute>
            }
          />

          {/* ================= 404 NOT FOUND ================= */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      {showGlobalChrome && <Footer />}
    </>
  );
}

// AppContent removed, logic moved to App

function App() {
  const [appState, setAppState] = useState("LOADING"); // 'LOADING' | 'FLYERS' | 'READY'

  useEffect(() => {
    // Keep loading sequence.
    const timer = setTimeout(() => {
      if (window.location.pathname.toLowerCase().startsWith("/admin")) {
        setAppState("READY");
      } else {
        setAppState("FLYERS");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          {appState === "LOADING" && <LoadingScreen />}
          {appState === "FLYERS" && (
            <FlyersSplash
              duration={4000}
              onDone={() => setAppState("READY")}
            />
          )}
          {appState === "READY" && <Layout />}
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
