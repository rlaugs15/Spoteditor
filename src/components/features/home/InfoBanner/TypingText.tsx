'use client';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  return (
    <TypeAnimation
      sequence={[
        '여행지에서, 익숙한 동네에서—\n당신의 취향이 머무는 장소로 하루를 그려보세요.',
        1200,
        'Traveling or staying local—\ncreate your day with the places you love.',
        1200,
      ]}
      speed={40}
      className="font-bold text-md web:text-xl text-black"
      repeat={Infinity}
    />
  );
};

export default TypingText;
