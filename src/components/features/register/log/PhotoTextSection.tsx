import MultiImageForm from './MultiImageForm';
import SingleImageForm from './SingleImageForm';
import TextForm from './TextForm';

interface PhotoTextSectionProps {
  thumbnail?: boolean;
  idx?: number;
}

const PhotoTextSection = ({ thumbnail, idx = 1 }: PhotoTextSectionProps) => {
  return (
    <div className="mb-2.5">
      {thumbnail ? (
        <SingleImageForm name="thumbnail" label="커버 이미지" />
      ) : (
        <MultiImageForm idx={idx} />
      )}
      <TextForm formFieldName={thumbnail ? 'logDescription' : `places.${idx}.description`} />
    </div>
  );
};

export default PhotoTextSection;
