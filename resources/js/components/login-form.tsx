import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import InputError from './input-error';
import TextLink from './text-link';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            post('/login');
        } catch (error) {
            toast.error('Login failed. Please try again!');
        }
    };
    return (
        <div className={cn('flex flex-col gap-6', className)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Masuk</h1>
                <p className="text-sm text-balance text-muted-foreground">Masukkan email dan kata sandi untuk masuk ke akun Anda</p>
            </div>
            <form className="grid gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" onChange={(e) => setData('email', e.target.value)} type="email" placeholder="contoh@gmail.com" required />
                    <InputError message={errors.email} className="mt-1" />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Kata Sandi</Label>
                        {/* <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                            Forgot your password?
                        </a> */}
                    </div>
                    <Input id="password" onChange={(e) => setData('password', e.target.value)} type="password" required />
                    <InputError message={errors.password} className="mt-1" />
                </div>
                <Button type="submit" className="w-full" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Masuk
                </Button>
            </form>
            <div className="text-center text-sm">
                Belum memiliki Akun ? {''}
                {/* <a href="/register" className="underline underline-offset-4">
                    Daftar
                </a> */}
                <TextLink href="/register" tabIndex={6}>
                    Daftar
                </TextLink>
            </div>
        </div>
    );
}
