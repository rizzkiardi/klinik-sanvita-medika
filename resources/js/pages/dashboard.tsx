import TextLink from '@/components/text-link';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { jumlahPasien, totalKunjungan, kunjunganHariIni }: any = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 sm:grid-cols-2">
                    <div className="relative h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 md:h-[200px] md:max-w-md dark:border-sidebar-border">
                        <h2 className="my-7 text-center">Pasien Periksa / Hari</h2>
                        <p className="text-center text-4xl">{kunjunganHariIni}</p>

                        <TextLink
                            href="/dashboard/kunjungan-pasien"
                            className="absolute right-0 bottom-0 rounded-tl-md bg-blue-300 px-5 py-1 text-xs no-underline"
                            tabIndex={6}
                        >
                            Lihat Pasien
                        </TextLink>
                        {/* <a href="/dashboard/kunjungan-pasien" className="absolute right-0 bottom-0 rounded-tl-md bg-blue-300 px-5 py-1 text-xs">
                            Lihat Pasien
                        </a> */}
                    </div>
                    <div className="relative h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 md:h-[200px] md:max-w-md dark:border-sidebar-border">
                        <h2 className="my-7 text-center">Total Pasien</h2>
                        <p className="text-center text-4xl">{jumlahPasien}</p>
                        <TextLink
                            href="/data-pasien"
                            className="absolute right-0 bottom-0 rounded-tl-md bg-blue-300 px-5 py-1 text-xs no-underline"
                            tabIndex={6}
                        >
                            Lihat Pasien
                        </TextLink>
                        {/* <a href="/data-pasien" className="absolute right-0 bottom-0 rounded-tl-md bg-blue-300 px-5 py-1 text-xs">
                            Lihat Pasien
                        </a> */}
                    </div>
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
