import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Generator from './pages/Generator';
import SharedQR from './pages/SharedQR';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ContactPage from './pages/ContactPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import DynamicQRRedirect from './pages/DynamicQRRedirect';
import SocialHubPage from './pages/SocialHubPage';
import BulkQRGenerator from './pages/BulkQRGenerator';
import GeneratorPage from './pages/GeneratorPage';
import TemplatesMarketplace from './pages/TemplatesMarketplace';
import InspirationGallery from './pages/InspirationGallery';
import NotFound from './pages/NotFound';
import PricingPage from './pages/PricingPage';
import FeaturesPage from './pages/FeaturesPage';
import WeddingRSVPPage from './pages/WeddingRSVPPage';
import { trackSiteVisit } from './lib/trackSiteVisit';
import MainLayout from './layouts/MainLayout';
import Footer from './components/Footer';

function PageLayout({ children, showHeader = true }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showHeader && <Header />}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/login" element={
        <PageLayout>
          <Login />
        </PageLayout>
      } />
      <Route path="/register" element={
        <PageLayout>
          <Register />
        </PageLayout>
      } />
      <Route path="/qr/:qrId" element={
        <PageLayout>
          <SharedQR />
        </PageLayout>
      } />
      <Route path="/about" element={
        <PageLayout>
          <AboutPage />
        </PageLayout>
      } />
      <Route path="/r/:shortId" element={
        <PageLayout showHeader={false}>
          <DynamicQRRedirect />
        </PageLayout>
      } />
      <Route path="/hub/:shortId" element={
        <PageLayout showHeader={false}>
          <SocialHubPage />
        </PageLayout>
      } />
      <Route path="/faq" element={
        <PageLayout>
          <FaqPage />
        </PageLayout>
      } />
      <Route path="/privacy-policy" element={
        <PageLayout>
          <PrivacyPolicyPage />
        </PageLayout>
      } />
      <Route path="/pricing" element={
        <PageLayout>
          <PricingPage />
        </PageLayout>
      } />
      <Route path="/wedding-rsvp-qr-code-generator" element={
        <PageLayout>
          <WeddingRSVPPage />
        </PageLayout>
      } />
      <Route path="/features" element={
        <PageLayout>
          <FeaturesPage />
        </PageLayout>
      } />
      <Route path="/contact" element={
        <PageLayout>
          <ContactPage />
        </PageLayout>
      } />
      <Route
        path="/"
        element={
          <PageLayout>
            <Generator />
          </PageLayout>
        }
      />
      {/* Authenticated routes with main layout */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
      <Route path="/inspiration" element={
        <PageLayout>
          <InspirationGallery />
        </PageLayout>
      } />
      
      <Route path="/templates" element={
        <PageLayout>
          <TemplatesMarketplace />
        </PageLayout>
      } />
      
      <Route path="/generator/:slug" element={
        <PageLayout>
          <GeneratorPage />
        </PageLayout>
      } />
      <Route
        path="/blog"
        element={
          <PageLayout>
            <Blog />
          </PageLayout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <PageLayout>
            <BlogPost />
          </PageLayout>
        }
      />
      <Route path="/bulk" element={
        <PageLayout>
          <BulkQRGenerator />
        </PageLayout>
      } />
      <Route
        path="*"
        element={
          <PageLayout>
            <NotFound />
          </PageLayout>
        }
      />
    </Routes>
  );
}

function App() {
  useEffect(() => {
    trackSiteVisit();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
