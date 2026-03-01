import { Wrench, Thermometer, Wind, Flame, Zap, ChefHat, Layers, Cable, Microwave, Droplets } from 'lucide-react';

interface SubService {
  en: string;
  bn: string;
}

interface ServiceItem {
  id: number;
  icon: React.ReactNode;
  nameEn: string;
  nameBn: string;
  subServices: SubService[];
  color: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    icon: <Thermometer className="w-8 h-8" />,
    nameEn: 'Fridge / Refrigerator',
    nameBn: 'ফ্রিজ / রেফ্রিজারেটর',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    icon: <Wrench className="w-8 h-8" />,
    nameEn: 'Washing Machine',
    nameBn: 'ওয়াশিং মেশিন',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 3,
    icon: <Wind className="w-8 h-8" />,
    nameEn: 'AC – Air Conditioner',
    nameBn: 'এসি – এয়ার কন্ডিশনার',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
      { en: 'Service / Cleaning', bn: 'সার্ভিসিং / পরিষ্কার' },
    ],
    color: 'from-sky-500 to-blue-500',
  },
  {
    id: 4,
    icon: <Flame className="w-8 h-8" />,
    nameEn: 'Geyser / Water Heater',
    nameBn: 'গিজার / ওয়াটার হিটার',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    icon: <Zap className="w-8 h-8" />,
    nameEn: 'Induction Cooktop',
    nameBn: 'ইন্ডাকশন কুকটপ',
    subServices: [
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 6,
    icon: <ChefHat className="w-8 h-8" />,
    nameEn: 'Chimney / Kitchen Hood',
    nameBn: 'চিমনি / কিচেন হুড',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
      { en: 'Cleaning', bn: 'পরিষ্কার' },
    ],
    color: 'from-slate-500 to-gray-600',
  },
  {
    id: 7,
    icon: <Layers className="w-8 h-8" />,
    nameEn: 'Liner',
    nameBn: 'লাইনার',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 8,
    icon: <Cable className="w-8 h-8" />,
    nameEn: 'Wiring / Electrical',
    nameBn: 'ওয়্যারিং / ইলেকট্রিক্যাল',
    subServices: [
      { en: 'New Wiring', bn: 'নতুন ওয়্যারিং' },
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 9,
    icon: <Microwave className="w-8 h-8" />,
    nameEn: 'Microwave Oven',
    nameBn: 'মাইক্রোওয়েভ ওভেন',
    subServices: [
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 10,
    icon: <Droplets className="w-8 h-8" />,
    nameEn: 'Aqua Guard Filter / Water Purifier',
    nameBn: 'অ্যাকোয়া গার্ড ফিল্টার / ওয়াটার পিউরিফায়ার',
    subServices: [
      { en: 'Installation', bn: 'ইনস্টলেশন' },
      { en: 'Repair', bn: 'মেরামত' },
    ],
    color: 'from-teal-500 to-emerald-600',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* Page Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Our Services
          </h1>
          <p className="text-2xl font-semibold text-emerald-700 mb-4">
            আমাদের সেবা
          </p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Professional home appliance repair, installation, and maintenance services.
            <br />
            <span className="text-slate-500">দক্ষ টেকনিশিয়ান দ্বারা পেশাদার হোম অ্যাপ্লায়েন্স সেবা।</span>
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Card Header with gradient */}
              <div className={`bg-gradient-to-r ${service.color} p-5 flex items-center gap-4`}>
                <div className="bg-white/20 rounded-xl p-2 text-white">
                  {service.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    {service.nameEn}
                  </h2>
                  <p className="text-white/85 text-sm font-medium">
                    {service.nameBn}
                  </p>
                </div>
              </div>

              {/* Sub-services */}
              <div className="p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Available Services / উপলব্ধ সেবা
                </p>
                <ul className="space-y-2">
                  {service.subServices.map((sub, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-slate-800 font-medium text-sm">
                        {sub.en}
                      </span>
                      <span className="text-slate-400 text-sm">
                        / {sub.bn}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Need a Repair or Installation?
          </h2>
          <p className="text-lg text-emerald-50 mb-2">
            আপনার যন্ত্রপাতি মেরামত বা ইনস্টলেশন দরকার?
          </p>
          <p className="text-emerald-100 mb-8">
            Our expert technicians are ready to help you — আমাদের দক্ষ টেকনিশিয়ানরা আপনার সেবায় প্রস্তুত।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7551034609"
              className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl"
            >
              📞 Call Us: 7551034609
            </a>
            <a
              href="mailto:sayanmondal7427@gmail.com"
              className="bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-800 transition-colors border-2 border-white shadow-lg hover:shadow-xl"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
