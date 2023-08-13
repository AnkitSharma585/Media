import { Fragment } from 'react';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { GoTrash } from 'react-icons/go';
import { useRemoveUserMutation } from '../store';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  const [removeUser, resutls] = useRemoveUserMutation();

  const handleClick = () => {
    removeUser(user);
  };

  const header = (
    <Fragment>
      <Button
        className='mr-2'
        loading={resutls.isLoading}
        onClick={handleClick}
      >
        <GoTrash />
      </Button>
      {user.title}
    </Fragment>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} key={user.id} />
    </ExpandablePanel>
  );
}
export default UsersListItem;
