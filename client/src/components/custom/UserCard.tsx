import { useNavigateHook } from "@/hooks/useNavigationHook";
import { UserProps } from "@/lib/interfaces";

interface Props {
  data: UserProps;
}

const UserCard = ({ data }: Props) => {
  const { navigateTo } = useNavigateHook();
  return (
    <div
      className="w-full flex gap-1  cursor-pointer hover:bg-grey-100 p-3 rounded-md smooth-transition"
      onClick={() => navigateTo(`/profile/${data._id}`)}
    >
      <div className="h-full">
        <img
          src={data.userImage}
          alt="User Image"
          className="h-16 w-16 rounded-[100%]"
        />
      </div>
      <div className="flex flex-col gap-2 h-full">
        <h3 className="font-medium text-xl capitalize">{data.fullname}</h3>
        <h3 className="font-xl text-grey-400">@{data.username}</h3>
      </div>
    </div>
  );
};

export default UserCard;
