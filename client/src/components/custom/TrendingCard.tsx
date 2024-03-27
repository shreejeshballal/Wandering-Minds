import { useNavigateHook } from "@/hooks/useNavigationHook";
import { UserLabelCard } from "./UserLabelCard";
import { TrendingBlog } from "@/lib/interfaces";

interface Props {
  data: TrendingBlog;
  index: number;
}

export const TrendingCard = ({ data, index }: Props) => {
  const { navigateTo } = useNavigateHook();

  return (
    <div
      className="w-full h-fit flex flex-row gap-3 cursor-pointer smooth-transition hover:bg-grey-100 px-2 py-3   "
      onClick={() => navigateTo(`/blog/${data._id}`)}
    >
      <div className="flex-[0.3] flex justify-center font-bold text-grey-400 text-5xl ">
        0{index + 1}
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <UserLabelCard
          username={data.username}
          publishedDate={data.createdAt}
          userImage={data.userImage}
        />
        <h3 className="line-clamp-2  font-semibold text-xl ">{data.title}</h3>
      </div>
    </div>
  );
};
