import { Skeleton } from "../ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <div className="flex gap-3 flex-row">
      <Skeleton className="h-[4rem]  w-full " />
      <div className="flex flex-col gap-2 min-w-[80%] ">
        <Skeleton className="h-[1rem] w-[50%]" />
        <Skeleton className="h-[1rem] w-[80%]" />
        <Skeleton className="h-[1rem] w-[60%]" />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
