import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

import ConfigTab from './ConfigTab';
import LogStatsTab from './LogStatsTab';
import SupportTab from './SupportTab';

const data = [
    { name: 'Sen', autentikasi: 4000 },
    { name: 'Sel', autentikasi: 3000 },
    { name: 'Rab', autentikasi: 2000 },
    { name: 'Kam', autentikasi: 2780 },
    { name: 'Jum', autentikasi: 1890 },
    { name: 'Sab', autentikasi: 2390 },
    { name: 'Min', autentikasi: 3490 },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('beranda');

    return (
        <div className="p-4">
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Dashboard RP dummy digital id</h1>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                        <div className="flex flex-wrap">
                            {['beranda', 'konfigurasi', 'log', 'dukungan'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-6 py-3 font-medium text-sm sm:text-base transition-colors duration-200 ${activeTab === tab
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        {activeTab === 'beranda' && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <Card className="bg-white shadow-lg">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-lg font-semibold text-gray-700">Status Koneksi</CardTitle>
                                            <CheckCircle className="h-6 w-6 text-green-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-gray-900">Aktif</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-white shadow-lg">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-lg font-semibold text-gray-700">Total Autentikasi Hari Ini</CardTitle>
                                            <Activity className="h-6 w-6 text-blue-500" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-gray-900">3,487</div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-white shadow-lg">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-lg font-semibold text-gray-700">Tingkat Keberhasilan</CardTitle>
                                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">99.8%</Badge>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold text-gray-900">Sangat Baik</div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Alert className="bg-yellow-50 border-l-4 border-yellow-400">
                                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                    <AlertTitle className="text-yellow-800 font-semibold">Peringatan</AlertTitle>
                                    <AlertDescription className="text-yellow-700">
                                        Akses Anda akan kedaluwarsa dalam 30 hari. Harap perbarui segera.
                                    </AlertDescription>
                                </Alert>

                                <Card className="bg-white shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-gray-800">Tren Penggunaan dummy digital id</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="autentikasi" fill="#4F46E5" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {activeTab === 'konfigurasi' && <ConfigTab />}
                        {activeTab === 'log' && <LogStatsTab />}
                        {activeTab === 'dukungan' && <SupportTab />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;