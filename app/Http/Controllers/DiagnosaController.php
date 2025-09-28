<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiagnosaStoreRequest;
use App\Models\Diagnosa;
use App\Models\Kunjungan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DiagnosaController extends Controller
{
    public function index()
    {
        return Inertia::render('diagnosa/Index');
    }

    public function store(DiagnosaStoreRequest $request)
    {
        $request->merge([
            'dokter' => Auth::user()->name
        ]);

        Diagnosa::create($request->all());

        Kunjungan::create([
        'pasien_id' => $request->pasien_id,
        'tanggal_kunjungan' => now(),
    ]);
        return redirect()->to('/diagnosa')->with('success', 'Data Diagnosa berhasil disimpan.');
    }

}
