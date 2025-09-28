<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kunjungan extends Model
{
    protected $fillable = ['pasien_id', 'tanggal_kunjungan'];
    
    public function pasien()
    {
        return $this->belongsTo(Pasien::class);
    }
}
