import { UserLabelCard } from "./UserLabelCard";
import { Badge } from "../ui/badge";
import { FaHeart } from "react-icons/fa6";
import { useNavigateHook } from "@/hooks/useNavigationHook";
import { BlogPostProps } from "@/lib/interfaces";

interface Props {
  data: BlogPostProps;
}

const BlogPostCard = ({ data }: Props) => {
  const { navigateTo } = useNavigateHook();
  return (
    <div
      className="flex sm:flex-row w-full h-fit py-3  cursor-pointer rounded-md"
      onClick={() => navigateTo(`/blog/${data._id}`)}
    >
      <div className="flex-1 flex flex-col gap-3">
        <UserLabelCard
          userImage={data.userImage}
          username={data.username}
          publishedDate={data.createdAt}
        />
        <div>
          <h2 className="text-2xl font-semibold line-clamp-1">{data.title}</h2>
          <p className="text-grey-800 mt-1">{data.des}</p>
        </div>
        <div className="flex flex-row gap-4 items-center justify-start ">
          <Badge
            variant="outline"
            className="rounded-[1rem] font-normal bg-lightgrey text-sm font-monts capitalize "
          >
            {data.tags[0]}
          </Badge>
          <div className="flex justify-center gap-2">
            <FaHeart className=" text-lg fill-grey-400" />
            <span className="text-sm text-grey-500">
              {data.activity.total_likes}
            </span>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <img
          src={data.banner}
          alt="Blog Post Image"
          className=" aspect-video w-32 sm:w-48 object-cover "
        />
      </div>
    </div>
  );
};

export default BlogPostCard;
