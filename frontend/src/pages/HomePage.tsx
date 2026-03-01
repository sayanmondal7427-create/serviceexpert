import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wrench, Clock, Shield, Users } from 'lucide-react';

type Page = 'home' | 'services' | 'contact' | 'login' | 'register' | 'forgot-password' | 'dashboard';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                বাড়ির যন্ত্রপাতি মেরামতের জন্য <span className="text-emerald-600">বিশ্বস্ত সেবা</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                আমরা ওয়াশিং মেশিন, রেফ্রিজারেটর, এয়ার কন্ডিশনার এবং মাইক্রোওয়েভ ওভেনের জন্য দ্রুত এবং নির্ভরযোগ্য মেরামত সেবা প্রদান করি।
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => onNavigate('services')}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                >
                  সেবা দেখুন
                </Button>
                <Button
                  onClick={() => onNavigate('contact')}
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  যোগাযোগ করুন
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-banner.dim_1200x600.jpg"
                alt="Home Appliance Repair"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            কেন আমাদের বেছে নেবেন?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">দক্ষ টেকনিশিয়ান</h3>
                <p className="text-slate-600">
                  আমাদের অভিজ্ঞ এবং প্রশিক্ষিত টেকনিশিয়ানরা সর্বোচ্চ মানের সেবা প্রদান করে।
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">দ্রুত সেবা</h3>
                <p className="text-slate-600">
                  আমরা ২৪ ঘন্টার মধ্যে আপনার বাড়িতে পৌঁছে যাই এবং দ্রুত সমস্যা সমাধান করি।
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">গ্যারান্টি সেবা</h3>
                <p className="text-slate-600">
                  সকল মেরামত কাজের জন্য আমরা ৩০ দিনের গ্যারান্টি প্রদান করি।
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">সন্তুষ্ট গ্রাহক</h3>
                <p className="text-slate-600">
                  ১০,০০০+ সন্তুষ্ট গ্রাহক আমাদের সেবায় বিশ্বাস করেন।
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            আজই আপনার যন্ত্রপাতি মেরামত করুন
          </h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            আমাদের সাথে যোগাযোগ করুন এবং দ্রুত, নির্ভরযোগ্য সেবা পান।
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            size="lg"
            variant="outline"
            className="bg-white text-emerald-600 hover:bg-emerald-50 border-0 px-8"
          >
            এখনই যোগাযোগ করুন
          </Button>
        </div>
      </section>
    </div>
  );
}
