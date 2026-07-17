import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import AnimatedOutlet from '@/components/AnimatedOutlet';
import ProtectedRoute from '@/components/ProtectedRoute';
import Auth from '@/pages/Auth';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { FitnessProvider } from '@/lib/FitnessContext';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Landing from '@/pages/Landing';
import Pricing from '@/pages/Pricing';
import { ProProvider } from '@/lib/ProContext';
import { Suspense, lazy } from 'react';
import ProRoute from '@/components/ProRoute';
import ProLayout from '@/components/ProLayout';
const ProDashboard = lazy(() => import('@/pages/pro/ProDashboard'));
const ProWorkout = lazy(() => import('@/pages/pro/ProWorkout'));
const ProProgressi = lazy(() => import('@/pages/pro/ProProgressi'));
const ProCalendario = lazy(() => import('@/pages/pro/ProCalendario'));
const ProSfide = lazy(() => import('@/pages/pro/ProSfide'));
const ProBot = lazy(() => import('@/pages/pro/ProBot'));
const ProFeedback = lazy(() => import('@/pages/pro/ProFeedback'));
const ProDiario = lazy(() => import('@/pages/pro/ProDiario'));
const ProAssistente = lazy(() => import('@/pages/pro/ProAssistente'));
const ProSchede = lazy(() => import('@/pages/pro/ProSchede'));
const ProRicompense = lazy(() => import('@/pages/pro/ProRicompense'));
const ProOffline = lazy(() => import('@/pages/pro/ProOffline'));
const ProVideo = lazy(() => import('@/pages/pro/ProVideo'));
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Blocco hard: utente non registrato (app privata)
  if (authError && authError.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  // Route: auth pubbliche, pagine protette via ProtectedRoute, area PRO via ProRoute
  return (
    <Routes>
      <Route element={<FitnessProvider><ProProvider><AnimatedOutlet keyFn={(p) => p.split('/')[1] || 'root'} /></ProProvider></FitnessProvider>}>
        {/* Pubbliche */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Protette (login richiesto) */}
        <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/auth" replace />} />}>
          <Route path="/app" element={<Home />} />
          <Route path="/profilo" element={<Profile />} />
        </Route>

        {/* Area PRO (ProRoute verifica ProUser per email) */}
        <Route path="/pro" element={<ProRoute><ProLayout /></ProRoute>}>
          <Route index element={<Navigate to="/pro/dashboard" replace />} />
          <Route path="dashboard" element={<ProDashboard />} />
          <Route path="workout" element={<ProWorkout />} />
          <Route path="diario" element={<ProDiario />} />
          <Route path="progressi" element={<ProProgressi />} />
          <Route path="calendario" element={<ProCalendario />} />
          <Route path="sfide" element={<ProSfide />} />
          <Route path="schede" element={<ProSchede />} />
          <Route path="ricompense" element={<ProRicompense />} />
          <Route path="offline" element={<ProOffline />} />
          <Route path="video" element={<ProVideo />} />
          <Route path="bot" element={<ProBot />} />
          <Route path="assistente" element={<ProAssistente />} />
          <Route path="feedback" element={<ProFeedback />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App