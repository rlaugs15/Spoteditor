'use client';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  return (
    <TypeAnimation
      sequence={[
        '당신의 취향이 누군가의 영감이 될 수 있어요',
        1200,
        'Your favorites could spark someone else’s discovery',
        1200,
      ]}
      speed={40}
      className="font-bold text-md web:text-xl text-black"
      repeat={Infinity}
    />
  );
};

export default TypingText;
