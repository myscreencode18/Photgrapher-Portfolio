import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './pages/HeroSection';
import Portfolio from './pages/Portfolio';
import Services from './pages/Service';
import Contact from './pages/Contact';
import About from './pages/About';
import StoriesLanding from './pages/StoriesLanding';
import StoryPage from './pages/StoryPage';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import AdminDashboard from './pages/AdminDashboard';
import AboutVisualBiography from './pages/AboutVisualBiography';

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* Home page with Hero + Portfolio */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
          
            </>
          }
        />

        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Portfolio />} />
   


        {/* Stories */}
        <Route path="/stories" element={<StoriesLanding />} />
        <Route path="/stories/:id" element={<StoryPage />} />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
