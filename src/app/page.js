"use client";
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/get-mahasiswa')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleDelete = async (nim, kode_mk) => {
    const response = await fetch(`http://localhost:8000/api/delete-mahasiswa/${nim}/${kode_mk}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove the deleted item from the state
      setData(data.filter(item => item.nim !== nim || item.kode_mk !== kode_mk));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
    <div className="relative overflow-x-auto shadow-lg sm:rounded-md">
    <div className="flex justify-end mb-2">
      <a href="/AddData" className="bg-green-600 text-white px-4 py-2 rounded">Tambah Data</a>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                NIM
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Alamat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal Lahir
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kode Mata Kuliah
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Mata Kuliah
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah SKS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nilai
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`} key={item.nim}>
                          <td className="px-6 py-4 text-center">{item.nim}</td>
                          <td className="px-6 py-4 text-center">{item.nama}</td>
                          <td className="px-6 py-4 text-center">{item.alamat}</td>
                          <td className="px-6 py-4 text-center">{item.tanggal_lahir}</td>
                          <td className="px-6 py-4 text-center">{item.kode_mk}</td>
                          <td className="px-6 py-4 text-center">{item.nama_mk}</td>
                          <td className="px-6 py-4 text-center">{item.sks}</td>
                          <td className="px-6 py-4 text-center">{item.nilai}</td>
                          <td className="px-6 py-4 flex justify-center">
                            <div className="flex items-center space-x-2">
                              <button onClick={() => { router.push('/UpdateData'); localStorage.setItem("nim",item.nim); localStorage.setItem("kode_mk", item.kode_mk) }} className="font-medium text-blue-600 hover:underline">
                                <FaEdit size={18} />
                              </button>
                              <button onClick={async () => {
                                if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                                  await handleDelete(item.nim, item.kode_mk);
                                  alert('Data telah berhasil dihapus');
                                }
                              }} className="font-medium text-red-600 hover:underline">
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}