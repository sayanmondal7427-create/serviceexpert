import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'services' | 'contact' | 'login' | 'register' | 'forgot-password' | 'dashboard';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { identity, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingOut = loginStatus === 'logging-in';

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    onNavigate('home');
    setMobileMenuOpen(false);
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <img 
              src="/assets/generated/serviceexpert-logo-transparent.dim_200x200.png" 
              alt="ServiceExpert Logo" 
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-2xl font-bold">ServiceExpert</h1>
              <p className="text-xs text-emerald-100">বাড়ির যন্ত্রপাতি মেরামত সেবা</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-medium hover:text-emerald-100 transition-colors ${
                currentPage === 'home' ? 'text-white border-b-2 border-white' : 'text-emerald-50'
              }`}
            >
              হোম
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`font-medium hover:text-emerald-100 transition-colors ${
                currentPage === 'services' ? 'text-white border-b-2 border-white' : 'text-emerald-50'
              }`}
            >
              সেবাসমূহ
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`font-medium hover:text-emerald-100 transition-colors ${
                currentPage === 'contact' ? 'text-white border-b-2 border-white' : 'text-emerald-50'
              }`}
            >
              যোগাযোগ
            </button>

            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => handleNavClick('dashboard')}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <User className="h-4 w-4 mr-2" />
                  ড্যাশবোর্ড
                </Button>
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {isLoggingOut ? 'লগআউট হচ্ছে...' : 'লগআউট'}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => handleNavClick('login')}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                লগইন
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-white/20 pt-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 px-4 rounded-lg font-medium transition-colors ${
                currentPage === 'home' ? 'bg-white/20 text-white' : 'text-emerald-50 hover:bg-white/10'
              }`}
            >
              হোম
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`text-left py-2 px-4 rounded-lg font-medium transition-colors ${
                currentPage === 'services' ? 'bg-white/20 text-white' : 'text-emerald-50 hover:bg-white/10'
              }`}
            >
              সেবাসমূহ
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 px-4 rounded-lg font-medium transition-colors ${
                currentPage === 'contact' ? 'bg-white/20 text-white' : 'text-emerald-50 hover:bg-white/10'
              }`}
            >
              যোগাযোগ
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="text-left py-2 px-4 rounded-lg font-medium text-emerald-50 hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  ড্যাশবোর্ড
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-left py-2 px-4 rounded-lg font-medium text-emerald-50 hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {isLoggingOut ? 'লগআউট হচ্ছে...' : 'লগআউট'}
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="text-left py-2 px-4 rounded-lg font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                লগইন
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
