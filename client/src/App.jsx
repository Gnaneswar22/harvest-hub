import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/auth/Login';
import PortalSignup from './pages/auth/PortalSignup';
import RoleSelect from './pages/auth/RoleSelect';
import Dashboard from './pages/farmer/Dashboard';
import AddCrop from './pages/farmer/AddCrop';
import MarketFeed from './pages/buyer/MarketFeed';
import CategoryPage from './pages/buyer/CategoryPage';
import ProductDetail from './pages/buyer/ProductDetail';
import NotFound from './pages/common/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#558B2F] flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<MarketFeed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<PortalSignup />} />
              <Route path="/portal/signup" element={<PortalSignup />} />
              <Route path="/role-select" element={<RoleSelect />} />
              <Route path="/farmer/dashboard" element={<Dashboard />} />
              <Route path="/producer/dashboard" element={<Dashboard />} />
              <Route path="/farmer/add-crop" element={<AddCrop />} />
              <Route path="/buyer/market" element={<MarketFeed />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
