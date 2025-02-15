import { useQuery } from '@tanstack/react-query';
import { getUsers, IUserDto } from '../api/users';

export const UserList = () => {
  // isPending  нет данных , и нет запроса
  // isFetching идет любой запрос к серверу

  const { data, error, isPending } = useQuery({
    queryKey: ['users', 'list'],
    queryFn: getUsers,
  });

  if (isPending) {
    return <p>Данные ожидаются</p>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <section>
      <div>
        <p>Включить</p>
        <p>Пагинация</p>
      </div>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <UserListItem data={user} />
          </li>
        ))}
      </ul>
    </section>
  );
};

const UserListItem = ({ data }: { data: IUserDto }) => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <span>{data.age}</span>
      <span>{data.firstName}</span>
    </div>
  );
};
