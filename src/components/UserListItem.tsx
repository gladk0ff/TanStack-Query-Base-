import { IUserDto } from "../queries/users";
import DeleteIcon from "../images/delete.svg";
import EditIcon from "../images/edit.svg";
import CheckIcon from "../images/check.svg";
import { useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";

export const UserListItem = ({
  data,
  onDelete,
  isDeletePending,
  currentPage,
}: {
  data: IUserDto;
  currentPage: number;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
}) => {
  const [isEditing, edit] = useState(false);
  const [user, setUser] = useState(data);

  const { mutate } = useUpdateUser(currentPage);

  const handleChangeAge = (e) => {
    setUser({
      ...user,
      age: e.target.value,
    });
  };

  const handleChangeName = (e) => {
    setUser({
      ...user,
      firstName: e.target.value,
    });
  };

  const applyChanges = () => {
    mutate(user);
    edit(false);
  };

  return (
    <div className="flex gap-2 border border-blue-100 rounded p-1">
      <input
        required
        name="age"
        className="p-2 rounded border border-amber-500 read-only:border-0 focus-within:border-amber-500"
        type="number"
        placeholder="Возраст"
        value={user.age}
        onChange={handleChangeAge}
        readOnly={!isEditing}
      />
      <input
        required
        name="firstName"
        className="p-2 rounded border border-amber-500 read-only:border-0"
        type="text"
        placeholder="Имя"
        value={user.firstName}
        onChange={handleChangeName}
        readOnly={!isEditing}
      />

      <div className="ml-auto flex items-center gap-6">
        <button
          className="w-6  ml-auto opacity-40 hover:opacity-80 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            isEditing ? applyChanges() : edit(!isEditing);
          }}
        >
          <img src={isEditing ? CheckIcon : EditIcon} />
        </button>
        {}
        <button
          disabled={isDeletePending || isEditing}
          className="w-6   opacity-40 hover:opacity-80 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            onDelete(user.id);
          }}
        >
          <img src={DeleteIcon} />
        </button>
      </div>
    </div>
  );
};
