import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, usersQueries } from "../queries/users";
import classNames from "classnames";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey не обязателене если вы не хотите узнать статус мутации из другого компонента
    mutationFn: usersQueries.createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.users],
      }),
    onError: (error) => {
      // Обработка ошибки в мутации
      console.log("Mutation error:", error);
    },
    onSettled: () => {
      console.log("onSettled");
    },
  });
};

export const UserForm = ({ refetch }: { refetch?(): void }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useCreateUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //cинхронная не выбрасывает ошибки
    mutate(
      {
        id: crypto.randomUUID(),
        age: Number(formData.get("age")),
        firstName: formData.get("firstName") as string,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.users],
          });
          // queryClient.invalidateQueries(usersQueries.getUsersWithPagination()),
        },
        onError: (error) => {
          // локальная обработка ошибки в компоненте
          console.log("mutate local error:", error);
        },
      }
    );

    e.currentTarget.reset();
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      {isError ? <div> {error.message}</div> : null}
      <input
        required
        name="firstName"
        className="p-2 rounded border border-amber-500"
        type="text"
        placeholder="Имя"
      />
      <input
        required
        name="age"
        className="p-2 rounded border border-amber-500"
        type="number"
        placeholder="Возраст"
      />
      <button
        disabled={isPending}
        className={classNames(
          "px-2 py-1 rounded cursor-pointer bg-green-200 hover:bg-green-400",
          isPending && "opacity-50"
        )}
      >
        Добавить
      </button>
    </form>
  );
};
