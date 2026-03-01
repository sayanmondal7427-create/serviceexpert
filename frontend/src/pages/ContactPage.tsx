import { useState } from 'react';
import { useSubmitContactInquiry } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const submitInquiry = useSubmitContactInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('সকল ক্ষেত্র পূরণ করুন');
      return;
    }

    try {
      await submitInquiry.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      toast.success('আপনার বার্তা সফলভাবে পাঠানো হয়েছে!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      toast.error('বার্তা পাঠাতে ব্যর্থ হয়েছে');
      console.error('Contact form error:', error);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-emerald-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">আমাদের সাথে যোগাযোগ করুন</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            আপনার যেকোনো প্রশ্ন বা সেবার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা সর্বদা আপনার সেবায় প্রস্তুত।
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-emerald-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">বার্তা পাঠান</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">আপনার নাম *</Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="নাম লিখুন"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">ইমেইল *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">বার্তা *</Label>
                  <Textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="আপনার বার্তা লিখুন..."
                    rows={6}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={submitInquiry.isPending}
                >
                  {submitInquiry.isPending ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-emerald-100 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">ফোন</h3>
                    <p className="text-slate-600">7551034609</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">ইমেইল</h3>
                    <p className="text-slate-600">sayanmondal7427@gmail.com</p>
                    <p className="text-slate-600">sayanmandal7551@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">ঠিকানা</h3>
                    <p className="text-slate-600">
                      তারকেশ্বর, হুগলি, পশ্চিমবঙ্গ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/assets/generated/contact-illustration.dim_400x300.png"
                alt="Contact Us"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
