import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Download, Calendar, DownloadIcon } from 'lucide-react';

// Dummy data generator function
const generateData = (selectedMonth) => {
    let data = [];
    let startDate = new Date(selectedMonth);
    let endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    while (startDate <= endDate) {
        data.push({
            date: startDate.toISOString().split('T')[0],
            identify: Math.floor(Math.random() * 5000) + 1000,
            share: Math.floor(Math.random() * 3000) + 1000,
            easy_verify: Math.floor(Math.random() * 2314) + 1000,
            secure_verify: Math.floor(Math.random() * 1332) + 1000,
        });
        startDate.setDate(startDate.getDate() + 1);
    }
    return data;
};

const LogStatsTab = () => {
    const [selectedMonth, setSelectedMonth] = useState('2023-09');
    const [data, setData] = useState(() => generateData(selectedMonth));

    const handleMonthChange = () => {
        setData(generateData(selectedMonth));
    };

    // Hitung total hit untuk setiap layanan
    const totalIdentifyHit = data.reduce((sum, day) => sum + day.identify, 0);
    const totalShareHit = data.reduce((sum, day) => sum + day.share, 0);
    const totalEasyVerifyHit = data.reduce((sum, day) => sum + day.easy_verify, 0);
    const totalSecureVerifyHit = data.reduce((sum, day) => sum + day.secure_verify, 0);

    // Hitung total billing untuk setiap layanan (dalam Rupiah)
    const totalIdentifyBilling = totalIdentifyHit * 100; // 100 Rupiah per hit
    const totalShareBilling = totalShareHit * 1000; // 1000 Rupiah per hit
    const totalEasyVerifyBilling = totalEasyVerifyHit * 300; // 300 Rupiah per hit
    const totalSecureVerifyBilling = totalSecureVerifyHit * 3000; // 3000 Rupiah per hit

    // Hitung total biaya gabungan (dalam Rupiah)
    const totalCost = totalIdentifyBilling + totalShareBilling + totalEasyVerifyBilling + totalSecureVerifyBilling;

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Dummy data untuk invoice bulanan
    const monthlyInvoiceData = [
        { month: 'Januari 2023', total_billing: 1000000 },
        { month: 'Februari 2023', total_billing: 9250000 },
        { month: 'Maret 2023', total_billing: 2300500 },
        { month: 'April 2023', total_billing: 2101050 },
        { month: 'Mei 2023', total_billing: 4416490 },
    ];


    return (
        <div className="space-y-8">
            {/* Bagian Statistik Penggunaan */}
            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Statistik Penggunaan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="selected-month" className="block text-sm font-medium text-gray-700 mb-1">Pilih Bulan</label>
                            <Input
                                id="selected-month"
                                type="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleMonthChange} className="bg-blue-500 hover:bg-blue-600 text-white">
                                <Calendar className="h-4 w-4 mr-2" />
                                Terapkan
                            </Button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="identify" fill="#8884d8" name="Identify" yAxisId="left" />
                            <Bar dataKey="share" fill="#82ca9d" name="Share" yAxisId="left" />
                            <Bar dataKey="easy_verify" fill="#ffc658" name="Easy Verify" yAxisId="right" />
                            <Bar dataKey="secure_verify" fill="#ff8042" name="Secure Verify" yAxisId="right" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Layanan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Hit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Billing (Rp)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Identify</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalIdentifyHit.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(totalIdentifyHit - getRandomInt(1000, 9999)).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalIdentifyBilling.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Share</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalEasyVerifyHit.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(totalEasyVerifyHit - getRandomInt(1000, 9999)).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalShareBilling.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Easy Verify</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalEasyVerifyHit.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(totalEasyVerifyHit - getRandomInt(1000, 9999)).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalEasyVerifyBilling.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Secure Verify</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalSecureVerifyHit.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(totalSecureVerifyHit - getRandomInt(1000, 9999)).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{totalSecureVerifyBilling.toLocaleString()}</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Biaya</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{totalCost.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            {/* Bagian Invoice Bulanan */}
            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bulan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Billing (Rp)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {monthlyInvoiceData.map((invoice, index) => {
                                    
                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.month}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.total_billing.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                                    <DownloadIcon className="h-4 w-4 mr-2" />
                                                    Unduh
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Bagian Log Autentikasi */}
            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Log Autentikasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-grow">
                            <Input placeholder="Cari log..." className='p-2' />
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                            <Search className="h-4 w-4 mr-2" />
                            Cari
                        </Button>
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                            <Download className="h-4 w-4 mr-2" />
                            Ekspor Log
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personal ID</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.slice(0, 5).map((entry, index) => {
                                    const types = ['identify', 'share', 'easy_verify', 'secure_verify'];
                                    const randomType = types[Math.floor(Math.random() * types.length)];

                                    return (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.date} 12:00:00</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{randomType.replace(/_/g, ' ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AZC6V{String.fromCharCode(65 + (index % 3))}SADASD</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LogStatsTab;