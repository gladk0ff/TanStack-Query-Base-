import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUsers, getUsers, IUserDto } from "../api/users";
import { ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { INITIAL_ALL_DATA, INITIAL_DATA } from "./initialData";
// import { IPagination } from "../types";
// import { getUsersAll, getUsersWithPagination } from "../queries/users";
// import { getUsersWithPagination } from "../queries/users";

export const UserList = () => {
  // isPending  нет данных , и нет запроса
  // isFetching идет любой запрос к серверу

  const [page, setPage] = useState(1);
  const [isLoadAll, setLoadAll] = useState(false);

  const {
    data: users,
    error,
    // isLoading,
    isPlaceholderData,
    isPending,
    isFetching,
    isLoading,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: ({ queryKey, signal }) =>
      getUsers({ page: queryKey[1] as number }, { signal }),
    // retry: 3, // почему +1 запрос - первый не считается,
    // retryDelay: 1000, // как часто
    // staleTime: Infinity,
    // gcTime: 1000,
    // так же можно задать и функцию
    // placeholderData: keepPreviousData,
    // наполняет кеш  запроса из другого источника (localeStorage,somedata)
    // очень полезен для ssr
    // initialData: INITIAL_DATA as unknown as IPagination<IUserDto>,// когда есть флаг isPlaceholderData не срабатывает
    // enabled: isLoadAll,
  });

  // console.log("==>", status, fetchStatus);

  // сделать запрос на показ всех и пример посмотре с isFetching
  const { data: usersAll } = useQuery({
    queryKey: ["users-all"],
    queryFn: (meta) => getAllUsers(meta),
    enabled: isLoadAll,
    initialData: INITIAL_ALL_DATA as unknown as IUserDto[],
  });

  const btnClass = "px-2 py-1  rounded cursor-pointer ";
  const btnAcions = btnClass + "bg-blue-200 hover:bg-blue-400";
  const btnPg = btnClass + "bg-gray-200 hover:bg-gray-400 ";
  const btnDis = "disabled:pointer-events-none disabled:opacity-20";

  if (error) {
    console.log("error", error);

    return <div>ОШИБКА:{error.message}</div>;
  }

  if (isPending) {
    //данных нет
    //status ==="pending"
    console.log("==> isPending: Данные ожидаются", status, fetchStatus);
  }

  if (isFetching) {
    // идет загрузка
    //fetchStatus ==="fetching"
    console.log("==> isFetching : Идут запросы", status, fetchStatus);
  }

  if (isLoading) {
    //status ==="pending" && fetchStatus ==="fetching"
    // данныъ нет пошла загрузка
    console.log("==> isLoading : Загрузка ", status, fetchStatus);
  }

  const usersData = isLoadAll ? usersAll : users?.data;

  return (
    <section>
      <div className="flex gap-2 justify-between align-middle">
        <div className="flex gap-2">
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
              disabled={page === users?.pages}
              onClick={() => setPage((p) => Math.min(++p, users?.pages || 1))}
              className={classNames(btnPg, page === users?.pages && btnDis)}
            >
              След {">>"}
            </button>
          </div>
        )}
      </div>

      {isLoading && <p>Загрузка</p>}

      <ul
        className={classNames(
          "bacground-color-gray flex flex-col  gap-2 mt-4",
          isPlaceholderData && "opacity-50",
          "overflow-y-auto max-h-110"
        )}
      >
        {usersData?.map((user) => (
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

// ПРО СТАТУСЫ
// isPending,
// isFetching,
// isLoading,
// status,
// fetchStatus,

// const statuses = [];
// if (isLoading) {
//   //status ==="pending" && fetchStatus ==="fetching"
//   // данныъ нет пошла загрузка
//   console.log("==> isLoading", status, fetchStatus);
//   statuses.push(<p key="isLoading">Загрузка</p>);
//   // return <p>загрузка</p>;
// }

// if (isFetching) {
//   // идет загрузка
//   //fetchStatus ==="fetching"
//   console.log("==> isFetching", status, fetchStatus);
//   statuses.push(<p key="isFetching">Идут запросы</p>);
//   // return <p>Идут запросы</p>;
// }

// if (isPending) {
//   //данных нет
//   //status ==="pending"
//   console.log("==> isPending", status, fetchStatus);
//   statuses.push(<p key="isPending">Данные ожидаются</p>);
//   // return <p>Данные ожидаются</p>;
// }

// if (statuses.length) {
//   return statuses;
// }
