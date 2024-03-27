/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import { FaImage } from "react-icons/fa";
import { toast } from "sonner";
import { MdOutlineDelete } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OptionsDropdown } from "./OptionsDropdown";
import { useEditor } from "@/context/EditorContext";
import { imageFileTypes } from "@/lib/constants";
import { getImageUrl } from "@/lib/utils";

interface Props {
  item: {
    optionType: string;
    value: string;
    id: string;
  };
  index: number;
}

const Fields = ({ item, index }: Props) => {
  const { blog, setBlog } = useEditor();

  // Function to resize the textarea based on the content
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const resizeTextArea = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    };
    resizeTextArea();
    return () => {
      window.removeEventListener("resize", resizeTextArea);
    };
  }, [item.value, item.optionType]);

  // Function to handle the change in the input fields
  const handleChange = (e: any, property: string) => {
    if (property === "image") {
      const fileTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (e.target.files === null) {
        toast.error("No file selected");
        return;
      }

      const file = e.target.files[0];
      if (!fileTypes.includes(file.type)) {
        toast.error("Invalid file type");
        return;
      }
      const newBlogContentArray = [...blog.content];
      newBlogContentArray[index] = {
        ...newBlogContentArray[index],
        value: file,
      };
      setBlog({ ...blog, content: newBlogContentArray });
    } else {
      const newBlogContentArray = [...blog.content];
      newBlogContentArray[index] = {
        ...newBlogContentArray[index],
        value: e.target.value,
      };
      setBlog({ ...blog, content: newBlogContentArray });
    }
  };

  // Delete the field and remove it from the main blog object
  const handleDelete = () => {
    const newBlogContentArray = [...blog.content];
    newBlogContentArray.splice(index, 1);
    setBlog({ ...blog, content: newBlogContentArray });
  };

  return (
    <div className="flex">
      {item.optionType === "image" ? (
        <div className="relative min-h-[5rem] w-full bg-lightgrey  items-center flex justify-center border-4 border-gray-100">
          {item.value === "" ? (
            <p className="text-lg text-grey-500 flex items-center justify-center gap-2">
              <FaImage className="text-2xl" />
              Upload Image
            </p>
          ) : (
            <img
              src={getImageUrl(item.value)}
              className=" aspect-video object-cover w-full h-full"
            />
          )}
          <Input
            placeholder="Upload Image"
            type="file"
            id={item.id}
            accept={imageFileTypes.join(",")}
            onChange={(e) => handleChange(e, "image")}
            className="opacity-0 absolute top-0 w-full h-full bg-transparent cursor-pointer"
          />
        </div>
      ) : item.optionType === "paragraph" ? (
        <Textarea
          ref={textAreaRef}
          placeholder="Type your paragraph"
          value={item.value}
          onChange={(e) => handleChange(e, "content")}
          className="min-h-[10rem] font-normal resize-none m-0 text-base  focus:bg-grey-200 p-3 smooth-transition bg-grey-100 bg-opacity-50"
        />
      ) : (
        <Textarea
          rows={1}
          ref={textAreaRef}
          maxLength={60}
          placeholder="Type your heading"
          value={item.value}
          onChange={(e) => handleChange(e, "content")}
          className=" overflow-hidden resize-none text-[1.3rem] font-medium m-0  focus:bg-grey-200 p-3 smooth-transition bg-grey-100 bg-opacity-50"
        />
      )}
      <div className="w-10 flex flex-col  text-grey-500  items-center justify-start gap-3">
        <OptionsDropdown property="editField" index={index} />
        <Tooltip>
          <TooltipContent className="bg-red text-light">
            <p>Delete</p>
          </TooltipContent>
          <TooltipTrigger onClick={() => handleDelete()}>
            <MdOutlineDelete className="text-2xl smooth-transition hover:text-red" />
          </TooltipTrigger>
        </Tooltip>
      </div>
    </div>
  );
};
export default Fields;
