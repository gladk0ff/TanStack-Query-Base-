export const UserForm = () => {
  return (
    <form className="flex gap-4">
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
