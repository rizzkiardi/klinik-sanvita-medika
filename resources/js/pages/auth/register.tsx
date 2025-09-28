import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
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
                        <div className="mb-5 flex flex-col items-center gap-1 text-center">
                            <h1 className="text-2xl font-bold">Daftar</h1>
                            <p className="text-sm text-balance text-muted-foreground">Masukkan data anda dibawah ini, untuk membuat Akun.</p>
                        </div>
                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nama Lengkap</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder=""
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Alamat Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="contoh@gmail.com"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password">Kata Sandi</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder=""
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                tabIndex={4}
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder=""
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>

                                        <Button type="submit" className="mt-2 w-full" tabIndex={5} data-test="register-user-button">
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            Buat Akun
                                        </Button>
                                    </div>

                                    <div className="text-center text-sm text-muted-foreground">
                                        Sudah memiliki Akun ?{' '}
                                        <TextLink href={login()} tabIndex={6}>
                                            Masuk
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
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
