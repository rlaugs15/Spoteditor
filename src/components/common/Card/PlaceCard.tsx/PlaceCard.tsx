import PlaceBookMarkButton from '@/components/common/Button/Bookmark/PlaceBookMarkButton';
import { PlaceWithImages } from '@/types/api/log';
import { Tables } from '@/types/supabase';
import { PostCardImage, PostCardLocation, PostCardTitle } from '../PostCard';

interface PlaceCardProps {
  place: PlaceWithImages;
  address: Pick<Tables<'address'>, 'country' | 'city' | 'sigungu'>;
  vertical?: boolean;
  modal?: boolean;
}

const PlaceCard = ({ place, address, vertical, modal }: PlaceCardProps) => {
  return (
    <div className="cursor-pointer relative">
      <PostCardImage imageUrl={place.place_images[0].image_path} vertical={vertical} />
      <PostCardTitle title={place.name} modal={modal} />
      <PostCardLocation city={address.city} sigungu={address.sigungu} modal={modal} />
      <PlaceBookMarkButton placeId={place.place_id} modal />
    </div>
  );
};

export default PlaceCard;
