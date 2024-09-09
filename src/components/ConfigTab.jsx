import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { AlertCircle, Upload, ChevronDown, ChevronUp, Copy } from 'lucide-react';

const ConfigTab = () => {
    const [isSnippetExpanded, setIsSnippetExpanded] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Kode berhasil disalin!');
        }, (err) => {
            console.error('Gagal menyalin teks: ', err);
        });
    };

    return (
        <div className="space-y-6">
            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Informasi Koneksi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="client-id" className="text-sm font-medium text-gray-700">Client ID</Label>
                            <Input id="client-id" value="RP-12345-ABCDE" readOnly className="mt-1 bg-gray-100" />
                        </div>
                        <div>
                            <Label htmlFor="env" className="text-sm font-medium text-gray-700">Environment</Label>
                            <Input id="env" value="Production" readOnly className="mt-1 bg-gray-100" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="redirect-url" className="text-sm font-medium text-gray-700">URL Redirect Terdaftar</Label>
                        <Input id="redirect-url" value="https://www.contoh-rp.com/callback" readOnly className="mt-1 bg-gray-100" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Pengaturan Scope</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {['openid', 'NIK', 'full_name', 'dob', 'email', 'phone'].map((scope) => (
                            <div key={scope} className="flex items-center space-x-2">
                                <Checkbox id={`scope-${scope}`} defaultChecked={scope !== 'phone'} />
                                <Label htmlFor={`scope-${scope}`} className="text-sm font-medium text-gray-700">
                                    {scope}
                                </Label>
                            </div>
                        ))}
                    </div>
                    <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">Ajukan Perubahan Scope</Button>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">Public Key</CardTitle>
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
                        <Label htmlFor="public-key" className="text-sm font-medium text-gray-700">Upload Public Key Baru</Label>
                        <div className="mt-1 flex items-center space-x-2">
                            <Input id="public-key" type="file" className="flex-grow" />
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
                        Cara Generate Keypair
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsSnippetExpanded(!isSnippetExpanded)}
                        >
                            {isSnippetExpanded ? <ChevronUp /> : <ChevronDown />}
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal pl-5 space-y-3">
                        <li>Buka terminal atau command prompt</li>
                        <li>
                            Jalankan perintah berikut untuk generate private key:
                            <div className="relative">
                                <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                                    <code>openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048</code>
                                </pre>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard('openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048')}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </li>
                        <li>
                            Ekstrak public key dari private key dengan perintah:
                            <div className="relative">
                                <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
                                    <code>openssl rsa -pubout -in private_key.pem -out public_key.pem</code>
                                </pre>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard('openssl rsa -pubout -in private_key.pem -out public_key.pem')}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </li>
                        <li>Upload file public_key.pem ke sistem ini</li>
                        <li>Simpan private_key.pem dengan aman di lingkungan Anda</li>
                    </ol>
                    {isSnippetExpanded && (
                        <div className="mt-4 space-y-4">
                            <h4 className="font-semibold text-gray-700">Snippet Lengkap:</h4>
                            <div className="relative">
                                <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
                                    <code>{`
# Generate private key
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# Extract public key
openssl rsa -pubout -in private_key.pem -out public_key.pem

# View public key (optional)
cat public_key.pem

# Secure permissions for private key (Linux/Mac)
chmod 600 private_key.pem

# Verify key pair (optional)
openssl rsa -in private_key.pem -check
openssl rsa -in public_key.pem -pubin -text -noout
                                    `}</code>
                                </pre>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(document.querySelector('pre code').textContent)}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ConfigTab;