import { useState, useRef } from 'react';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Edit2, Save, X, Upload, User } from 'lucide-react';
import type { UserProfile } from '../backend';
import { ExternalBlob } from '../backend';

export default function DashboardPage() {
  const { data: userProfile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startEditing = () => {
    if (userProfile) {
      setName(userProfile.name);
      setMobile(userProfile.mobile);
      setEmail(userProfile.email);
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setName('');
    setMobile('');
    setEmail('');
  };

  const handleSave = async () => {
    if (!name.trim() || !mobile.trim() || !email.trim()) {
      toast.error('সকল ক্ষেত্র পূরণ করুন');
      return;
    }

    const updatedProfile: UserProfile = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      profilePhoto: userProfile?.profilePhoto,
    };

    try {
      await saveProfile.mutateAsync(updatedProfile);
      toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      setIsEditing(false);
    } catch (error) {
      toast.error('প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে');
      console.error('Profile update error:', error);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('শুধুমাত্র ছবি ফাইল আপলোড করুন');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('ছবির আকার ৫ MB এর কম হতে হবে');
      return;
    }

    setIsUploadingPhoto(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        console.log(`Upload progress: ${percentage}%`);
      });

      const updatedProfile: UserProfile = {
        name: userProfile?.name || '',
        mobile: userProfile?.mobile || '',
        email: userProfile?.email || '',
        profilePhoto: blob,
      };

      await saveProfile.mutateAsync(updatedProfile);
      
      // Update local preview
      const url = URL.createObjectURL(file);
      setProfilePhotoUrl(url);
      
      toast.success('প্রোফাইল ছবি সফলভাবে আপলোড হয়েছে!');
    } catch (error) {
      toast.error('ছবি আপলোড করতে ব্যর্থ হয়েছে');
      console.error('Photo upload error:', error);
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getProfilePhotoUrl = () => {
    if (profilePhotoUrl) return profilePhotoUrl;
    if (userProfile?.profilePhoto) {
      return userProfile.profilePhoto.getDirectURL();
    }
    return '/assets/generated/default-avatar.dim_150x150.png';
  };

  const getInitials = () => {
    if (!userProfile?.name) return 'U';
    return userProfile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-emerald-100 shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">আমার ড্যাশবোর্ড</h1>
          <p className="text-slate-600">আপনার প্রোফাইল তথ্য দেখুন এবং আপডেট করুন</p>
        </div>

        <Card className="border-emerald-100 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-slate-900">প্রোফাইল তথ্য</CardTitle>
            {!isEditing && (
              <Button
                onClick={startEditing}
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                সম্পাদনা করুন
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200">
              <Avatar className="h-32 w-32 border-4 border-emerald-100">
                <AvatarImage src={getProfilePhotoUrl()} alt={userProfile.name} />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-3xl font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{userProfile.name}</h3>
                <p className="text-slate-600 mb-4">{userProfile.email}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploadingPhoto ? 'আপলোড হচ্ছে...' : 'ছবি পরিবর্তন করুন'}
                </Button>
              </div>
            </div>

            {/* Profile Information */}
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">নাম *</Label>
                  <Input
                    id="edit-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার পূর্ণ নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-mobile">মোবাইল নম্বর *</Label>
                  <Input
                    id="edit-mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+৮৮০ ১৭১২-৩৪৫৬৭৮"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">ইমেইল *</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={saveProfile.isPending}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saveProfile.isPending ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                  </Button>
                  <Button
                    onClick={cancelEditing}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    বাতিল করুন
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-500 text-sm">নাম</Label>
                    <p className="text-lg font-medium text-slate-900 mt-1">{userProfile.name}</p>
                  </div>
                  <div>
                    <Label className="text-slate-500 text-sm">মোবাইল নম্বর</Label>
                    <p className="text-lg font-medium text-slate-900 mt-1">{userProfile.mobile}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-500 text-sm">ইমেইল</Label>
                  <p className="text-lg font-medium text-slate-900 mt-1">{userProfile.email}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info Card */}
        <Card className="border-emerald-100 shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">অ্যাকাউন্ট তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <User className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900 mb-1">Internet Identity দিয়ে সুরক্ষিত</p>
                <p className="text-sm text-slate-600">
                  আপনার অ্যাকাউন্ট Internet Identity ব্যবহার করে সুরক্ষিত রাখা হয়েছে। এটি আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করে।
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
