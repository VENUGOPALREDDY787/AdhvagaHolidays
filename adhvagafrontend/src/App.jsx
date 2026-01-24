import reactLogo from "./assets/react.svg";
import Navbar from "./Components/includes/Navbar";
import Footer from "./Components/includes/Footer";
import AboutPage from "./Pages/AboutPage";
import Blogs from "./Pages/Blogs";
import CostomPackages from "./Pages/CostomPackages";
import Home from "./Pages/Home";
import Support from "./Pages/Support";
import TourPackages from "./Pages/tourpackages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPortal from "./AdminPortal.jsx";
import ProtectedRoute from "./config/ProtectedRoute.jsx";
import LoginPage from "./Components/Login/LoginPage.jsx";
 import EditPackageForm from './Components/Admin/EditPackageForm.jsx'
 import PackageDetails from "./PackageDetails";

// import DomesticPackages from './Components/Packages/DomesticPackages.jsx'
// import VisaAssistant from './VisaAssistant.jsx'
// import Services from './Services'
import "./App.css";
// import PackageDetails from "./PackageDetails.jsx";

function App() {
//   const demoPackage = {
//   name: "Royal Rajasthan Heritage Tour",
//   price: 35000,
//   duration: "7 Days / 6 Nights",
//   destination: "Jaipur • Jodhpur • Udaipur",
//   image: "https://images.unsplash.com/photo-1548013146-72479768bada",
//   description:
//     "Experience the royal heritage of Rajasthan with majestic forts, palaces, desert safaris, and authentic cultural experiences.",
//   highlights: [
//     "Amber Fort & City Palace visit",
//     "Desert safari in Jaisalmer",
//     "Traditional Rajasthani folk dance",
//     "Luxury heritage hotel stay",
//   ],
//   itinerary: [
//     {
//       day: 1,
//       title: "Arrival in Jaipur",
//       description:
//         "Arrival at Jaipur airport, hotel check-in, evening local market visit.",
//     },
//     {
//       day: 2,
//       title: "Jaipur Sightseeing",
//       description:
//         "Visit Amber Fort, Hawa Mahal, City Palace and Jantar Mantar.",
//     },
//     {
//       day: 3,
//       title: "Jodhpur Transfer",
//       description:
//         "Drive to Jodhpur, visit Mehrangarh Fort and local bazaars.",
//     },
//   ],
//   includes: [
//     "Hotel accommodation",
//     "Daily breakfast",
//     "Airport transfers",
//     "Guided sightseeing tours",
//   ],
//   excludes: [
//     "Flight tickets",
//     "Personal expenses",
//     "Travel insurance",
//   ],
// };

// const handleBack = () => {
//   console.log("Back button clicked");
// };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/About" element={<AboutPage />} />
  <Route path="/Blogs" element={<Blogs />} />
  <Route path="/Coustom" element={<CostomPackages />} />
  <Route path="/Home" element={<Home />} />
  <Route path="/Support" element={<Support />} />
  <Route path="/Packages" element={<TourPackages />} />
  <Route path="/packages/:id" element={<PackageDetails />} />


  {/* 🔐 Admin Auth */}
  <Route path="/admin/login" element={<LoginPage onLogin={() => window.location.href = "/admin"} />} />

  {/* 🔐 Protected Admin */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminPortal />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/edit/:id"
    element={
      <ProtectedRoute>
        <EditPackageForm />
      </ProtectedRoute>
    }
  />
</Routes>

      <Footer />
    </BrowserRouter>
          );
}

export default App;
