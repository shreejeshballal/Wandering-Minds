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
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "../lib/utils";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigateHook } from "@/hooks/useNavigationHook";

export const Navbar = () => {
  const { navigateTo } = useNavigateHook();
  const { user } = useAuth();

  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <nav className="h-[5rem] flex w-full items-center border-lightgrey  border-b-[1px] px-5 fixed z-[50] bg-light">
      <div className="2xl:container flex items-center w-full justify-between">
        <div className="flex  items-center w-fit">
          <Link to="/" className="w-9  ">
            <img src="/logo.png" alt="logo" className="w-9" />
          </Link>
          <div
            className={cn(
              "absolute  z-[50] top-[5rem] S px-5  w-full sm:w-fit left-0 mx-auto right-0  sm:static   border-lightgrey border-b-[1px] sm:border-0",
              showSearchBar ? "block" : "hidden ",
              "sm:block"
            )}
          >
            <div className="flex bg-lightgrey rounded-[2rem] focus-within:bg-hovergrey  items-center hover:bg-hovergrey  smooth-transition py-[0.5rem] px-2">
              <IoIosSearch className="text-2xl  ml-2 " />
              <Input
                placeholder="Search"
                className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent   "
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            className=" sm:hidden rounded-full"
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <IoIosSearch className="text-2xl" />
          </Button>
          <Button
            variant="secondary"
            className="hidden sm:flex items-center gap-1"
            onClick={() => navigateTo("/about")}
          >
            <FaRegPenToSquare />
            Write
          </Button>

          {!user ? (
            <Button size="default" onClick={() => navigateTo("/auth/login")}>
              Login
            </Button>
          ) : (
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.profile_img} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2 " align="start">
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
