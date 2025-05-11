import PhotoForm from './PhotoForm';
import TextForm from './TextForm';

interface PhotoTextSectionProps {
  thumbnail?: boolean;
}

const PhotoTextSection = ({ thumbnail }: PhotoTextSectionProps) => {
  return (
    <div className="mb-2.5">
      <PhotoForm thumbnail={thumbnail} />
      <TextForm />
    </div>
  );
};

export default PhotoTextSection;
