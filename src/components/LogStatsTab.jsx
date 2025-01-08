import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, Download, Calendar } from 'lucide-react';

// Dummy data generator function
const generateData = (startDate, endDate) => {
    let data = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        data.push({
            date: currentDate.toISOString().split('T')[0],
            identify: Math.floor(Math.random() * 5000) + 1000,
            share: Math.floor(Math.random() * 3000) + 1000,
            easy_verify: Math.floor(Math.random() * 2314) + 1000,
            secure_verify: Math.floor(Math.random() * 1332) + 1000,
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};

const LogStatsTab = () => {
    const [startDate, setStartDate] = useState('2023-09-01');
    const [endDate, setEndDate] = useState('2023-09-07');
    const [data, setData] = useState(() => generateData(startDate, endDate));

    const handleDateChange = () => {
        setData(generateData(startDate, endDate));
    };

    return (
        <div className="space-y-8">
            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Statistik Penggunaan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                            <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Akhir</label>
                            <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <Button onClick={handleDateChange} className="bg-blue-500 hover:bg-blue-600 text-white">
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
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">Total Identify</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{data.reduce((sum, day) => sum + day.identify, 0).toLocaleString()}</div>
                        <p className="text-sm text-gray-500">Periode yang dipilih</p>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">Total Share</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{data.reduce((sum, day) => sum + day.share, 0).toLocaleString()}</div>
                        <p className="text-sm text-gray-500">Periode yang dipilih</p>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">Total Easy Verify</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{data.reduce((sum, day) => sum + day.easy_verify, 0).toLocaleString()}</div>
                        <p className="text-sm text-gray-500">Periode yang dipilih</p>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-700">Total Secure Verify</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">{data.reduce((sum, day) => sum + day.secure_verify, 0).toLocaleString()}</div>
                        <p className="text-sm text-gray-500">Periode yang dipilih</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Log Autentikasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-grow">
                            <Input placeholder="Cari log..." className='p-2'/>
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
                                    // Daftar tipe log yang tersedia
                                    const types = ['identify', 'share', 'easy_verify', 'secure_verify'];
                                    // Pilih tipe log secara acak
                                    const randomType = types[Math.floor(Math.random() * types.length)];
                                    // Ambil nilai yang sesuai dengan tipe log yang dipilih

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