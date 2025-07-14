import EditMultiImageForm from '../../edit/EditMultiImageForm';
import MultiImageForm from '../MultiImageForm';

interface ImageSectionProps {
  idx?: number;
  edit?: boolean;
  fieldName?: string;
}

const ImageSection = ({ idx = 1, edit, fieldName }: ImageSectionProps) => {
  return (
    <div className="">
      {edit ? <EditMultiImageForm idx={idx} /> : <MultiImageForm idx={idx} fieldName={fieldName} />}
    </div>
  );
};

export default ImageSection;
