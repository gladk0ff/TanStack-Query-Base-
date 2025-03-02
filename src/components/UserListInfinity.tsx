import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers, IUserDto } from "../api/users";
import classNames from "classnames";
import { useCallback, useRef } from "react";

export const UserListInfinity = () => {
  // сделать запрос на показ всех и пример посмотре с isFetching
  const {
    data: users,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["users-infinity"],
    queryFn: ({ signal, pageParam }) =>
      getUsers({ page: pageParam }, { signal }),
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.map((page) => page.data).flat(),
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
          "overflow-y-auto max-h-80"
        )}
      >
        {users?.map((user) => (
          <li key={user.id}>
            <UserListItem data={user} />
          </li>
        ))}
        <div ref={cursorRef}>
          {!hasNextPage && <span>Все загружено</span>}
          {isFetchingNextPage && <span>Загрузка ...</span>}
        </div>
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

function useIntersection(onIntersect: () => void) {
  const unsubscriber = useRef(() => {});
  return useCallback((el: HTMLDivElement | null) => {
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
