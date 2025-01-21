import React from 'react';

function Card({ title, image, desc, locate }) {
  return (
    <div className="rounded-3xl overflow-hidden flex flex-col xl:flex-row w-[22.5rem] xl:w-full">
      <img src={image || '/bromo.jpg'} alt={title || 'Image'} className="w-[22.5rem] xl:w-96 h-full object-cover" />
      <div className=" bg-white px-4 py-4 rounded-2xl  flex flex-col items-center justify-center">
        <div className='w-[22.5rem] xl:w-[31rem]'>
        <h3 className="font-montserratsem font-extrabold text-[1.3rem] text-gray-800 px-2">{title || 'Pendakian Bukit Semar yang Memanjakan Mata'}</h3>
        <p className="font-montserratreg text-sm mt-2 text-gray-600 overflow-hidden text-ellipsis whitespace-normal h-12 line-clamp-2 px-2">
            {desc || 'Teks deskripsi yang panjang akan dibatasi sebanyak inidwadadadwadadwada.'}
        </p>
        </div>
        <div className='font-montserratreg text-sm flex justify-between w-full shadow-md px-3 py-1 rounded-md'>
            <p>View</p>
            <p>2 - 3 jam</p>
            <p>Jalur enak</p>
            <p>Cocok buat pemula</p>
            <p>Camping</p>
        </div>
      </div>
      <div className='bg-sky-700 flex items-center justify-center flex-col py-4 px-6'>
        <p className="font-montserratbold text-4xl mt-2 text-white">
            Rp. 5.000
        </p>
        <p className='font-montserratreg text-sm text-white'>/per orang</p>
      </div>
    </div>
  );
}

export default Card;
