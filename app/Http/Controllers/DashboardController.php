<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $jumlahPasien = Pasien::count();
        $totalKunjungan = Kunjungan::count();
        $kunjunganHariIni = Kunjungan::whereDate('tanggal_kunjungan', today())->count();

        return Inertia::render('dashboard', [
            'jumlahPasien' => $jumlahPasien,
            'totalKunjungan' => $totalKunjungan,
            'kunjunganHariIni' => $kunjunganHariIni,
        ]);
    }

    public function kunjunganPasien()
    {
        $kunjungans = Kunjungan::with('pasien')
            ->whereDate('tanggal_kunjungan', today())
            ->latest()
            ->get();

        return Inertia::render('KunjunganPasien', [
            'kunjungans' => $kunjungans
        ]);
    }

}
