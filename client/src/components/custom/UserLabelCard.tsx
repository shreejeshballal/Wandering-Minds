import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  userImage: string;
  username: string;
  publishedDate: string;
}

export const UserLabelCard = ({
  userImage,
  username,
  publishedDate,
}: Props) => {
  return (
    <div className="flex  gap-2 items-center text-sm  sm:text-base">
      <Avatar className="h-6 w-6">
        <AvatarImage src={userImage} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h6 className="text-grey-800">@{username}</h6>
      <h6 className="text-grey-500 ">{formatDate(publishedDate)}</h6>
    </div>
  );
};
