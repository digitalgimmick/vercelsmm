import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/components/auth/AuthProvider';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import OrderPage from './pages/OrderPage';
import ThumbnailDownloader from './pages/tools/ThumbnailDownloader';
import UserDashboard from './pages/dashboard';
import PaymentSuccessPage from './pages/payment/SuccessPage';
import VideoAnalyzer from './pages/tools/VideoAnalyzer';
import AdminDashboard from './pages/admin/Dashboard';
import USAViewsPage from './pages/geo/USAViewsPage';
import UKViewsPage from './pages/geo/UKViewsPage';
import AustraliaViewsPage from './pages/geo/AustraliaViewsPage';
import BrazilViewsPage from './pages/geo/BrazilViewsPage';
import FranceViewsPage from './pages/geo/FranceViewsPage';
import GermanyViewsPage from './pages/geo/GermanyViewsPage';
import IndiaViewsPage from './pages/geo/IndiaViewsPage';
import ItalyViewsPage from './pages/geo/ItalyViewsPage';
import JapanViewsPage from './pages/geo/JapanViewsPage';
import NetherlandsViewsPage from './pages/geo/NetherlandsViewsPage';
import PolandViewsPage from './pages/geo/PolandViewsPage';
import TurkeyViewsPage from './pages/geo/TurkeyViewsPage';
import SpainViewsPage from './pages/geo/SpainViewsPage';
import SouthAfricaViewsPage from './pages/geo/SouthAfricaViewsPage';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/usa-views" element={<USAViewsPage />} />
                <Route path="/uk-views" element={<UKViewsPage />} />
                <Route path="/australia-views" element={<AustraliaViewsPage />} />
                <Route path="/brazil-views" element={<BrazilViewsPage />} />
                <Route path="/france-views" element={<FranceViewsPage />} />
                <Route path="/germany-views" element={<GermanyViewsPage />} />
                <Route path="/india-views" element={<IndiaViewsPage />} />
                <Route path="/italy-views" element={<ItalyViewsPage />} />
                <Route path="/japan-views" element={<JapanViewsPage />} />
                <Route path="/netherlands-views" element={<NetherlandsViewsPage />} />
                <Route path="/poland-views" element={<PolandViewsPage />} />
                <Route path="/turkey-views" element={<TurkeyViewsPage />} />
                <Route path="/spain-views" element={<SpainViewsPage />} />
                <Route path="/south-africa-views" element={<SouthAfricaViewsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/tools/video-analyzer" element={<VideoAnalyzer />} />
                <Route path="/tools/thumbnail-downloader" element={<ThumbnailDownloader />} />
                <Route path="/order" element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                } />
                <Route path="/payment/success" element={
                  <ProtectedRoute>
                    <PaymentSuccessPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/*" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
