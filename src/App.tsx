import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout Components
import { PreHeader } from './components/layout/PreHeader';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileMenu } from './components/layout/MobileMenu';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { CreateStoryPage } from './pages/CreateStoryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { PrideEventsPage } from './pages/PrideEventsPage';
import { SupportGroupsPage } from './pages/SupportGroupsPage';
import { SupportGroupDetailPage } from './pages/SupportGroupDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { VolunteerApplyPage } from './pages/VolunteerApplyPage';
import { PartnersPage } from './pages/PartnersPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { DonatePage } from './pages/DonatePage';
import { DonateSuccessPage } from './pages/DonateSuccessPage';
import { DonateCancelPage } from './pages/DonateCancelPage';
import { SearchPage } from './pages/SearchPage';
import { SafetyPage } from './pages/SafetyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keydown listener for Cmd+K and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      <ScrollToTop />
      <PreHeader />
      <Header 
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)} 
        onOpenSearch={() => setIsSearchOpen(true)} 
      />
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
      />
      
      {/* Global Search Dialog Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Routed Content */}
      <main className="flex-1 pt-4 sm:pt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Stories */}
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/my-story" element={<StoriesPage />} />
          <Route path="/stories/:id" element={<StoryDetailPage />} />
          <Route path="/my-story/:id" element={<StoryDetailPage />} />
          <Route path="/stories/create" element={<CreateStoryPage />} />
          <Route path="/my-story/create" element={<CreateStoryPage />} />

          {/* Resources */}
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:slug" element={<ResourceDetailPage />} />

          {/* Community Forums */}
          <Route path="/community" element={<CommunityPage />} />

          {/* Events & Pride */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/pride-2026" element={<PrideEventsPage />} />
          <Route path="/pride-events" element={<PrideEventsPage />} />

          {/* Support Groups */}
          <Route path="/support-groups" element={<SupportGroupsPage />} />
          <Route path="/support-groups/:id" element={<SupportGroupDetailPage />} />

          {/* Magazine / Blog */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Volunteer */}
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/volunteer/apply" element={<VolunteerApplyPage />} />

          {/* Partners */}
          <Route path="/partners" element={<PartnersPage />} />

          {/* FAQ & Contact */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Donation */}
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/donate/success" element={<DonateSuccessPage />} />
          <Route path="/donate/cancel" element={<DonateCancelPage />} />

          {/* Search & Safety */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/safety" element={<SafetyPage />} />

          {/* Legal & Policy */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />

          {/* Auth & Account */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'SUB_ADMIN', 'MANAGER']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'SUB_ADMIN']}>
                <UserManagementPage />
              </ProtectedRoute>
            } 
          />

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Router>
              <AppContent />
            </Router>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
