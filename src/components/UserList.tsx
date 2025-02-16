import { useQuery } from "@tanstack/react-query";
import { getUsers, IUserDto } from "../api/users";

export const UserList = () => {
  // isPending  нет данных , и нет запроса
  // isFetching идет любой запрос к серверу

  const { data, error, isPending } = useQuery({
    queryKey: ["users", "list"],
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
      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2">
          <button className="p-1">Добавить котика</button>
          <button className="p-1">Включить</button>
        </div>
        <div className="flex gap-2">
          <button className="p-1">След</button>
          <button className="p-1">Пред</button>
        </div>
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
    <div style={{ display: "flex", gap: 8 }}>
      <span>{data.age}</span>
      <span>{data.firstName}</span>
    </div>
  );
};
