import { Fragment } from 'react';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleClick = () => {
    removeAlbum(album);
  };

  const header = (
    <Fragment>
      <Button
        loading={results.isLoading}
        onClick={handleClick}
        className='mr-2'
      >
        <GoTrash />
      </Button>
      {album.title}
    </Fragment>
  );

  return (
    <ExpandablePanel header={header}>
      <PhotosList album={album} key={album.id} />
    </ExpandablePanel>
  );
}
export default AlbumsListItem;
