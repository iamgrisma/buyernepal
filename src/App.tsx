import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from './components/ui/Toaster';
import { LoadingSpinner } from './components/ui/Loading';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

// Lazy load admin components
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminScripts = lazy(() => import('./pages/admin/AdminScripts'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="scripts" element={<AdminScripts />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
