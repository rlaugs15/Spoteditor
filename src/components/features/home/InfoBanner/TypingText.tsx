'use client';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  return (
    <TypeAnimation
      sequence={[
        '모든 유저가 특별한 “에디터"가 될 수 있어요!',
        1200,
        'Anyone can become a special "Editor"!',
        1200,
      ]}
      speed={40}
      className="font-bold text-xl text-black"
      repeat={Infinity}
    />
  );
};

export default TypingText;
