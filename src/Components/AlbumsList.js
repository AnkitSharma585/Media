import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import AlbumsListItem from './AlbumsListItem';
import Button from './Button';
import Skeleton from './Skeleton';

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbums, results] = useAddAlbumMutation();

  const handleClick = () => {
    addAlbums(user);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className='h-8 w-full' />;
  } else if (error) {
    content = <div> Oops.. An error occurs {error} </div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem album={album} key={album.id} />;
    });
  }

  return (
    <div>
      <div className='m-2 flex items-center justify-between'>
        <h3 className='font-bold  text-xl'>Albums for {user.title}</h3>
        <Button loading={results.isLoading} onClick={handleClick}>
          +Add Albums
        </Button>
      </div>
      {content}
    </div>
  );
}
export default AlbumsList;
