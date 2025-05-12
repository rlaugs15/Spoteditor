import PhotoForm from './PhotoForm';
import SingleImageForm from './SingleImageForm';
import TextForm from './TextForm';

interface PhotoTextSectionProps {
  thumbnail?: boolean;
  formFieldName: string;
  idx?: number;
}

const PhotoTextSection = ({ thumbnail, formFieldName, idx }: PhotoTextSectionProps) => {
  return (
    <div className="mb-2.5">
      {thumbnail ? (
        <SingleImageForm name="thumbnail" label="커버 이미지" />
      ) : (
        <PhotoForm thumbnail={thumbnail} idx={idx} />
      )}
      <TextForm formFieldName={formFieldName} />
    </div>
  );
};

export default PhotoTextSection;
