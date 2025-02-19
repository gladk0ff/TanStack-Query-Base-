import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers, IUserDto } from "../api/users";
import { useState } from "react";

export const UserList = () => {
  // isPending  нет данных , и нет запроса
  // isFetching идет любой запрос к серверу

  const [page, setPage] = useState(1);

  const {
    data: users,
    error,
    isPending,
  } = useQuery({
    // staleTime: Infinity,
    // gcTime: 1000,
    queryKey: ["users", page],
    queryFn: ({ queryKey, signal }) =>
      getUsers({ page: queryKey[1] as number }, { signal }),
    placeholderData: keepPreviousData, // так же можно задать и функцию
  });

  if (isPending) {
    return <p>Данные ожидаются</p>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const btnClass = "px-2 py-1  rounded cursor-pointer ";
  const btnAcions = btnClass + "bg-blue-200 hover:bg-blue-400";
  const btnPg = btnClass + "bg-gray-200 hover:bg-gray-400 ";

  return (
    <section>
      <div className="flex gap-2 justify-between align-middle">
        <div className="flex gap-2">
          <button className={btnAcions}>Добавить котика</button>
          <button className={btnAcions}>Включить</button>
        </div>
        <div className="flex gap-2 dis">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => --p)}
            className={
              btnPg +
              (page === 1
                ? " disabled:pointer-events-none disabled:opacity-20"
                : "")
            }
          >
            {"<<"} Пред
          </button>
          <button
            onClick={() => setPage((p) => Math.min(++p, users.pages))}
            className={btnPg}
          >
            След {">>"}
          </button>
        </div>
      </div>
      <ul className="bacground-color-gray flex flex-col  gap-2 mt-4">
        {users.data.map((user) => (
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
    <div className="flex gap-2 border border-blue-100 rounded p-1">
      <span>{data.age}</span>
      <span>{data.firstName}</span>
    </div>
  );
};
