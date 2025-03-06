import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS, usersQueries } from "../queries/users";

export const UserForm = ({ refetch }: { refetch?(): void }) => {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    // mutationKey не обязателене если вы не хотите узнать статус мутации из другого компонента
    mutationFn: usersQueries.createUser,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    //cинхронная не выбрасывает ошибки
    createUserMutation.mutateAsync(
      {
        id: crypto.randomUUID(),
        age: Number(formData.get("age")),
        firstName: formData.get("firstName") as string,
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.users],
          }),
        // queryClient.invalidateQueries(usersQueries.getUsersWithPagination()),
      }
    );
    // createUserMutation.mutateAsync()
    e.currentTarget.reset();
  };
  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
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
      <button className="px-2 py-1  rounded cursor-pointer bg-green-200 hover:bg-green-400">
        Добавить
      </button>
    </form>
  );
};
