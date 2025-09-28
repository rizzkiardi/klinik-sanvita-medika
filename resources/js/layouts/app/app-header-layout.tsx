import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import Clock from '@/components/ui/clock';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            {/* <AppHeader breadcrumbs={breadcrumbs} /> */}
            <div className="flex">
                <AppHeader breadcrumbs={breadcrumbs} />
                <Clock /> {/* jam di bawah header */}
            </div>
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
