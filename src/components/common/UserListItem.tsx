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
    <div
      className={classNames(
        "flex gap-2 border border-blue-100 rounded p-1",
        isDeletePending && "opacity-10"
      )}
    >
      <span>{data.age}</span>
      <span>{data.firstName}</span>
      <img
        onClick={() => onDelete(data.id)}
        className="w-6  ml-auto opacity-10 hover:opacity-60 cursor-pointer"
        src={DeleteIcon}
      />
    </div>
  );
};
