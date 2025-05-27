import React from 'react';
import Image from 'next/image';

interface CardsProps {
  icon: string;        // URL or path to the icon image
  Heading: string;     // Heading text for the card
  description: string; // Description text for the card
}

const Cards: React.FC<CardsProps> = ({ icon, Heading, description }) => {
  return (
    <div className="w-[20rem] h-[20rem] sm:w-[500px] sm:h-[300px] bg-transparent border-2 rounded-[30px] shadow-[0_2px_10px_rgba(138,43,226,0.7)]">
      {/* Card Image/Icon - Using Next.js optimized Image component */}
      <div className="w-[40px] h-[40px] ml-8 mt-9 drop-shadow-[0_0_15px_#00bfff]">
        <Image
          src={icon}
          alt="Card Icon"
          width={40}
          height={40}
          loading="lazy"
          className="object-contain"
        />
      </div>

      {/* Card Heading */}
      <h2 className="text-[25px] text-white font-semibold ml-8 mt-5">{Heading}</h2>

      {/* Card Description */}
      <p className="text-white ml-8 mt-2 text-xs pr-15">{description}</p>
    </div>
  );
};

export default Cards;