import Button from './Button';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem';
import { useFetchUsersQuery, useAddUserMutation } from '../store';

function UsersList(users) {
  const { data, error, isFetching } = useFetchUsersQuery(users);
  const [addUsers, results] = useAddUserMutation();

  const handleClick = () => {
    addUsers(users);
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={3} className='h-8 w-full' />;
  } else if (error) {
    content = <div>Oops.. An error occurs {error}</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem user={user} key={user.id} />;
    });
  }

  return (
    <div>
      <div className='flex m-2 items-center justify-between'>
        <h1 className='text-2xl font-bold'>List of users</h1>
        <Button loading={results.isLoading} onClick={handleClick} primary>
          +Add Users
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}
export default UsersList;
