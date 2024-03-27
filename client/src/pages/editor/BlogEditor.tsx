/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import Layout from "@/layout/Layout";
import { FaImage } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@/context/EditorContext";
import Fields from "./Fields";
import TextEditor from "./FieldAdder";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { imageFileTypes } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";

interface BlogContentItem {
  optionType: string;
  value: string;
  id: string;
}

const BlogEditor = () => {
  const { blog, setBlog } = useEditor();

  // Function to resize the textarea based on the content
  const blogTitleRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const resizeTextArea = () => {
      if (blogTitleRef.current) {
        blogTitleRef.current.style.height = "auto";
        blogTitleRef.current.style.height =
          blogTitleRef.current.scrollHeight + "px";
      }
    };
    resizeTextArea();
    return () => {
      window.removeEventListener("resize", resizeTextArea);
    };
  }, [blog.title]);

  // Function to handle the change in the input fields
  const handleInputFieldChange = async (e: any, property: string) => {
    if (property === "banner") {
      if (e.target.files === null) {
        toast.error("No file selected");
        return;
      }
      if (!imageFileTypes.includes(e.target.files[0].type)) {
        toast.error("Invalid file type");
        return;
      }
      const file = e.target.files[0];
      setBlog({ ...blog, banner: file });
    } else if (property === "title") {
      setBlog({ ...blog, title: e.target.value });
    }
  };

  return (
    <Layout>
      <section className="pt-5">
        <div className="mx-auto max-w-[900px] w-full">
          <div className="relative aspect-video flex items-center justify-center text-3xl  bg-lightgrey smooth-transition  border-4 border-gray-100">
            {blog.banner === "" ? (
              <p className="flex items-center justify-center text-grey-500 gap-3 ">
                <FaImage className="text-3xl" />
                Upload Banner
              </p>
            ) : (
              <img
                src={getImageUrl(blog.banner)}
                className=" aspect-video object-cover w-full h-full"
              />
            )}
            <Input
              type="file"
              accept={imageFileTypes.join(",")}
              className="opacity-0 absolute h-full w-full"
              onChange={(e) => handleInputFieldChange(e, "banner")}
            />
          </div>

          <div className="mt-10">
            <Textarea
              maxLength={100}
              value={blog.title}
              ref={blogTitleRef}
              rows={1}
              placeholder="Blog Title"
              className=" text-4xl resize-none font-semibold font-monts p-3"
              onChange={(e) => handleInputFieldChange(e, "title")}
            />
          </div>
          <Separator className="my-10" />
          <div className="min-h-[20rem]  flex flex-col w-full gap-4">
            {blog.content.map((item, index) => {
              return (
                <Fields
                  key={index}
                  item={item as BlogContentItem}
                  index={index as number}
                />
              );
            })}
            <TextEditor />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogEditor;
