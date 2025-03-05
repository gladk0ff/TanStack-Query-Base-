import { useMutation } from "@tanstack/react-query";
import { usersQueries } from "../queries/users";

export const UserForm = () => {
  useMutation({
    // mutationKey не обязателене если вы не хотите узнать статус мутации из другого компонента
    mutationFn: usersQueries.createUser,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.keys());

    e.currentTarget.reset();
  };
  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <input
        className="p-2 rounded border border-amber-500"
        type="text"
        placeholder="Имя"
      />
      <input
        className="p-2 rounded border border-amber-500"
        type="number"
        placeholder="Возраст"
      />
      <button className="px-2 py-1  rounded cursor-pointer bg-green-200 hover:bg-green-400">
        Добавить пользователя
      </button>
    </form>
  );
};
