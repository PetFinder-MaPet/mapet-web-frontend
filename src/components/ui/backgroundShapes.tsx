import React from 'react';

const colorClasses = {
  login: {
    bg: 'bg-login -600',
    border: 'border-login -600',
    borderB: 'border-b-login -600',
  },
  blue: {
    bg: 'bg-blue-500',
    border: 'border-blue-500',
    borderB: 'border-b-blue-500',
  },
  green: {
    bg: 'bg-green-500',
    border: 'border-green-500',
    borderB: 'border-b-green-500',
  },
  purple: {
    bg: 'bg-purple-500',
    border: 'border-purple-500',
    borderB: 'border-b-purple-500',
  },
  pink: {
    bg: 'bg-pink-500',
    border: 'border-pink-500',
    borderB: 'border-b-pink-500',
  },
};

type ColorName = keyof typeof colorClasses;

interface BackgroundShapesProps {
  color?: ColorName;
  backgroundColor?: string;
}

const BackgroundShapes: React.FC<BackgroundShapesProps> = ({
  color = 'login',
  backgroundColor = 'white',
}) => {
  const colorClass = colorClasses[color];

  return (
    <>
      {/* Triángulo con borde falso */}
      <div className="relative w-0 h-0">
        <div
          className={`absolute top-[-550px] left-[-410px] w-0 h-0 
            border-l-[700px] border-l-transparent 
            border-b-[700px] ${colorClass.borderB} 
            rotate-[235deg] z-0`}
        />
        <div
          className={`absolute top-[-545px] left-[-405px] w-0 h-0 
            border-l-[630px] border-l-transparent 
            border-b-[620px] rotate-[235deg] z-10`}
          style={{ borderBottomColor: backgroundColor }}
        />
      </div>

      {/* Óvalo con relleno */}
      <div className={`absolute top-[110px] right-[-30px] w-64 h-32 ${colorClass.bg} rounded-full rotate-45 z-0`} />

      {/* Círculo sin relleno */}
      <div className={`absolute bottom-[-700px] left-[-300px] w-[1100px] h-[1100px] border-[50px] ${colorClass.border} rounded-full z-0`} />

      {/* Círculo con relleno */}
      <div className={`absolute bottom-[-64px] right-[-64px] w-64 h-64 ${colorClass.bg} rounded-full z-0`} />
    </>
  );
};

export default BackgroundShapes;
