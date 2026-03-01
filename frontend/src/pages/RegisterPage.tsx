import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, AlertCircle } from 'lucide-react';

type Page = 'home' | 'services' | 'contact' | 'login' | 'register' | 'forgot-password' | 'dashboard';

interface RegisterPageProps {
  onNavigate: (page: Page) => void;
}

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { login, loginStatus, loginError } = useInternetIdentity();

  const handleRegister = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-emerald-100 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
            <UserPlus className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900">নিবন্ধন করুন</CardTitle>
          <CardDescription className="text-base">
            ServiceExpert এ নতুন অ্যাকাউন্ট তৈরি করুন
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
              onClick={handleRegister}
              disabled={loginStatus === 'logging-in'}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg"
            >
              {loginStatus === 'logging-in' ? 'নিবন্ধন হচ্ছে...' : 'Internet Identity দিয়ে নিবন্ধন করুন'}
            </Button>

            <div className="text-center text-sm text-slate-600">
              <p>Internet Identity ব্যবহার করে নিরাপদভাবে নিবন্ধন করুন</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-600 mb-3">ইতিমধ্যে অ্যাকাউন্ট আছে?</p>
            <Button
              onClick={() => onNavigate('login')}
              variant="outline"
              className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              লগইন করুন
            </Button>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Internet Identity কী?</h4>
            <p className="text-sm text-slate-600">
              Internet Identity হল একটি নিরাপদ এবং গোপনীয় প্রমাণীকরণ পদ্ধতি যা আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখে।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
