import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import Layout from "@/layout/Layout";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import GoogleSignIn from "@/components/custom/GoogleSignIn";
import { UserRegisterValidation } from "@/lib/validations/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigateHook } from "@/hooks/useNavigationHook";
import { LoadingSpinner } from "@/components/ui/spinner";
import { isNullOrUndefined } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import useApi from "@/hooks/useApi";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const Register = () => {
  const { setUser, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { navigateTo } = useNavigateHook();
  const { makeRequest, apiLoading } = useApi();
  const form = useForm({
    resolver: zodResolver(UserRegisterValidation),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserRegisterValidation>) => {
    const response = await makeRequest("post", "/auth/register", values);
    if (!isNullOrUndefined(response)) {
      form.reset();
      toast.success("Registration successful");
      setUser(response.result.user);
      navigateTo("/", { replace: true });
    }
  };

  return !isNullOrUndefined(user) ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Layout>
      <div className=" flex flex-col gap-10 items-center text-center justify-center h-full pt-16 max-w-sm mx-auto">
        <h1 className="text-3xl font-medium">Join Us Today</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-3  w-full"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex bg-lightgrey  items-center rounded-lg  hover:bg-hovergrey focus-within:bg-hovergrey smooth-transition py-[0.5rem] px-2">
                      <FiUser className="text-2xl  ml-2  text-grey-400" />
                      <Input
                        placeholder="Full Name"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent autofill:bg-transparent   "
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex bg-lightgrey  items-center rounded-lg  hover:bg-hovergrey focus-within:bg-hovergrey smooth-transition py-[0.5rem] px-2">
                      <MdOutlineEmail className="text-2xl  ml-2  text-grey-400" />
                      <Input
                        placeholder="Email"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent autofill:bg-transparent   "
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex bg-lightgrey focus-within:bg-hovergrey   items-center rounded-lg hover:bg-hovergrey  smooth-transition py-[0.5rem] px-2">
                      <RiLockPasswordLine className="text-2xl  ml-2  text-grey-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent  autofill:bg-transparent "
                        {...field}
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setShowPassword((prev: boolean) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <FaEye className="text-xl  mr-2  text-grey-400" />
                        ) : (
                          <FaEyeSlash className="text-xl  mr-2  text-grey-400" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex bg-lightgrey focus-within:bg-hovergrey   items-center rounded-lg hover:bg-hovergrey  smooth-transition py-[0.5rem] px-2">
                      <RiLockPasswordLine className="text-2xl  ml-2  text-grey-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-transparent  autofill:bg-transparent "
                        {...field}
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setShowPassword((prev: boolean) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <FaEye className="text-xl  mr-2  text-grey-400" />
                        ) : (
                          <FaEyeSlash className="text-xl  mr-2  text-grey-400" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-10 tracking-wider rounded-[2rem] w-fit px-20 mx-auto"
            >
              {apiLoading ? <LoadingSpinner /> : "REGISTER"}
            </Button>
          </form>
        </Form>
        <Separator />

        <GoogleSignIn />
        <p
          className="text-grey-700 text-sm -mt-5"
          onClick={() => {
            navigateTo("/auth/login");
          }}
        >
          Already have an account?{" "}
          <span className="underline text-dark cursor-pointer ">Login</span>
        </p>
      </div>
    </Layout>
  );
};
