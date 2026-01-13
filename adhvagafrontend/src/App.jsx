import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/includes/Navbar'
import Footer from './Components/includes/Footer'
import AboutPage from './Pages/AboutPage'
import Blogs from './Pages/Blogs'
import CostomPackages from './Pages/CostomPackages'
import Home from './Pages/Home'
import Support from './Pages/Support'
import TourPackages from './Pages/tourpackages'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  return (
   <BrowserRouter>
   <Navbar /> 
      <Routes>
        
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Coustom" element={<CostomPackages />} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Support" element={<Support/>} />
        <Route path="/Packages" element={<TourPackages/>} />


      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
