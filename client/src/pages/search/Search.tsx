import BlogPostCard from "@/components/custom/BlogPostCard";
import BlogPostCardSkeleton from "@/components/custom/BlogPostCardSkeleton";
import UserCard from "@/components/custom/UserCard";
import UserCardSkeleton from "@/components/custom/UserCardSkeleton";
import { Separator } from "@/components/ui/separator";
import useApi from "@/hooks/useApi";
import useDebounce from "@/hooks/useDebounce";
import useWindowSize from "@/hooks/useWindowSize";
import Layout from "@/layout/Layout";
import { BlogPostProps, UserProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const debouncedSearchTerm = useDebounce({ value: query, delay: 500 });

  const isMobile = useWindowSize().width < 769;
  const { makeRequest } = useApi();

  const [activeTab, setActiveTab] = useState("blogs");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    users: [],
    blogs: [],
  });

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setResults({ users: [], blogs: [] });
    } else {
      fetchUsersAndBlogs(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchUsersAndBlogs = async (queryString: string) => {
    setLoading(true);
    const res = await makeRequest("get", `/search?q=${queryString}`);
    if (res) {
      setResults(res.data);
    }
    setLoading(false);
  };

  console.log(results);
  return (
    <Layout>
      <h1 className="text-2xl font-medium mt-5 sm:mt-10 text-ellipsis  overflow-hidden">
        {query === "" ? "Search Results" : `Search Results for "${query}"`}
      </h1>
      <div className="flex flex-col md:flex-row w-full  mt-2 sm:mt-5">
        {isMobile ? (
          <article className="flex flex-col gap-2">
            <header className="py-3">
              <div className="flex flex-row">
                <h1
                  onClick={() => setActiveTab("blogs")}
                  className={cn(
                    "text-base  px-4 py-2  w-fit",
                    activeTab === "blogs" &&
                      "border-b-2 border-b-dark font-medium"
                  )}
                >
                  Blogs
                </h1>
                <h1
                  onClick={() => setActiveTab("users")}
                  className={cn(
                    "text-base  px-4 py-2  w-fit",
                    activeTab === "users" &&
                      "border-b-2 border-b-dark font-medium"
                  )}
                >
                  Users
                </h1>
              </div>
              <Separator />
            </header>
            <div className="flex flex-col gap-2 w-full min-h-[10rem]">
              {activeTab === "blogs" ? (
                loading ? (
                  <BlogPostCardSkeleton />
                ) : results.blogs.length === 0 ? (
                  <p className="text-center pt-20 text-grey-500">
                    No Blogs found!
                  </p>
                ) : (
                  results.blogs.map((blog: BlogPostProps, index: number) => (
                    <BlogPostCard data={blog} key={index} />
                  ))
                )
              ) : loading ? (
                <UserCardSkeleton />
              ) : results.users.length === 0 ? (
                <p className="text-center pt-20 text-grey-500">
                  No Users found!
                </p>
              ) : (
                results.users.map((user: UserProps, index: number) => (
                  <UserCard key={index} data={user} />
                ))
              )}
            </div>
          </article>
        ) : (
          <>
            <article className="flex-1 flex flex-col gap-2">
              <header className="py-3">
                <h1 className="text-base  px-4 py-2 border-b-2 border-b-dark w-fit">
                  Blogs
                </h1>
                <Separator />
              </header>
              <div className="flex flex-col gap-2 ">
                {loading ? (
                  <BlogPostCardSkeleton />
                ) : results.blogs.length === 0 ? (
                  <p className="text-center pt-20 text-grey-500">
                    No Blogs found!
                  </p>
                ) : (
                  results.blogs.map((blog: BlogPostProps, index: number) => (
                    <BlogPostCard data={blog} key={index} />
                  ))
                )}
              </div>
            </article>
            <Separator orientation="vertical" className="mx-4 min-h-[20rem]" />
            <article className="flex-[0.4] flex flex-col gap-2">
              <header className="py-3">
                <h1 className="text-base  px-4 py-2 border-b-2 border-b-dark w-fit">
                  Users
                </h1>
                <Separator />
              </header>
              <div className="flex flex-col gap-2">
                {loading ? (
                  <UserCardSkeleton />
                ) : results.users.length === 0 ? (
                  <p className="text-center pt-20  text-grey-500">
                    No Users found!
                  </p>
                ) : (
                  results.users.map((user: UserProps, index: number) => (
                    <UserCard key={index} data={user} />
                  ))
                )}
              </div>
            </article>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Search;
