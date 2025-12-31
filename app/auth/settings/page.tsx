"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, updateProfile, updatePassword, updateEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Camera, Mail, Shield, Bell, Palette, Trash2, Save, Loader2, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile states
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  
  // Security states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Preferences states
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
  });
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || "");
        setEmail(user.email || "");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      await updateProfile(user, {
        displayName: displayName,
      });
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !currentPassword) return;

    setSaving(true);
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update email
      await updateEmail(user, email);
      toast.success("Email updated successfully!");
      setCurrentPassword("");
    } catch (error: any) {
      toast.error(`Failed to update email: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !currentPassword) return;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password should be at least 6 characters!");
      return;
    }

    setSaving(true);
    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(`Failed to update password: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading your settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please sign in to access settings.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 pb-16">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Account Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage your profile, security preferences, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32 backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative group mb-4">
                    <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg">
                      <AvatarImage src={user.photoURL || ""} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {getInitials(displayName || user.email || "U")}
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors group-hover:scale-110">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {displayName || "User"}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {user.email}
                  </p>
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Premium Member
                  </Badge>
                </div>

                <nav className="space-y-2">
                  {[
                    { id: "profile", label: "Profile", icon: Mail },
                    { id: "security", label: "Security", icon: Shield },
                    { id: "preferences", label: "Preferences", icon: Palette },
                    { id: "notifications", label: "Notifications", icon: Bell },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Mail className="w-6 h-6 text-blue-600" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and how others see you on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="displayName" className="text-sm font-medium">
                            Display Name
                          </Label>
                          <Input
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your display name"
                            className="bg-white/50 dark:bg-gray-700/50 border-2 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="bg-white/50 dark:bg-gray-700/50 border-2 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button 
                          type="submit" 
                          disabled={saving}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Account Stats</CardTitle>
                    <CardDescription>
                      Your activity and membership information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">12</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Courses Enrolled</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-100 dark:border-green-800">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">8</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-100 dark:border-purple-800">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">156h</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Learning Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Shield className="w-6 h-6 text-green-600" />
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword" className="text-sm font-medium">
                            Current Password
                          </Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="bg-white/50 dark:bg-gray-700/50 border-2 focus:border-green-500 transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium">
                              New Password
                            </Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                              className="bg-white/50 dark:bg-gray-700/50 border-2 focus:border-green-500 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">
                              Confirm New Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                              className="bg-white/50 dark:bg-gray-700/50 border-2 focus:border-green-500 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button 
                          type="submit" 
                          disabled={saving}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg transition-all duration-200"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Update Password
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl border-red-200 dark:border-red-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl text-red-600">
                      <Trash2 className="w-6 h-6" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription className="text-red-600/80">
                      Irreversible and destructive actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-300">
                            Delete Account
                          </h4>
                          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                            Permanently delete your account and all associated data
                          </p>
                        </div>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Palette className="w-6 h-6 text-purple-600" />
                    Appearance & Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your experience on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Theme Selection */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Theme Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: "light", label: "Light", desc: "Clean and bright" },
                        { id: "dark", label: "Dark", desc: "Easy on the eyes" },
                        { id: "system", label: "System", desc: "Follows your device" },
                      ].map((themeOption) => (
                        <button
                          key={themeOption.id}
                          onClick={() => setTheme(themeOption.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            theme === themeOption.id
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                          }`}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {themeOption.label}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {themeOption.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Language & Region */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-sm font-medium">
                          Language
                        </Label>
                        <select
                          id="language"
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 focus:border-purple-500 transition-colors"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-sm font-medium">
                          Timezone
                        </Label>
                        <select
                          id="timezone"
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 focus:border-purple-500 transition-colors"
                        >
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC-8 (Pacific Time)</option>
                          <option>UTC+0 (GMT)</option>
                          <option>UTC+5:30 (IST)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg transition-all duration-200">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Bell className="w-6 h-6 text-orange-600" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about updates and activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      id: "email",
                      title: "Email Notifications",
                      description: "Receive updates about your courses and account via email",
                      enabled: notifications.email,
                    },
                    {
                      id: "push",
                      title: "Push Notifications",
                      description: "Get real-time notifications in your browser",
                      enabled: notifications.push,
                    },
                    {
                      id: "newsletter",
                      title: "Newsletter",
                      description: "Weekly updates about new courses and features",
                      enabled: notifications.newsletter,
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <Switch
                        checked={item.enabled}
                        onCheckedChange={(checked) =>
                          setNotifications(prev => ({ ...prev, [item.id]: checked }))
                        }
                        className="data-[state=checked]:bg-orange-600"
                      />
                    </div>
                  ))}

                  <div className="flex justify-end pt-4">
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg transition-all duration-200">
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}