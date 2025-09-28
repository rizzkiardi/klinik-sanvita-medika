import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pasien } from '@/types';
import { Textarea } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface FormPasienProps {
    pasien?: Pasien;
}

const FormPasien = ({ pasien }: FormPasienProps) => {
    const method = pasien ? 'put' : 'post';
    const route = pasien ? `/data-pasien/${pasien.id}` : '/data-pasien';
    const [open, setOpen] = useState<boolean>(false);
    const jenisKelamin = [
        { label: 'Laki-laki', value: 'Laki-laki' },
        { label: 'Perempuan', value: 'Perempuan' },
    ];
    const golonganDarah = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'AB', value: 'AB' },
        { label: 'O', value: 'O' },
    ];

    const { data, setData, post, put, processing, reset, errors, clearErrors } = useForm({
        nama_lengkap: pasien?.nama_lengkap || '',
        alamat: pasien?.alamat || '',
        nomor_telepon: pasien?.nomor_telepon || '',
        jenis_kelamin: pasien?.jenis_kelamin || '',
        tanggal_lahir: pasien?.tanggal_lahir || '',
        golongan_darah: pasien?.golongan_darah || '',
        pekerjaan: pasien?.pekerjaan || '',
        nomor_ktp: pasien?.nomor_ktp || '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (method === 'post') {
                post(route, {
                    onSuccess: () => {
                        setOpen(false);
                        clearErrors();
                        reset();
                    },
                });
            } else {
                put(route, {
                    onSuccess: () => {
                        setOpen(false);
                        clearErrors();
                        reset();
                    },
                });
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat menyimpan data pasien.');
        }
    };
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="order-1 mb-0 lg:order-2" variant={pasien ? 'outline' : 'default'} size={pasien ? 'icon' : 'default'}>
                        {pasien ? <EditIcon className="" size={16} /> : 'Pasien Baru'}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Form Pasien</DialogTitle>
                        <DialogDescription asChild>
                            <div className="">
                                <form action="" className="space-y-5" onSubmit={handleSubmit}>
                                    <div>
                                        <Label className="mb-1">Nama Lengkap</Label>
                                        <Input type="text" value={data.nama_lengkap} onChange={(e) => setData('nama_lengkap', e.target.value)} />
                                        <InputError message={errors.nama_lengkap} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Tanggal Lahir</Label>
                                        <Input type="date" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)} />
                                        <InputError message={errors.tanggal_lahir} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Jenis Kelamin</Label>
                                        <div className="mt-1 flex items-center space-x-5">
                                            {jenisKelamin.map((jk, index) => (
                                                <Label key={index} className="flex-row">
                                                    <input
                                                        type="radio"
                                                        name="jenis_kelamin"
                                                        value={jk.value}
                                                        checked={data.jenis_kelamin === jk.value}
                                                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                                        className="mr-1"
                                                    />
                                                    {jk.label}
                                                </Label>
                                            ))}
                                        </div>
                                        <InputError message={errors.jenis_kelamin} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Golongan Darah</Label>
                                        <Select defaultValue={data.golongan_darah} onValueChange={(value) => setData('golongan_darah', value)}>
                                            <SelectTrigger className="">
                                                <SelectValue placeholder="Golongan Darah" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {golonganDarah.map((goldar, index) => (
                                                    <SelectItem key={index} value={goldar.value}>
                                                        {goldar.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.golongan_darah} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Nomor Telephone</Label>
                                        <Input type="text" value={data.nomor_telepon} onChange={(e) => setData('nomor_telepon', e.target.value)} />
                                        <InputError message={errors.nomor_telepon} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Pekerjaan</Label>
                                        <Input type="text" value={data.pekerjaan} onChange={(e) => setData('pekerjaan', e.target.value)} />
                                        <InputError message={errors.pekerjaan} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Nomor KTP</Label>
                                        <Input type="text" value={data.nomor_ktp} onChange={(e) => setData('nomor_ktp', e.target.value)} />
                                        <InputError message={errors.nomor_ktp} className="mt-1" />
                                    </div>
                                    <div>
                                        <Label className="mb-1">Alamat</Label>
                                        <Textarea
                                            className="w-full rounded-md border p-2"
                                            value={data.alamat}
                                            onChange={(e) => setData('alamat', e.target.value)}
                                        />
                                        <InputError message={errors.alamat} className="mt-1" />
                                    </div>
                                    <div>
                                        <Button className="mt-2 w-full" disabled={processing}>
                                            {pasien ? 'Ubah' : 'Simpan'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FormPasien;
