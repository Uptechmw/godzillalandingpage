"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { User, Shield, Bell, Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await api.get("/auth/me");
                setUser(data.user || data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Placeholder for update API
        setTimeout(() => {
            toast.success("Settings saved successfully");
            setSaving(false);
        }, 1000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1220]">
            <Sidebar />
            <main className="lg:ml-64 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
                    <p className="text-slate-400">Manage your profile, security, and preferences.</p>
                </header>

                <div className="max-w-4xl space-y-6">
                    {/* Profile Section */}
                    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="text-blue-500" size={24} />
                            <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.name || ""}
                                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || ""}
                                    disabled
                                    className="w-full bg-[#0B1220] border border-[#1F2937] rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed outline-none"
                                />
                            </div>
                            <div className="md:col-span-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Security Section */}
                    <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-blue-500" size={24} />
                            <h2 className="text-xl font-semibold text-white">Security & Password</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#0B1220] rounded-xl border border-[#1F2937]">
                                <div>
                                    <p className="text-white font-medium">Change Password</p>
                                    <p className="text-sm text-slate-400">Update your account credentials</p>
                                </div>
                                <button className="px-4 py-2 border border-[#1F2937] hover:border-blue-500 text-white rounded-lg transition-all text-sm">Update</button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[#0B1220] rounded-xl border border-[#1F2937]">
                                <div>
                                    <p className="text-white font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-slate-400">Add an extra layer of security</p>
                                </div>
                                <div className="w-12 h-6 bg-[#1F2937] rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
