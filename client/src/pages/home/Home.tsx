import { Separator } from "@/components/ui/separator";
import Layout from "@/layout/Layout";
import { IoMdTrendingUp } from "react-icons/io";
import { TrendingCard } from "../../components/custom/TrendingCard";
import BlogPostCard from "@/components/custom/BlogPostCard";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/constants";
import BlogPostCardSkeleton from "@/components/custom/BlogPostCardSkeleton";
import UserCardSkeleton from "@/components/custom/UserCardSkeleton";
import { BlogPostProps, TrendingBlog } from "@/lib/interfaces";
import { LoadingSpinner } from "@/components/ui/spinner";

export const Home = () => {
  const { makeRequest } = useApi();

  const [latestBlogs, setLatestBlogs] = useState<BlogPostProps[]>([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loading, setLoading] = useState({ loading: true, type: "initial" });
  const [totalBlogCount, setTotalBlogCount] = useState(0);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (skip = 0, cat = "all") => {
    setLoading({ loading: true, type: skip === 0 ? "initial" : "pagination" });
    const url =
      cat === "all"
        ? `/get-home-blogs?skip=${skip}`
        : `/get-home-blogs?skip=${skip}&category=${cat}`;
    const res = await makeRequest("GET", url);
    if (res) {
      if (skip > 0)
        setLatestBlogs((prev: BlogPostProps[]) => {
          return [...prev, ...res.data.latestBlogs];
        });
      else setLatestBlogs(res.data.latestBlogs);
      setTrendingBlogs(res.data.trendingBlogs);
      setTotalBlogCount(res.data.latestBlogCount);
    }
    setLoading({ loading: false, type: skip === 0 ? "initial" : "pagination" });
  };

  return (
    <Layout>
      <div className="flex flex-col-reverse md:flex-row w-full ">
        <article className="flex-1">
          <header className="py-3">
            <h1 className="text-base  px-4 py-2 border-b-2 border-b-dark w-fit">
              {category}
            </h1>
            <Separator />
          </header>
          <div className="flex flex-col gap-2">
            {loading.type === "initial" && loading.loading === true ? (
              <BlogPostCardSkeleton />
            ) : latestBlogs && latestBlogs.length === 0 ? (
              <div className="text-center mt-10">No blogs found!</div>
            ) : (
              latestBlogs.map((data: BlogPostProps, index: number) => (
                <BlogPostCard key={index} data={data} />
              ))
            )}
          </div>
          {totalBlogCount - latestBlogs.length > 0 && (
            <div
              className="w-full text-center flex items-center justify-center py-3 px-3 bg-grey-100 my-5 hover:bg-grey-200 smooth-transition  cursor-pointer"
              onClick={() => fetchBlogs(10)}
            >
              {loading.type === "pagination" && loading.loading ? (
                <LoadingSpinner />
              ) : (
                "Load more"
              )}
            </div>
          )}
        </article>
        <Separator orientation="vertical" className="mx-4" />

        <article className="flex-[0.6] flex flex-col gap-5">
          <div className="pt-5">
            <h2 className="text-base pb-4 font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-x-4">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    fetchBlogs(0, cat.toLowerCase());
                  }}
                  className={cn(
                    "mb-2 px-3 py-2 rounded-[0.5rem] cursor-pointer hover:bg-ascent-100 hover:text-light smooth-transition bg-lightgrey font-normal ",
                    category === cat && "bg-ascent-100 text-white"
                  )}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h2 className="text-base pb-4 font-semibold flex items-center gap-1">
              Trending <IoMdTrendingUp />
            </h2>
            <div className="flex flex-col ">
              {loading.type === "initial" && loading.loading === true ? (
                <UserCardSkeleton />
              ) : trendingBlogs && trendingBlogs.length === 0 ? (
                <div className="text-center mt-10">No trending blogs!</div>
              ) : (
                trendingBlogs.map((data: TrendingBlog, index: number) => (
                  <TrendingCard data={data} key={index} index={index} />
                ))
              )}
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};
