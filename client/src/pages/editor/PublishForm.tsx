/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useEditor } from "@/context/EditorContext";
import useApi from "@/hooks/useApi";
import Layout from "@/layout/Layout";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "sonner";

interface ContentObject {
  optionType: string;
  value: string;
  id: string;
}

const PublishForm = () => {
  const { blog, setEditorState, setBlog } = useEditor();
  const { makeRequest, uploadImageToS3 } = useApi();

  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState<string>("");

  const handleInputChange = (e: any, property: string) => {
    if (property === "des") {
      setBlog({ ...blog, des: e.target.value });
    } else if (property === "tags") {
      setTag(e.target.value);
    }
  };

  const handleRemoveTag = (index: number) => {
    const newTags = [...blog.tags];
    newTags.splice(index, 1);
    setBlog({ ...blog, tags: newTags });
  };

  const handleAddTag = (e: any) => {
    if (e.key === "Enter") {
      if (blog.tags.length >= 8) {
        toast.warning("You can only add 8 tags");
        return;
      }
      const newTag = tag.trim().toLowerCase();
      if (blog.tags.includes(newTag)) {
        toast.warning("Tag already exists");
        return;
      }
      setBlog({ ...blog, tags: [...blog.tags, newTag] });
      setTag("");
    }
  };

  const handlePublish = async () => {
    if (blog.title.length <= 0) {
      return toast.error("Title is required");
    }
    if (blog.des.length <= 0) {
      return toast.error("Description is required");
    }
    if (blog.tags.length < 3) {
      return toast.error("Minimum 3 tags are required");
    }

    let finalBlogObject = blog;
    setLoading(true);
    const bannerUrl = await uploadImageToS3(blog.banner);
    finalBlogObject = { ...finalBlogObject, banner: bannerUrl };

    const newContentArray: Array<ContentObject> = (
      blog.content as Array<ContentObject>
    ).map((content) => {
      if (content.optionType === "image") {
        uploadImageToS3(content.value).then((url) => {
          content.value = url;
        });
      }
      return content;
    });
    finalBlogObject = {
      ...finalBlogObject,
      content: newContentArray,
    };

    const response = await makeRequest("post", "/create-blog", {
      ...finalBlogObject,
      draft: false,
    });

    if (response) {
      toast.success("Blog published successfully");
      setEditorState("editor");
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <header className=" w-full relative flex items-center mt-5">
        <h1 className="text-xl text-grey-500 ">Preview</h1>
        <IoMdClose
          className="absolute right-0 text-xl smooth-transition hover:text-grey-500 cursor-pointer  "
          onClick={() => setEditorState("editor")}
        />
      </header>
      <div className="flex flex-col md:flex-row gap-5 my-5">
        <article className="flex flex-col gap-3 min-w-[50%]">
          <div className="aspect-video w-full  rounded-lg overflow-hidden">
            <img
              src={blog.banner}
              alt="banner"
              className="aspect-video object-cover h-full w-full"
            />
          </div>
          <h2 className="font-medium text-3xl ">{blog.title}</h2>
          <p className="text-grey-800 break-words">{blog.des}</p>
        </article>
        <article className="flex gap-5 flex-col w-full ">
          <div>
            <h5 className="font-normal text-base text-grey-500  ">Title</h5>
            <p className="bg-grey-100 text-grey-700 text-base mt-1 p-3 rounded-md">
              {blog.title}
            </p>
          </div>
          <div>
            <h5 className="font-normal text-base text-grey-500  ">
              Description
            </h5>
            <Textarea
              maxLength={200}
              className="bg-grey-100 text-grey-700 text-base mt-1 p-3 rounded-md resize-none"
              rows={5}
              value={blog.des}
              onChange={(e) => handleInputChange(e, "des")}
            >
              {blog.title}
            </Textarea>
            <p className="float-right text-xs mt-1 text-grey-600">
              {blog.des.length} / 200
            </p>
          </div>
          <div>
            <h5 className="font-normal text-base text-grey-500  ">
              Tags (Helps in ranking and searching)
            </h5>
            <div className="bg-grey-100 text-grey-700 h-ful text-base mt-1 p-3 pb-6 rounded-md">
              <Input
                placeholder="Add tags"
                maxLength={20}
                className="py-3 h-10 resize-none outline-none  border-none text-grey-700"
                onChange={(e) => handleInputChange(e, "tags")}
                onKeyDown={(e) => handleAddTag(e)}
                value={tag}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="px-4 py-2 bg-grey-200 rounded-full text-sm hover:bg-grey-300 cursor-pointer smooth-transition flex flex-row justify-between items-center gap-1"
                      onClick={() => handleRemoveTag(index)}
                    >
                      {tag}
                      <IoMdClose />
                    </div>
                  );
                })}
              </div>
              <p className="float-right text-xs mt-1 text-grey-600">
                {blog.tags.length} / 8
              </p>
            </div>
          </div>
        </article>
      </div>
      <div className=" w-full flex items-center justify-center sm:justify-end gap-2 ">
        <Button
          variant="default"
          className=" rounded-full  px-5 mb-10"
          onClick={handlePublish}
        >
          Publish{loading && <LoadingSpinner className="ml-2" />}
        </Button>
        <Button variant="secondary" className="rounded-full  px-5 mb-10">
          Draft{loading && <LoadingSpinner className="ml-2" />}
        </Button>
      </div>
    </Layout>
  );
};

export default PublishForm;
