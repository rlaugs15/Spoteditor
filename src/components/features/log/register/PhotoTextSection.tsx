import EditMultiImageForm from '../edit/EditMultiImageForm';
import MultiImageForm from './MultiImageForm';
import SingleImageForm from './SingleImageForm';
import TextForm from './TextForm';

interface PhotoTextSectionProps {
  thumbnail?: boolean;
  idx?: number;
  edit?: boolean;
  fieldName?: string;
}

const PhotoTextSection = ({ thumbnail, idx = 1, edit, fieldName }: PhotoTextSectionProps) => {
  return (
    <div className="mb-2.5">
      {thumbnail ? (
        <SingleImageForm name="thumbnail" label={t('coverImage')} edit={edit} />
      ) : edit ? (
        <EditMultiImageForm idx={idx} />
      ) : (
        <MultiImageForm idx={idx} fieldName={fieldName} />
      )}
      <TextForm
        formFieldName={
          thumbnail
            ? 'logDescription'
            : fieldName
            ? `${fieldName}.description`
            : `places.${idx}.description`
        }
      />
    </div>
  );
};

export default PhotoTextSection;
