import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-emerald-400">ServiceExpert সম্পর্কে</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              আমরা পশ্চিমবঙ্গে সেরা বাড়ির যন্ত্রপাতি মেরামত সেবা প্রদান করি। আমাদের দক্ষ টেকনিশিয়ানরা সর্বদা আপনার সেবায় প্রস্তুত।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-emerald-400">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">হোম</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">সেবাসমূহ</a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors">যোগাযোগ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-emerald-400">যোগাযোগ করুন</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>ফোন: 7551034609</li>
              <li>ইমেইল: sayanmondal7427@gmail.com</li>
              <li>ইমেইল: sayanmandal7551@gmail.com</li>
              <li>ঠিকানা: তারকেশ্বর, হুগলি, পশ্চিমবঙ্গ</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2 flex-wrap">
            © 2025. Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
