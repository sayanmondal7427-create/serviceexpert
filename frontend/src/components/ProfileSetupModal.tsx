import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { UserProfile } from '../backend';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('7551034609');
  const [email, setEmail] = useState('sayanmondal7427@gmail.com, sayanmandal7551@gmail.com');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !mobile.trim() || !email.trim()) {
      toast.error('সকল ক্ষেত্র পূরণ করুন');
      return;
    }

    const profile: UserProfile = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
    };

    try {
      await saveProfile.mutateAsync(profile);
      toast.success('প্রোফাইল সফলভাবে তৈরি হয়েছে!');
    } catch (error) {
      toast.error('প্রোফাইল তৈরি করতে ব্যর্থ হয়েছে');
      console.error('Profile setup error:', error);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">আপনার প্রোফাইল সেটআপ করুন</DialogTitle>
          <DialogDescription>
            ServiceExpert এ স্বাগতম! আপনার প্রোফাইল সম্পূর্ণ করতে নিচের তথ্য প্রদান করুন।
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">নাম *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">মোবাইল নম্বর *</Label>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="7551034609"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">ইমেইল *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={saveProfile.isPending}
          >
            {saveProfile.isPending ? 'সংরক্ষণ হচ্ছে...' : 'প্রোফাইল তৈরি করুন'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
