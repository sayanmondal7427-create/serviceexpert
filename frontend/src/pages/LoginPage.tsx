import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, AlertCircle } from 'lucide-react';

type Page = 'home' | 'services' | 'contact' | 'login' | 'register' | 'forgot-password' | 'dashboard';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { login, loginStatus, loginError } = useInternetIdentity();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-emerald-100 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
            <LogIn className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900">লগইন করুন</CardTitle>
          <CardDescription className="text-base">
            ServiceExpert এ আপনার অ্যাকাউন্টে প্রবেশ করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {loginError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError.message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg"
            >
              {loginStatus === 'logging-in' ? 'লগইন হচ্ছে...' : 'Internet Identity দিয়ে লগইন করুন'}
            </Button>

            <div className="text-center text-sm text-slate-600">
              <p>Internet Identity ব্যবহার করে নিরাপদভাবে লগইন করুন</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-3">
            <p className="text-center text-sm text-slate-600">নতুন ব্যবহারকারী?</p>
            <Button
              onClick={() => onNavigate('register')}
              variant="outline"
              className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('forgot-password')}
              className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              পাসওয়ার্ড ভুলে গেছেন?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
