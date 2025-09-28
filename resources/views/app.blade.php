<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Meta Description -->
        <meta
        name="description"
        content="Klinik Sanvita Medika - Klinik Kesehatan Profesional dengan layanan Medis Terpadu, Pemeriksaan Umum, Konsultasi Dokter, dan Perawatan Berkualitas untuk Keluarga Anda."
        />

        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://klinik-sanvita-medika.up.railway.app/" />
        <meta property="og:title" content="Klinik Sanvita Medika - Klinik Kesehatan Profesional dengan layanan Medis Terpadu, Pemeriksaan Umum, Konsultasi Dokter, dan Perawatan Berkualitas untuk Keluarga Anda." />
        <meta
        property="og:image"
        content="https://klinik-sanvita-medika.up.railway.app/rizkiardi.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta
        property="og:description"
        content="Klinik Sanvita Medika - Klinik Kesehatan Profesional dengan layanan Medis Terpadu, Pemeriksaan Umum, Konsultasi Dokter, dan Perawatan Berkualitas untuk Keluarga Anda."
        />

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Klinik Sanvita Medika') }}</title>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        {{-- <link rel="icon" href="/favicon.svg" type="image/svg+xml"> --}}

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
