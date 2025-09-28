import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Diagnosa, Pasien } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { toast } from 'sonner';
import RekamMedis from '../diagnosa/components/RekamMedis';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekam Medis',
        href: '/rekam-medis',
    },
];

const Index = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([]);
    const [pasien, setPasien] = useState<Pasien>();

    // select option react-select
    const getPasienOptions = async (inputValue: string) => {
        if (!inputValue) return [];
        setLoading(true);
        try {
            const { data } = await axios.get('/data-pasien/get-json', {
                params: {
                    search: inputValue,
                },
            });
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            toast.error('Terjadi kesalahan saat memuat data pasien.');
        }
    };

    const getPasien = async (inputValue: string) => {
        if (!inputValue) return [];
        setLoading(true);
        try {
            const { data } = await axios.get(`/data-pasien/${inputValue}/show`);
            setPasien(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Terjadi kesalahan saat memuat data pasien.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekam Medis" />
            <div>
                <AsyncSelect
                    cacheOptions
                    defaultOptions
                    isClearable
                    placeholder="Pilih pasien"
                    isLoading={loading}
                    noOptionsMessage={() => 'Pasien tidak ditemukan'}
                    loadingMessage={() => 'Mencari data pasien...'}
                    loadOptions={getPasienOptions}
                    onChange={(selectedOption: any) => {
                        getPasien(selectedOption?.value);
                    }}
                    id="react-async-select"
                />
            </div>
            <div className="mt-5 space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Pasien</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Nama : {pasien?.nama_lengkap || '-'}</p>
                        <p className="text-sm text-muted-foreground">Jenis Kelamin : {pasien?.jenis_kelamin || '-'}</p>
                        <p className="text-sm text-muted-foreground">Usia : {pasien?.usia || '-'}</p>
                        <p className="text-sm text-muted-foreground">Golongan Darah : {pasien?.golongan_darah || '-'}</p>
                        <p className="text-sm text-muted-foreground">Alamat : {pasien?.alamat || '-'}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Rekam Medis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RekamMedis diagnosa={pasien?.diagnosa || []} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Index;
