import { useTranslations } from 'next-intl';

interface ProfileFallbackMessageProps {
  resourceName: string;
}

export default function ProfileFallbackMessage({ resourceName }: ProfileFallbackMessageProps) {
  const t = useTranslations('ProfilePage');
  return (
    <div className="flex justify-center items-start py-[49px] min-h-[350px]">
      <h3 className="font-bold text-center text-text-sm text-primary-200">
        {t('fallback.empty', { resourceName })
          .split('\n')
          .map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
      </h3>
    </div>
  );
}
