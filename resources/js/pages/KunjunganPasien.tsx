import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function KunjunganPasien() {
    const { kunjungans }: any = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="">
                <h2 className="text-md mb-4 font-bold">Kunjungan Pasien Hari {dayjs().format('dddd, DD MMMM YYYY')}</h2>
                <div className="">
                    <Table>
                        <TableHeader>
                            <TableHead className="w-10 text-center">No</TableHead>
                            <TableHead>No Pasien</TableHead>
                            <TableHead>Nama Lengkap</TableHead>
                            <TableHead>Jenis Kelamin</TableHead>
                            {/* <TableHead>Usia</TableHead> */}
                            <TableHead>Tanggal Periksa</TableHead>
                        </TableHeader>
                        <TableBody>
                            {kunjungans.length > 0 ? (
                                kunjungans.map((kunjungan: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{kunjungan.pasien.nomor_pasien}</TableCell>
                                        <TableCell>{kunjungan.pasien.nama_lengkap}</TableCell>
                                        {/* <TableCell>{kunjungan.pasien.usia}</TableCell> */}
                                        <TableCell>{kunjungan.pasien.jenis_kelamin}</TableCell>
                                        <TableCell>{dayjs(kunjungan.tanggal_kunjungan).format(' HH:mm:ss | dddd, DD MMMM YYYY')}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">
                                        Tidak ada data pasien
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
