import React, { useState, useEffect } from 'react';
import { Shield, Bell, Lock, Eye, EyeOff, Globe, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../../services/api';

const SecuritySettings = () => {
    const [activeTab, setActiveTab] = useState('security');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Security Tab State
    const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

    // Settings Tab State
    const [settings, setSettings] = useState({
        notifications_enabled: true,
        email_updates: true,
        privacy_mode: false,
        language: 'en'
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/users/me/settings');
                setSettings(response.data);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        setLoading(true);
        try {
            await api.post('/users/me/change-password', {
                old_password: passwords.old,
                new_password: passwords.new
            });
            setMessage({ type: 'success', text: 'Password updated successfully' });
            setPasswords({ old: '', new: '', confirm: '' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.response?.data?.detail || 'Failed to update password' });
        } finally {
            setLoading(false);
        }
    };

    const handleSettingsUpdate = async (newSettings: any) => {
        try {
            const response = await api.put('/users/me/settings', newSettings);
            setSettings(response.data);
            setMessage({ type: 'success', text: 'Settings updated' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings' });
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings & Security</h1>

            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('security')}
                    className={`pb-4 px-4 text-sm font-semibold transition-all ${activeTab === 'security'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Security
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`pb-4 px-4 text-sm font-semibold transition-all ${activeTab === 'settings'
                            ? 'border-b-2 border-blue-600 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-2" />
                        Preferences
                    </div>
                </button>
            </div>

            {/* Alert Messages */}
            {message.text && (
                <div className={`mb-6 p-4 rounded-xl flex items-center ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.type === 'success' ? <CheckCircle className="h-5 w-5 mr-3" /> : <AlertTriangle className="h-5 w-5 mr-3" />}
                    {message.text}
                </div>
            )}

            {activeTab === 'security' ? (
                <div className="space-y-8">
                    {/* Password Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center mb-6">
                            <Lock className="h-5 w-5 text-gray-400 mr-3" />
                            <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.old ? 'text' : 'password'}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                        value={passwords.old}
                                        onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPasswords.old ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.new ? 'text' : 'password'}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords.confirm ? 'text' : 'password'}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>

                    {/* Sessions Section (Mock) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center mb-6">
                            <Shield className="h-5 w-5 text-gray-400 mr-3" />
                            <h2 className="text-xl font-bold text-gray-900">Login Activity</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-600 rounded-lg mr-4">
                                        <Globe className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Current Session</p>
                                        <p className="text-sm text-gray-500">Windows • Chrome • 127.0.0.1</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-blue-600 bg-white px-3 py-1 rounded-full shadow-sm">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">Dashboard Preferences</h2>
                            <p className="text-sm text-gray-500 mt-1">Configure how you interact with the platform.</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900">Push Notifications</p>
                                    <p className="text-sm text-gray-500 text-balance">Receive real-time alerts for case updates and appointments.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={settings.notifications_enabled}
                                        onChange={(e) => handleSettingsUpdate({ ...settings, notifications_enabled: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900">Email Updates</p>
                                    <p className="text-sm text-gray-500 text-balance">Send weekly summaries and security alerts to your email.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={settings.email_updates}
                                        onChange={(e) => handleSettingsUpdate({ ...settings, email_updates: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900">Privacy Mode</p>
                                    <p className="text-sm text-gray-500 text-balance">Hide your profile from public search results.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={settings.privacy_mode}
                                        onChange={(e) => handleSettingsUpdate({ ...settings, privacy_mode: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 rounded-2xl border border-red-100 p-6 flex items-center justify-between">
                        <div>
                            <p className="font-bold text-red-900">Danger Zone</p>
                            <p className="text-sm text-red-600">Irreversibly delete your account and all associated data.</p>
                        </div>
                        <button className="px-4 py-2 bg-white text-red-600 border border-red-200 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center shadow-sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SecuritySettings;
