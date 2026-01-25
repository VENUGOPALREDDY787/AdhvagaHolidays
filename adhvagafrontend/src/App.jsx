import reactLogo from "./assets/react.svg";
import Navbar from "./Components/includes/Navbar";
import Footer from "./Components/includes/Footer";
import AboutPage from "./Pages/AboutPage";
import Blogs from "./Pages/Blogs";
import CostomPackages from "./Pages/CostomPackages";
import Home from "./Pages/Home";
import Support from "./Pages/Support";
import International from "./Pages/InternationalPackages.jsx";
import Domestic from "./Pages/DomesticPackages.jsx";
import ServicesPage from "./Pages/Servicespage.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "./config/ProtectedRoute.jsx";
import LoginPage from "./Components/Login/LoginPage.jsx";
import PackageDetails from "./PackageDetails.jsx";
import AdminDashboard from "./Pages/AdminDashboard";
import "./App.css";

/* 🔹 Layout controller */
function Layout() {
  const location = useLocation();

  // Hide navbar & footer on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Coustom" element={<CostomPackages />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/International" element={<International />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/Domestic" element={<Domestic />} />
        <Route path="/Services" element={<ServicesPage/>} />

        {/* ================= ADMIN AUTH ================= */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ================= PROTECTED ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

