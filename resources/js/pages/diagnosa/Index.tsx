import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Diagnosa } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { HeartPulse, NotebookText } from 'lucide-react';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { toast } from 'sonner';
import RekamMedis from './components/RekamMedis';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diagnosa',
        href: '/diagnosa',
    },
];

const Index = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [diagnosa, setDiagnosa] = useState<Diagnosa[]>([]);
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        pasien_id: '',
        keluhan: '',
        tindakan: '',
        diagnosa: '',
        obat: '',
    });

    const getPasien = async (inputValue: string) => {
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

    const getDataDiagnosa = async (inputValue: string) => {
        if (!inputValue) return [];
        setLoading(true);

        try {
            const { data } = await axios.get(`/data-pasien/${inputValue}/rekam-medis?limit=5`);
            setDiagnosa(data);
        } catch (error) {
            setLoading(false);
            toast.error('Terjadi kesalahan saat memuat data Diagnosa.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            post('/diagnosa', {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();

                    const reactSelect = document.getElementById('react-async-select') as HTMLSelectElement;
                    reactSelect.value = '';
                },
            });
        } catch (error) {
            toast.error('Terjadi kesalahan saat menyimpan data pasien.');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Diagnosa" />
            <div className="grid grid-cols-12 gap-5">
                <Card className="col-span-12 lg:col-span-6">
                    <form action="" className="space-y-3" onSubmit={handleSubmit}>
                        <CardHeader className="">
                            <CardTitle className="flex items-center gap-x-1">
                                <HeartPulse />
                                Form Diagnosa
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div>
                                <AsyncSelect
                                    cacheOptions
                                    defaultOptions
                                    isClearable
                                    placeholder="Pilih pasien"
                                    isLoading={loading}
                                    noOptionsMessage={() => 'Pasien tidak ditemukan'}
                                    loadingMessage={() => 'Mencari data pasien...'}
                                    loadOptions={getPasien}
                                    onChange={(selectedOption: any) => {
                                        setData('pasien_id', selectedOption?.value);
                                        getDataDiagnosa(selectedOption?.value);
                                    }}
                                    id="react-async-select"
                                />
                            </div>
                            <div>
                                <Label className="mb-1">Keluhan</Label>
                                <Textarea
                                    className="min-h-32"
                                    name="keluhan"
                                    value={data.keluhan}
                                    onChange={(e) => setData('keluhan', e.target.value)}
                                />
                                <InputError message={errors.keluhan} className="mt-2" />
                            </div>
                            <div>
                                <Label className="mb-1">Diagnosa</Label>
                                <Textarea
                                    className="min-h-32"
                                    name="diagnosa"
                                    value={data.diagnosa}
                                    onChange={(e) => setData('diagnosa', e.target.value)}
                                />
                                <InputError message={errors.diagnosa} className="mt-2" />
                            </div>
                            <div>
                                <Label className="mb-1">Tindakan</Label>
                                <Textarea
                                    className="min-h-32"
                                    name="tindakan"
                                    value={data.tindakan}
                                    onChange={(e) => setData('tindakan', e.target.value)}
                                />
                                <InputError message={errors.tindakan} className="mt-2" />
                            </div>
                            <div>
                                <Label className="mb-1">Obat</Label>
                                <Textarea className="min-h-32" name="obat" value={data.obat} onChange={(e) => setData('obat', e.target.value)} />
                                <InputError message={errors.obat} className="mt-2" />
                            </div>
                            <Button disabled={processing}>Simpan Diagnosa</Button>
                        </CardContent>
                    </form>
                </Card>
                <Card className="col-span-12 lg:col-span-6">
                    <CardHeader className="">
                        <CardTitle className="flex flex-row items-center gap-x-1">
                            <NotebookText />
                            Rekam Medis
                        </CardTitle>
                        <CardDescription>Menampilkan 5 Rekam Medis terbaru</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RekamMedis diagnosa={diagnosa} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Index;
