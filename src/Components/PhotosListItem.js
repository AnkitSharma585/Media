import { GoTrash } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';

function PhotosListItem({ photo }) {
  const [removePhoto] = useRemovePhotoMutation();

  const handleClick = () => {
    removePhoto(photo);
  };

  return (
    <div className='relative cursor-pointer'>
      <img src={photo.url} alt='random-photos' />
      <div className='absolute inset-0 flex items-center justify-center bg-gray-600 opacity-0 hover:opacity-80'>
        <GoTrash onClick={handleClick} className='text-3xl' />
      </div>
    </div>
  );
}
export default PhotosListItem;
