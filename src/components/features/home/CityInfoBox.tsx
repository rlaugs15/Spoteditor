import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
interface CityInfoBoxProps {
  label: string;
  value: string;
  className?: string;
}
const CityInfoBox = ({ label, value, className }: CityInfoBoxProps) => {
  return (
    <div
      className={cn('bg-white flex flex-col grow web:px-5 px-3 web:py-3 py-2.5 gap-2', className)}
    >
      <Label className="!text-light-400 text-text-sm">{label}</Label>
      <p className="text-black text-text-md web:text-sm font-bold">{value}</p>
    </div>
  );
};

export default CityInfoBox;
