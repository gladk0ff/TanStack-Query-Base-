import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import classNames from "classnames";
import { usersQueries } from "../../queries/users";
import { UserListItem } from "../common/UserListItem";
import { UserForm } from "../UserForm/UserForm";
import { useDeleteUserFromPage } from "./useDeleteUser";

export const UserList = () => {
  const [page, setPage] = useState(1);
  const [isLoadAll, setLoadAll] = useState(false);

  const {
    data: users,
    error,
    isLoading,
    isPlaceholderData,
    // refetch,
  } = useQuery({
    ...usersQueries.getUsersWithPagination(page, !isLoadAll),
  });

  const { data: usersAll } = useQuery({
    ...usersQueries.getUsersAll(isLoadAll),
  });

  const { isPending, onDelete } = useDeleteUserFromPage(page);

  const btnClass = "px-2 py-1  rounded cursor-pointer ";
  const btnAcions = btnClass + "bg-blue-200 hover:bg-blue-400";
  const btnPg = btnClass + "bg-gray-200 hover:bg-gray-400 ";
  const btnDis = "disabled:pointer-events-none disabled:opacity-20";

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const usersData = isLoadAll ? usersAll : users?.data;

  console.log("isPending", isPending);

  return (
    <section>
      {/* <UserForm refetch={refetch} /> */}
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
            <UserListItem
              data={user}
              onDelete={onDelete}
              isDeletePending={isPending}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
