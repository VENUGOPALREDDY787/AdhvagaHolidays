import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsProvider } from "./context/SettingsContext";
import Navbar from "./Components/includes/Navbar";
import Footer from "./Components/includes/Footer";
import LoadingScreen from "./Components/includes/LoadingScreen";
import AboutPage from "./Pages/AboutPage";
import Blogs from "./Pages/Blogs";
import CostomPackages from "./Pages/CostomPackages";
import Home from "./Pages/Home";
import Support from "./Pages/Support";
import International from "./Pages/InternationalPackages.jsx";
import Domestic from "./Pages/DomesticPackages.jsx";
import ServicesPage from "./Pages/Servicespage.jsx";
import TermsPage from "./Pages/Terms";
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

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ================= DEFAULT ROUTE ================= */}
          <Route path="/" element={<Navigate to="/Home" replace />} />

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/About" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/Blogs" element={<PageTransition><Blogs /></PageTransition>} />
          <Route path="/Coustom" element={<PageTransition><CostomPackages /></PageTransition>} />
          <Route path="/Home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/Support" element={<PageTransition><Support /></PageTransition>} />
          <Route path="/International" element={<PageTransition><International /></PageTransition>} />
          <Route path="/packages/:id" element={<PageTransition><PackageDetails /></PageTransition>} />
          <Route path="/Domestic" element={<PageTransition><Domestic /></PageTransition>} />
          <Route path="/Services" element={<PageTransition><ServicesPage/></PageTransition>} />
          <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
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
        </Routes>
      </AnimatePresence>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization (minimum 2 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <SettingsProvider>
        {loading && <LoadingScreen />}
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  );
}

export default App;
