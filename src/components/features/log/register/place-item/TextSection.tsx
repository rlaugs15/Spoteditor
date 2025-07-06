import TextForm from '../TextForm';

interface TextSectionProps {
  idx?: number;
  fieldName?: string;
}

const TextSection = ({ idx = 1, fieldName }: TextSectionProps) => {
  return (
    <div className="mb-2.5">
      <TextForm
        formFieldName={fieldName ? `${fieldName}.description` : `places.${idx}.description`}
      />
    </div>
  );
};

export default TextSection;
