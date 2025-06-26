import { useTranslations } from 'next-intl';
import EditMultiImageForm from '../../log/edit/EditMultiImageForm';
import MultiImageForm from './MultiImageForm';
import SingleImageForm from './SingleImageForm';
import TextForm from './TextForm';

interface PhotoTextSectionProps {
  thumbnail?: boolean;
  idx?: number;
  edit?: boolean;
}

const PhotoTextSection = ({ thumbnail, idx = 1, edit }: PhotoTextSectionProps) => {
  const t = useTranslations('Register.LogPage');
  return (
    <div className="mb-2.5">
      {thumbnail ? (
        <SingleImageForm name="thumbnail" label={t('coverImage')} edit={edit} />
      ) : edit ? (
        <EditMultiImageForm idx={idx} />
      ) : (
        <MultiImageForm idx={idx} />
      )}
      <TextForm formFieldName={thumbnail ? 'logDescription' : `places.${idx}.description`} />
    </div>
  );
};

export default PhotoTextSection;
