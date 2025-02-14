import React from 'react';

function Card({ title, image, desc, price, facility, onEdit}) {
  return (
    <div className="rounded-3xl overflow-hidden flex flex-col xl:flex-row w-[22.5rem] md:w-[55rem] xl:w-full md:flex-row" onClick={onEdit}>
      <img src={image || '/pendakian.jpg'} alt={title || 'Image'} className="w-[22.5rem] md:w-[23rem] xl:w-96 h-full object-cover " />
      <div className=" bg-white px-4 py-4 rounded-2xl  flex flex-col items-center justify-center">
        <div className='w-[22.5rem] xl:w-[31rem] md:w-[20rem]'>
        <h3 className="font-montserratsem font-extrabold text-[1.3rem] md:text-[1.1rem] xl:text-[1.3rem] text-gray-800 px-2">{title || 'Pendakian Bukit Semar yang Memanjakan Mata'}</h3>
        <p className="font-montserratreg text-sm mt-2 text-gray-600 overflow-hidden text-ellipsis whitespace-normal h-12 line-clamp-2 px-2">
            {desc || 'Pendakian bukit semar, berada di desa dilem kec.Gondang.'}
        </p>
        </div>
        <div className='font-montserratreg text-sm flex justify-between w-full shadow-md px-3 py-1 rounded-md'>
            {
              facility.map((item, index) => (
                <p key={index}>{item}</p>
              ))
            }
        </div>
      </div>
      <div className='bg-sky-700 flex items-center justify-center flex-col py-4 px-6'>
        <p className="font-montserratbold text-4xl xl:text-4xl mt-2 text-white md:text-2xl">
            {price}
        </p>
        <p className='font-montserratreg text-sm text-white'>/per orang</p>
      </div>
    </div>
  );
}

export default Card;
