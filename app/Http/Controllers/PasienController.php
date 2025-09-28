<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasienStoreRequest;
use App\Http\Resources\PasienResource;
use App\Models\Diagnosa;
use App\Models\Kunjungan;
use App\Models\Pasien;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    public function index()
    {
        $perPage = request()->query('perPage', 25);
        $search = request()->query('search', '');
        $query = Pasien::query();

        if($search) {
            $query->where('nama_lengkap', 'LIKE', "%" . $search . "%")
                ->orWhere('nomor_pasien', 'LIKE', "%" . $search . "%");
        }

        $query->orderBy('nama_lengkap', 'ASC');
        $pasiens = PasienResource::collection($query->paginate($perPage));
        $jumlahPasien = Pasien::count();
        return Inertia::render('pasien/Index', compact(
            'pasiens',
            'jumlahPasien'
        ));
    }

    public function store(PasienStoreRequest $request)
    {
        $pasien = Pasien::create($request->all());

        Kunjungan::create([
            'pasien_id' => $pasien->id,
            'tanggal_kunjungan' => now(), // atau request('tanggal_kunjungan')
        ]);
        
        return redirect()->to('/data-pasien')->with('success', 'Data pasien berhasil disimpan.');
    }

    public function update(PasienStoreRequest $request, $pasien_id)
    {
        $pasien = Pasien::findOrFail($pasien_id);
        $pasien->update($request->all());
        return redirect()->to('/data-pasien')->with('success', 'Data pasien berhasil diubah.');
    }

    public function destroy($pasien_id)
    {
        $pasien = Pasien::findOrFail($pasien_id);
        $pasien->delete();
        return redirect()->to('/data-pasien')->with('success', 'Data pasien berhasil dihapus.');
    }

    public function getDataPasienJson()
    {
        $search = request()->query('search', '');
        $query = Pasien::query();

        if($search) {
            $query->where('nama_lengkap', 'LIKE', "%" . $search . "%")
            ->orWhere('nomor_pasien', 'LIKE', "%" . $search . "%");
        }

        $query->orderBy('nama_lengkap', 'ASC');
        $pasien = $query->get()->map(function ($pasien) {
            return [
                'label' => $pasien->nomor_pasien . " " . $pasien->nama_lengkap,
                'value'=> $pasien->id
            ];
        });
        return response()->json($pasien);
    }

    public function getRekamMedis($pasien_id)
    {
        $limit = request()->query('limit');
        $query = Diagnosa::where('pasien_id', $pasien_id)
        ->orderBy('created_at', 'DESC');

        if($limit) {
            $query->limit($limit);
        }

        $rekamMedis = $query->get()->map(function ($diagnosa) {
            $diagnosa->tanggal_periksa = Carbon::parse($diagnosa->created_at)->locale('id')->translatedFormat('l, d F Y');
            return $diagnosa;
        });
        return response()->json($rekamMedis);
    }

    public function show($pasien_id)
    {
        $query = Pasien::with('diagnosa')->find($pasien_id);
        $pasien = PasienResource::make($query);
        return response()->json($pasien);
    }
}
