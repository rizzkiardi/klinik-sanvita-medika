import { LoginForm } from '@/components/login-form';
import { usePage } from '@inertiajs/react';

export default function LoginPage() {
    const { name }: any = usePage().props;
    return (
        <div className="grid min-h-svh max-lg:grid-cols-1 max-lg:bg-[url('/assets/images/stetoskop-small.jpg')] max-lg:bg-cover max-lg:bg-center lg:grid-cols-2">
            {/* overlay blur hanya mobile */}
            <div className="absolute inset-0 hidden bg-white/10 backdrop-blur-xs max-lg:block"></div>
            {/* Konten kiri */}
            <div className="relative z-10 flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex size-6 items-center justify-center rounded-md text-primary-foreground">
                            <img src="/assets/images/logo-sanvita-medika24x24.png" alt="Logo" />
                        </div>
                        {name}
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs max-lg:rounded-lg max-lg:bg-white max-lg:p-6 max-lg:shadow-lg">
                        <LoginForm />
                    </div>
                </div>
            </div>

            {/* Kolom kanan hanya muncul di layar besar */}
            <div className="relative hidden bg-muted lg:block">
                <img src="/assets/images/stetoskop-small.jpg" alt="Image" className="absolute inset-0 h-full w-full object-cover" />
            </div>
        </div>
    );
}
