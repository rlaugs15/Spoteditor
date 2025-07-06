import EditMultiImageForm from '../../edit/EditMultiImageForm';
import MultiImageForm from '../MultiImageForm';

interface ImageSectionProps {
  idx?: number;
  edit?: boolean;
  fieldName?: string;
}

const ImageSection = ({ idx = 1, edit, fieldName }: ImageSectionProps) => {
  return (
    <div className="mb-2.5">
      {edit ? <EditMultiImageForm idx={idx} /> : <MultiImageForm idx={idx} fieldName={fieldName} />}
    </div>
  );
};

export default ImageSection;
