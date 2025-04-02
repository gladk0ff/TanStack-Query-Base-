import classNames from "classnames";
import { useCreateUser } from "../hooks/useCreateUser";

export const UserForm = () => {
  const { mutate, isPending, isError, error } = useCreateUser();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    mutate(
      {
        id: crypto.randomUUID(),
        age: Number(formData.get("age")),
        firstName: formData.get("firstName") as string,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

// {isError ? <div> {error.message}</div> : null}

// const { mutate, isPending, isError, error } = useCreateUser();

// const queryClient = useQueryClient();

// {
//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: [QUERY_KEYS.users],
//     });
//     // queryClient.invalidateQueries(usersQueries.getUsersWithPagination()),
//   },
// }
