import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "../components/ui/Label";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Checkbox } from "./ui/Checkbox";
import { AlertCircle, Upload } from 'lucide-react';
import Modal from './ui/Modal';

const ConfigTab = () => {
    const [environment, setEnvironment] = useState('Production');
    const [callbackUrls, setCallbackUrls] = useState([
        'https://www.contoh-rp.com/callback',
        'https://www.contoh-rp.com/another-callback',
    ]);
    const [selectedCallbackUrl, setSelectedCallbackUrl] = useState(callbackUrls[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCallbackUrl, setNewCallbackUrl] = useState('');

    const scopesData = {
        identify: ['NIK', 'full_name', 'email', 'dob', 'phone'],
        share: ['NIK', 'full_name', 'email', 'dob', 'phone'],
        secureVerify: ['age_above:18', 'is_asn', 'location'],
        easyVerify: ['age_above:18', 'is_asn', 'location'],
    };

    const [selectedScopes, setSelectedScopes] = useState({
        identify: { NIK: true, full_name: true, email: true, dob: true, phone: true },
        share: { NIK: false, full_name: false, email: false, dob: false, phone: false },
        secureVerify: { 'age_above:18': false, is_asn: false, location: false },
        easyVerify: { 'age_above:18': false, is_asn: false, location: false },
    });

    const handleScopeChange = (category, scope) => {
        setSelectedScopes((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [scope]: !prev[category][scope],
            },
        }));
    };

    // Fungsi untuk menambah Callback URL
    const addCallbackUrl = () => {
        if (newCallbackUrl && !callbackUrls.includes(newCallbackUrl)) {
            setCallbackUrls([...callbackUrls, newCallbackUrl]);
            setSelectedCallbackUrl(newCallbackUrl);
            setNewCallbackUrl('');
            setIsModalOpen(false); // Tutup modal setelah menambahkan URL
        }
    };

    // Fungsi untuk menghapus Callback URL
    const removeCallbackUrl = (urlToRemove) => {
        const updatedUrls = callbackUrls.filter((url) => url !== urlToRemove);
        setCallbackUrls(updatedUrls);
        if (selectedCallbackUrl === urlToRemove) {
            setSelectedCallbackUrl(updatedUrls[0] || '');
        }
    };

    return (
        <div className="space-y-6">
            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Informasi Koneksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Client ID */}
                    <div>
                        <Label htmlFor="client-id" className="text-sm font-medium text-gray-700">
                            Client ID
                        </Label>
                        <Input id="client-id" value="RP-12345-ABCDE" readOnly className="mt-1 bg-gray-100 p-2" />
                    </div>

                    {/* Environment Dropdown */}
                    <div>
                        <Label htmlFor="env" className="text-sm font-medium text-gray-700">
                            Environment
                        </Label>
                        <select
                            id="env"
                            value={environment}
                            onChange={(e) => setEnvironment(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                        >
                            <option value="Production">Production</option>
                            <option value="Sandbox">Sandbox</option>
                        </select>
                    </div>

                    {/* Callback URL Dropdown Editable */}
                    <div>
                        <Label htmlFor="callback-url" className="text-sm font-medium text-gray-700">
                            URL Redirect Terdaftar
                        </Label>
                        <div className="flex gap-2 mt-1">
                            <select
                                id="callback-url"
                                value={selectedCallbackUrl}
                                onChange={(e) => setSelectedCallbackUrl(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-100"
                            >
                                {callbackUrls.map((url, index) => (
                                    <option key={index} value={url}>
                                        {url}
                                    </option>
                                ))}
                            </select>
                            <Button
                                variant="destructive"
                                onClick={() => removeCallbackUrl(selectedCallbackUrl)}
                                disabled={!selectedCallbackUrl}
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                Hapus
                            </Button>
                        </div>
                        <div className="mt-2">
                            <Button className="w-full flex justify-center items-center" onClick={() => setIsModalOpen(true)}>Tambahkan URL Baru</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modal untuk Menambahkan URL Baru */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Tambahkan URL Baru"
            >
                <Input
                    placeholder="Masukkan URL baru"
                    value={newCallbackUrl}
                    onChange={(e) => setNewCallbackUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <Button onClick={addCallbackUrl}>Tambah</Button>
            </Modal>

            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Pengaturan Scope</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Iterasi setiap kategori */}
                        {Object.entries(scopesData).map(([category, scopes]) => (
                            <div key={category}>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                                    {category.replace(/([A-Z])/g, ' $1')} {/* Format judul */}
                                </h3>
                                <div className="space-y-1">
                                    {/* Iterasi setiap scope dalam kategori */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {scopes.map((scope) => (
                                            <div key={`${category}-${scope}`} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`${category}-${scope}`}
                                                    checked={selectedScopes[category][scope]}
                                                    onChange={() => handleScopeChange(category, scope)}
                                                />
                                                <Label htmlFor={`${category}-${scope}`} className="text-sm font-medium text-gray-700">
                                                    {scope}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="mt-4 bg-blue-500 w-full flex justify-center items-center hover:bg-blue-600 text-white" onClick={()=>alert("scope berhasil diubah")}>Ubah Scope</Button>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">JWKS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Status: Aktif</Badge>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Kedaluwarsa: 30 hari lagi</Badge>
                    </div>
                    <div className="flex items-center text-yellow-700 bg-yellow-50 p-3 rounded-md">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span className="text-sm">Akses Anda akan segera kedaluwarsa. Harap perbarui.</span>
                    </div>
                    <div>
                        <Label htmlFor="public-key" className="text-sm font-medium text-gray-700">Upload JWKS Baru</Label>
                        <div className="mt-1 flex items-center space-x-2">
                            <Input id="public-key" type="file" accept="application/JSON" className="flex-grow" />
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800 flex justify-between items-center">
                        Generate JWKS

                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal pl-5 space-y-3">
                        <li>
                            Silakan unduh CLI dari situs berikut:
                            <div className="mt-1">
                                <a
                                    href="https://github.com/inadigital-inapas/kuncy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    GitHub - inadigital-inapas/kuncy
                                </a>
                            </div>
                        </li>
                        <li>
                            Jalankan CLI sesuai petunjuk di file README.
                        </li>
                        <li>
                            CLI akan menghasilkan file <code>jwks.json</code> yang harus didaftarkan di mesin INApas SSO.
                        </li>
                        <li>
                            Simpan private key untuk keperluan signing dan encryption.
                        </li>
                    </ol>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConfigTab;