"use client";
import { useState } from 'react';

export default function AddData() {
  const [nim, setNim] = useState('');
  const [kode_mk, setKodeMk] = useState('');
  const [nilai, setNilai] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/api/add-mahasiswa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nim,
        kode_mk,
        nilai,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Log the response data for debugging
      alert('Data telah ditambahkan');
      // Redirect to the home page
      window.location = '/';
    } else {
      console.error('Failed to submit data');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <div className="relative overflow-x-auto shadow-lg sm:rounded-md">
        <form onSubmit={handleSubmit} className="w-full text-sm text-left rtl:text-right text-gray-500 p-6 space-y-6">
          <label className="font-bold uppercase">
            NIM
            <input type="text" value={nim} onChange={(e) => setNim(e.target.value)} className="w-full mb-8 mt-2 px-3 py-2 border text-black border-gray-200 rounded" />
          </label>
          <label className="font-bold uppercase">
            Kode MK
            <input type="text" value={kode_mk} onChange={(e) => setKodeMk(e.target.value)} className="w-full mb-8 mt-2 px-3 py-2 border text-black border-gray-200 rounded" />
          </label>
          <label className="font-bold uppercase">
            Nilai
            <input type="text" value={nilai} onChange={(e) => setNilai(e.target.value)} className="w-full px-3 py-2 mt-2 border text-black border-gray-200 rounded" />
          </label>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded uppercase font-bold">Tambah Data</button>
          </div>
        </form>
      </div>
    </main>
  );
}