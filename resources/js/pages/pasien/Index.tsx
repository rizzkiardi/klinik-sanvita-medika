import { Button } from '@/components/ui/button';
import HapusPasienButton from '@/components/ui/button-hapus-pasien';
import CustomPagination from '@/components/ui/custom-pagination';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { handleChangePerPage } from '@/lib/utils';
import { BreadcrumbItem, Pasien } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { SelectItem } from '@radix-ui/react-select';
import { RefreshCcw, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import FormPasien from './components/FormPasien';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Pasien',
        href: '/data-pasien',
    },
];

const Index = () => {
    const { pasiens }: any = usePage().props;
    const [search, setSearch] = useState('');
    const meta = pasiens.meta;
    const path = meta.path;
    useEffect(() => {
        console.log(pasiens);
    }, []);

    const searchData = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(path, { search: search }, { preserveState: true, replace: true });
    };

    const clearSearch = () => {
        setSearch('');
        router.get(path, {}, { preserveState: true, replace: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pasien" />
            <div className="mb-1 flex items-center gap-x-5">
                <div className="block w-full items-center gap-x-1 lg:flex">
                    <div className="mb-1 lg:mb-0">
                        <Select onValueChange={(value) => handleChangePerPage(parseInt(value), path)}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Tampilkan" />
                            </SelectTrigger>
                            <SelectContent className="w-[120px]">
                                <SelectItem value="25" className="text-center">
                                    25
                                </SelectItem>
                                <SelectItem value="50" className="text-center">
                                    50
                                </SelectItem>
                                <SelectItem value="100" className="text-center">
                                    100
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="item-center flex space-x-1">
                        <div className="flex max-w-md items-center rounded-md border px-3 py-1">
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="outline-none"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <button className="" onClick={(e) => searchData(e)}>
                                <Search size={18} className="transition-transform duration-200 ease-in-out hover:scale-125" />
                            </button>
                        </div>
                        <Button size={'icon'} variant={'outline'} onClick={clearSearch}>
                            <RefreshCcw size={16} />
                        </Button>
                    </div>
                </div>
                <FormPasien />
            </div>
            <div>
                <Table className="px-0">
                    <TableHeader>
                        <TableHead className="w-10 text-center">No</TableHead>
                        <TableHead>No Pasien</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>Jenis Kelamin</TableHead>
                        <TableHead>Usia</TableHead>
                        <TableHead className="w-32 text-center">Opsi</TableHead>
                    </TableHeader>
                    <TableBody className="text-xs lg:text-sm">
                        {pasiens.data.map((pasien: Pasien, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{meta.from + index}</TableCell>
                                <TableCell>{pasien.nomor_pasien}</TableCell>
                                <TableCell>{pasien.nama_lengkap}</TableCell>
                                <TableCell>{pasien.jenis_kelamin}</TableCell>
                                <TableCell>{pasien.usia}</TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-x-1">
                                        <HapusPasienButton pasien={pasien} />
                                        <FormPasien pasien={pasien} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div>
                <CustomPagination meta={meta} />
            </div>
        </AppLayout>
    );
};

export default Index;
