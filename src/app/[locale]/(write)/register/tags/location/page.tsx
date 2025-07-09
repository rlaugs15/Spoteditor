'use client';
import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, SingleTagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';
import { useLogCreationStore } from '@/stores/logCreationStore';

const LocationSelectionPage = () => {
  const selectedCountry = useLogCreationStore((state) => state.country);
  const selectedCity = useLogCreationStore((state) => state.city);

  return (
    <>
      <div className="grow space-y-6">
        {/* Country Selection */}
        <div className="space-y-3">
          <PageIntro type="country" />
          <SingleTagGroup type="country" />
        </div>

        {/* City Selection - only show if country is selected */}
        {selectedCountry && (
          <div className="space-y-3">
            <PageIntro type="city" />
            <SingleTagGroup type="city" />
          </div>
        )}

        {/* Sigungu Selection - only show if city is selected */}
        {selectedCity && (
          <div className="space-y-3">
            <PageIntro type="sigungu" />
            <SingleTagGroup type="sigungu" />
          </div>
        )}
      </div>

      <RegisterFooter tagTargets={['country', 'city', 'sigungu']} nextPath={REGISTER_PATHS.LOG} />
    </>
  );
};

export default LocationSelectionPage;
