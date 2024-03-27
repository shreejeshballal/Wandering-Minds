import { Skeleton } from "../ui/skeleton";

const BlogPostCardSkeleton = () => {
  return (
    <div className="flex w-full flex-row">
      <div className="flex flex-col gap-2 min-w-[80%] ">
        <Skeleton className="h-[1.5rem] w-[50%]" />
        <Skeleton className="h-[1.5rem] w-[90%]" />
        <Skeleton className="h-[1.5rem] w-[80%]" />
      </div>
      <Skeleton className="h-[5.6rem]  w-full " />
    </div>
  );
};

export default BlogPostCardSkeleton;
