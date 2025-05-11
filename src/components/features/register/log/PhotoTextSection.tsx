import PhotoForm from './PhotoForm';
import TextForm from './TextForm';

interface PhotoTextSectionProps {
  thumbnail?: boolean;
  formFieldName: string;
}

const PhotoTextSection = ({ thumbnail, formFieldName }: PhotoTextSectionProps) => {
  return (
    <div className="mb-2.5">
      <PhotoForm thumbnail={thumbnail} />
      <TextForm formFieldName={formFieldName} />
    </div>
  );
};

export default PhotoTextSection;
