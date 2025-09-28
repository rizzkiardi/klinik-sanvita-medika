import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const weekday = [
        'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
      ];
      const month = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];

      const date = new Date();
      const hari = weekday[date.getDay()];
      const tanggal = date.getDate();
      const bulan = month[date.getMonth()];
      const tahun = date.getFullYear();

      const hour = date.getHours().toString().padStart(2, '0');
      const min = date.getMinutes().toString().padStart(2, '0');
      const sec = date.getSeconds().toString().padStart(2, '0');

      const timeString = `${hour} : ${min} : ${sec} | ${hari}, ${tanggal} ${bulan} ${tahun}`;
      setCurrentTime(timeString);
    }, 1000);

    // cleanup interval saat komponen unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="clock" className="text-xs">
      {currentTime}
    </div>
  );
}
