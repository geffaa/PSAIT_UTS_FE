"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateData() {
  const [nim, setNim] = useState(localStorage.getItem("nim"));
  const [kodeMK, setKodeMK] = useState(localStorage.getItem("kode_mk"));
  const [nilai, setNilai] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8000/api/update-mahasiswa/${nim}/${kodeMK}`)
      .then((response) => response.json())
      .then((data) => {
        setNilai(data.nilai);
      })
      .catch((error) => console.error(error));
  }, [nim, kodeMK]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:8000/api/update-mahasiswa/${nim}/${kodeMK}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nilai }),
        });
      
        const data = await response.json();
        console.log(data.message);
        alert('Data berhasil di update');
        localStorage.setItem("nim", null);
        localStorage.setItem("kode_mk", null);
        router.push('/');
      } catch (error) {
        console.error(error);
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
            <input type="text" value={kodeMK} onChange={(e) => setKodeMK(e.target.value)} className="w-full mb-8 mt-2 px-3 py-2 border text-black border-gray-200 rounded" />
          </label>
          <label className="font-bold uppercase">
            Nilai
            <input type="text" value={nilai} onChange={(e) => setNilai(e.target.value)} className="w-full px-3 py-2 mt-2 border text-black border-gray-200 rounded" />
          </label>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded uppercase font-bold">Update Data</button>
          </div>
        </form>
      </div>
    </main>
  );
}