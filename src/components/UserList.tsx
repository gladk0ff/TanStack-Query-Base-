import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUsers, getUsers, IUserDto } from "../api/users";
import { useState } from "react";
import classNames from "classnames";
import { INITIAL_ALL_DATA, INITIAL_DATA } from "./initialData";

export const UserList = () => {
  // isPending  нет данных , и нет запроса
  // isFetching идет любой запрос к серверу

  const [page, setPage] = useState(1);
  const [isLoadAll, setLoadAll] = useState(false);

  const {
    data: users,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    // staleTime: Infinity,
    // gcTime: 1000,
    queryKey: ["users", page],
    queryFn: ({ queryKey, signal }) =>
      getUsers({ page: queryKey[1] as number }, { signal }),
    placeholderData: keepPreviousData, // так же можно задать и функцию
    // наполняет кеш  запроса из другого источника (localeStorage,somedata)
    // очень полезен для ssr
    // initialData: INITIAL_DATA,
  });

  // сделать запрос на показ всех и пример посмотре с isFetching
  const { data: usersAll } = useQuery({
    queryKey: ["users-all"],
    queryFn: (meta) => getAllUsers(meta),
    enabled: isLoadAll,
    // initialData: INITIAL_ALL_DATA as unknown as IUserDto[],
  });

  const btnClass = "px-2 py-1  rounded cursor-pointer ";
  const btnAcions = btnClass + "bg-blue-200 hover:bg-blue-400";
  const btnPg = btnClass + "bg-gray-200 hover:bg-gray-400 ";
  const btnDis = "disabled:pointer-events-none disabled:opacity-20";

  if (isPending) {
    return <p>Данные ожидаются</p>;
  }

  if (isFetching) {
    return <p>Идут запросы</p>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const usersData = isLoadAll ? usersAll : users.data;

  return (
    <section>
      <div className="flex gap-2 justify-between align-middle">
        <div className="flex gap-2">
          <button className={btnAcions}>Добавить котика</button>
          <button onClick={() => setLoadAll(!isLoadAll)} className={btnAcions}>
            {isLoadAll ? "Включить пагинацю" : "Загрузить всех"}
          </button>
        </div>
        {!isLoadAll && (
          <p className="text-lg font-semibold">Страница : {page}</p>
        )}
        {!isLoadAll && (
          <div className="flex gap-2 dis">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => --p)}
              className={classNames(btnPg, page === 1 && btnDis)}
            >
              {"<<"} Пред
            </button>
            <button
              disabled={page === users.pages}
              onClick={() => setPage((p) => Math.min(++p, users.pages))}
              className={classNames(btnPg, page === users.pages && btnDis)}
            >
              След {">>"}
            </button>
          </div>
        )}
      </div>

      <ul
        className={classNames(
          "bacground-color-gray flex flex-col  gap-2 mt-4",
          isFetching && "opacity-50",
          "overflow-y-auto max-h-110"
        )}
      >
        {usersData.map((user) => (
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
