import React from 'react';

function Card({ title, image, desc, locate, onEditClick }) {
  return (
    <div
      className="w-[22.5rem] h-96 rounded-3xl overflow-hidden relative cursor-pointer"
      onClick={onEditClick} // Trigger onClick when the card is clicked
    >
      <img
        src={image || '/bromo.jpg'}
        alt={title || 'Image'}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-5 left-5 right-5 bg-white px-4 py-1 h-24 rounded-2xl">
        <p className="font-montserratreg text-[0.8rem] text-secondary truncate">
          {locate || 'Dilem'}
        </p>
        <h3 className="font-montserratreg font-bold text-[1rem] text-gray-800 truncate">
          {title || 'Testing'}
        </h3>
        <p className="font-montserratreg text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-normal h-12 line-clamp-2">
          {desc || 'Teks deskripsi yang panjang akan dibatasi sebanyak ini.'}
        </p>
      </div>
    </div>
  );
}

export default Card;
