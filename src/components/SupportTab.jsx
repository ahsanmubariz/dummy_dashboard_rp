import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Phone, Mail, FileText, ExternalLink } from 'lucide-react';

const SupportTab = () => (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>FAQ dan Pencarian Cepat</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2 mb-4">
                    <Input placeholder="Cari bantuan..." className="flex-grow" />
                    <Button>
                        <Search className="h-4 w-4 mr-2" />
                        Cari
                    </Button>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold">Pertanyaan Umum:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Bagaimana cara memperbarui akses dummy digital id?</li>
                        <li>Apa yang harus dilakukan jika integrasi gagal?</li>
                        <li>Bagaimana cara mengajukan perubahan scope?</li>
                        <li>Berapa lama proses persetujuan untuk RP baru?</li>
                    </ul>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Buat Tiket Dukungan</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subjek</label>
                        <Input id="subject" placeholder="Masukkan subjek tiket" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">Deskripsi</label>
                        <textarea
                            id="description"
                            rows={4}
                            className="w-full p-2 border rounded-md"
                            placeholder="Jelaskan masalah Anda secara detail"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium mb-1">Prioritas</label>
                        <select id="priority" className="w-full p-2 border rounded-md">
                            <option>Rendah</option>
                            <option>Sedang</option>
                            <option>Tinggi</option>
                        </select>
                    </div>
                    <Button className="w-full">Kirim Tiket</Button>
                </form>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Kontak Dukungan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>+65 1234 5678</span>
                        </div>
                        <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>support@dummydigital.id</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Jam operasional: Senin-Jumat, 9:00 - 18:00 WIB
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Dokumentasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="flex items-center text-blue-600 hover:underline">
                                <FileText className="h-4 w-4 mr-2" />
                                Panduan Integrasi dummy digital id
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-blue-600 hover:underline">
                                <FileText className="h-4 w-4 mr-2" />
                                Dokumentasi API
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-blue-600 hover:underline">
                                <FileText className="h-4 w-4 mr-2" />
                                Kebijakan Keamanan
                                <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Status Layanan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <span>dummy digital id Authentication</span>
                    <Badge variant="outline" className="bg-green-100">Operasional</Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                    Terakhir diperbarui: 7 September 2023, 15:30 WIB
                </div>
            </CardContent>
        </Card>
    </div>
);

export default SupportTab;