import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;         // The text to display on the button
  link: string;         // The link the button should navigate to
  style?: string;       // Optional custom styles for the button (Tailwind CSS classes)
  size?: string;        // Optional size classes to control the button size
  onClick?: () => void; // Optional click event handler
}

const Button: React.FC<ButtonProps> = ({ text, link, style = '', onClick }) => {
  return (
    <Link href={link} passHref>
      
        <button
          className={`w-[120px] h-[40px] ${style} rounded-[70px] `}
          onClick={onClick}  // Attach onClick handler here
        >
          {text}
        </button>
     
    </Link>
  );
}

export default Button;
