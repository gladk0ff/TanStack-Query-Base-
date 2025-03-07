import { useInfiniteQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { useCallback, useRef } from "react";
import { usersQueries } from "../queries/users";
import { UserListItem } from "./common/UserListItem";

export const UserListInfinity = () => {
  const {
    data: users,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    ...usersQueries.getUsersInfinity(),
  });

  const cursorRef = useIntersection(fetchNextPage);

  const btnClass = "px-2 py-1  rounded cursor-pointer ";
  const btnAcions = btnClass + "bg-blue-200 hover:bg-blue-400";

  return (
    <section>
      <div className="flex gap-2 justify-between align-middle">
        <button className={btnAcions}>Добавить котика</button>
      </div>

      <ul
        className={classNames(
          "bacground-color-gray flex flex-col  gap-2 mt-4",
          isFetching && "opacity-50",
          "overflow-y-auto max-h-70"
        )}
      >
        {users?.map((user) => (
          <li key={user.id}>
            <UserListItem data={user} />
          </li>
        ))}
        <li ref={cursorRef}>
          {!hasNextPage && <span>Все загружено</span>}
          {isFetchingNextPage && <span>Загрузка ...</span>}
        </li>
      </ul>
    </section>
  );
};

function useIntersection(onIntersect: () => void) {
  const unsubscriber = useRef(() => {});
  return useCallback((el: HTMLElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });
    if (el) {
      observer.observe(el);
      unsubscriber.current = () => observer.disconnect();
    } else {
      observer.disconnect();
      unsubscriber.current();
    }
  }, []);
}
