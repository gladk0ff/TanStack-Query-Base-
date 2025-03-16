import { IUserDto } from "../../queries/users";
import DeleteIcon from "../../images/delete-svgrepo-com.svg";
import classNames from "classnames";

export const UserListItem = ({
  data,
  onDelete,
  isDeletePending,
}: {
  data: IUserDto;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
}) => {
  return (
    <div className="flex gap-2 border border-blue-100 rounded p-1">
      <span>{data.age}</span>
      <span>{data.firstName}</span>
      <button
        disabled={isDeletePending}
        className="w-6  ml-auto opacity-40 hover:opacity-80 cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed"
        onClick={() => onDelete(data.id)}
      >
        <img src={DeleteIcon} />
      </button>
    </div>
  );
};
