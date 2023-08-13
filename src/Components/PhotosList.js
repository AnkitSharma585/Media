import Skeleton from './Skeleton';
import Button from './Button';
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import PhotosListItem from './PhotosListItem';

function PhotosList({ album }) {
  const { data, error, isLoading } = useFetchPhotosQuery(album);
  const [addPhotos, results] = useAddPhotoMutation();

  const handleClick = () => {
    addPhotos(album);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className='w-8 h-8' />;
  } else if (error) {
    content = <div>Oops.. An error occurs {error}</div>;
  } else {
    content = data.map((photo) => {
      return <PhotosListItem photo={photo} key={photo.id} />;
    });
  }

  return (
    <div>
      <div className='m-2 flex items-center justify-between'>
        <h3 className='italic font-semibold'>Photos for {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleClick}>
          +Add Photos
        </Button>
      </div>
      <div className='flex items-center justify-center gap-2 m-2 flex-wrap'>
        {content}
      </div>
    </div>
  );
}
export default PhotosList;
