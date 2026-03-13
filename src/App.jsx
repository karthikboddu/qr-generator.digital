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
import NotFound from './pages/NotFound';
import GeneratorPage from './pages/GeneratorPage';
import MainLayout from './layouts/MainLayout';
import { trackSiteVisit } from './lib/trackSiteVisit';

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
            <>
              <Header />
              <Login />
            </>
        } />
      <Route path="/register" element={
            <>
              <Header />
              <Register />
            </>
        } />
      <Route path="/qr/:qrId" element={
            <>
              <Header />
              <SharedQR />
            </>
        } />
      <Route path="/about" element={
            <>
              <Header />
              <AboutPage />
            </>
        } />
      <Route path="/faq" element={
            <>
              <Header />
              <FaqPage />
            </>
        } />
      <Route path="/privacy-policy" element={
            <>
              <Header />
              <PrivacyPolicyPage />
            </>
        } />
      <Route path="/contact" element={
            <>
              <Header />
              <ContactPage />
            </>
        }/>      
      <Route
        path="/"
        element={
            <>
              <Header />
              <Generator />
            </>
        }
      />
      {/* Authenticated routes with main layout */}
      <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/*<Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} /> */}
        {/* <Route path="/" element={<GeneratorPage />} /> */}

      </Route>
      <Route path="/generator/:slug" element={<GeneratorPage />} />      
      <Route
        path="/blog"
        element={
            <>
              <Header />
              <Blog />
            </>
        }
      />
      <Route
        path="/blog/:slug"
        element={
            <>
              <Header />
              <BlogPost />
            </>
        }
      />
      <Route
        path="*"
        element={
          <>
            <Header />
            <NotFound />
          </>
        }
      />

      {/* This will only be hit if no other route matches */}
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
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
