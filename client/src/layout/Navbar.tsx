import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { checkEmptyfields, cn } from "../lib/utils";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigateHook } from "@/hooks/useNavigationHook";
import { useEditor } from "@/context/EditorContext";
import { toast } from "sonner";

export const Navbar = () => {
  const { navigateTo } = useNavigateHook();
  const { user } = useAuth();
  const { pathname } = useLocation();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const handleSearch = (value: string) => {
    if (value && pathname !== "/search") {
      navigateTo(`/search?q=${value}`);
      console.log("searching");
    } else {
      const newParams = new URLSearchParams({ q: value });
      setSearchParams(newParams);
    }
  };

  const { blog, setEditorState, editorState } = useEditor();
  const isEditor = pathname === "/editor";

  const handlePublish = () => {
    console.log(blog);
    if (blog.title.length <= 0) {
      return toast.warning("Title is required");
    }
    if (blog.banner === "") {
      return toast.warning("Banner is required");
    }
    if (blog.content.length <= 0) {
      return toast.warning("Content is required");
    }
    if (checkEmptyfields(blog.content)) {
      return toast.warning("Please delete empty fields or fill them up");
    }
    setEditorState("publish");
  };

  return (
    <nav className="h-[5rem] flex w-screen items-center border-lightgrey  border-b-[1px] px-5 fixed z-[50] bg-light">
      <div className="2xl:container flex items-center w-full justify-between">
        <div className="flex  items-center w-fit">
          <Link to="/" className="w-9  ">
            <img src="/logo.png" alt="logo" className="w-9" />
          </Link>
          {isEditor ? (
            editorState === "editor" ? (
              <p className="ml-5 text-2xl text-ellipsis hidden sm:block sm:max-w-[18rem] md:max-w-[30rem] lg:max-w-[45rem] h-fit overflow-hidden">
                {blog.title.length > 0 ? blog.title : "New blog"}
              </p>
            ) : null
          ) : (
            <div
              className={cn(
                "absolute  z-[50] top-[4.5rem] bg-light py-3  px-5  w-full sm:w-fit left-0 mx-auto right-0  sm:static   border-lightgrey border-b-[1px] sm:border-0",
                showSearchBar ? "block" : "hidden ",
                "sm:block"
              )}
            >
              <div className="flex bg-lightgrey rounded-[2rem] focus-within:bg-hovergrey  items-center hover:bg-hovergrey  smooth-transition py-[0.5rem] px-2">
                <IoIosSearch className="text-2xl  ml-2 " />
                <Input
                  placeholder="Search"
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  value={query === null ? "" : query}
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent   "
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!isEditor && (
            <Button
              variant="secondary"
              size="icon"
              className=" sm:hidden rounded-full"
              onClick={() => {
                setShowSearchBar(!showSearchBar);
                if (pathname !== "/search") navigateTo("/search");
              }}
            >
              <IoIosSearch className="text-2xl" />
            </Button>
          )}
          {!isEditor ? (
            <Button
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => navigateTo("/editor")}
            >
              <FaRegPenToSquare />
              Write
            </Button>
          ) : (
            editorState === "editor" && (
              <Button
                variant="default"
                className=" text-white rounded-full "
                onClick={() => handlePublish()}
              >
                Publish
              </Button>
            )
          )}

          {!user ? (
            <Button size="default" onClick={() => navigateTo("/auth/login")}>
              Login
            </Button>
          ) : (
            // !isEditor && (
            <div className="flex items-center gap-3 cursor-pointer">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full text-2xl"
              >
                <IoMdNotificationsOutline />
              </Button>
              <NavDropdown username="herbiemaster" />
            </div>
            // )
          )}
        </div>
      </div>
    </nav>
  );
};

const NavDropdown = ({ username }: { username: string }) => {
  const navDropdownItems = [
    { label: "Profile", href: `/profile/${username}` },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings", href: "/settings" },
  ];
  const { user, logout } = useAuth();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.profile_img} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 mt-4 ">
        <DropdownMenuGroup>
          {navDropdownItems.map((item) => {
            return (
              <Link to={item.href} key={item.label}>
                <DropdownMenuItem>{item.label}</DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-col items-start gap-1 right "
          onClick={logout}
        >
          <div className="font-semibold text-lg">Logout</div>
          <h6 className="text-textgrey">@{user?.username}</h6>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
