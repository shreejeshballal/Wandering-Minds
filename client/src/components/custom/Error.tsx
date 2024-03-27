import errorpng from "@/assets/404.png";
import Layout from "@/layout/Layout";
import { Button } from "../ui/button";
import { useNavigateHook } from "@/hooks/useNavigationHook";
const Error = () => {
  const { navigateTo } = useNavigateHook();
  return (
    <Layout>
      <div className="h-full w-full flex flex-col items-center justify-center gap-3">
        <img
          src={errorpng}
          alt="404"
          className="object-cover h-[20rem] mt-20"
        />
        <h1 className="font-medium  text-3xl ">Page not found!</h1>
        <Button
          onClick={() => navigateTo("/", { replace: true })}
          className=" mt-3"
        >
          Go Back Home
        </Button>
      </div>
    </Layout>
  );
};

export default Error;
