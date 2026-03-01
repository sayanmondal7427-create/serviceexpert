import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { KeyRound, Info } from 'lucide-react';

type Page = 'home' | 'services' | 'contact' | 'login' | 'register' | 'forgot-password' | 'dashboard';

interface ForgotPasswordPageProps {
  onNavigate: (page: Page) => void;
}

export default function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-emerald-100 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-2">
            <KeyRound className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900">পাসওয়ার্ড পুনরুদ্ধার</CardTitle>
          <CardDescription className="text-base">
            আপনার অ্যাকাউন্ট পুনরুদ্ধার করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="border-emerald-200 bg-emerald-50">
            <Info className="h-4 w-4 text-emerald-600" />
            <AlertDescription className="text-slate-700">
              Internet Identity ব্যবহার করে আপনার অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে সুরক্ষিত থাকে। আপনার ডিভাইস এবং বায়োমেট্রিক্স ব্যবহার করে আপনি সহজেই লগইন করতে পারবেন।
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-slate-900">অ্যাকাউন্ট পুনরুদ্ধারের ধাপ:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                <li>আপনার নিবন্ধিত ডিভাইস ব্যবহার করুন</li>
                <li>Internet Identity পোর্টালে যান</li>
                <li>আপনার বায়োমেট্রিক্স বা পিন ব্যবহার করে প্রবেশ করুন</li>
                <li>প্রয়োজনে রিকভারি ফ্রেজ ব্যবহার করুন</li>
              </ol>
            </div>

            <Button
              onClick={() => onNavigate('login')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              লগইন পেজে ফিরে যান
            </Button>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <p className="text-center text-sm text-slate-600 mb-3">নতুন ব্যবহারকারী?</p>
            <Button
              onClick={() => onNavigate('register')}
              variant="outline"
              className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-slate-700">
              <strong>গুরুত্বপূর্ণ:</strong> আপনার রিকভারি ফ্রেজ নিরাপদ স্থানে সংরক্ষণ করুন। এটি হারিয়ে গেলে আপনার অ্যাকাউন্ট পুনরুদ্ধার করা সম্ভব নাও হতে পারে।
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
