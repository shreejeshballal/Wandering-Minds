import {
  FaImage,
  FaHeading,
  FaParagraph,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditor } from "@/context/EditorContext";

export const OptionsDropdown = ({
  property = "newField",
  index = -1,
}: {
  property: string;
  index?: number;
}) => {
  const navDropdownItems = [
    { label: "Heading", icon: <FaHeading /> },
    { label: "Paragraph", icon: <FaParagraph /> },
    { label: "Image", icon: <FaImage /> },
    { label: "Add Above", icon: <FaArrowUp /> },
    { label: "Add Below", icon: <FaArrowDown /> },
  ];

  const { setBlog, blog } = useEditor();

  // Function to handle the user selection of the content type and create resptive fields
  const handleOptionSelect = (label: string) => {
    let fieldObject = {};
    const generatedId = Date.now().toString(36);

    switch (label) {
      case "Heading":
        fieldObject = { optionType: "heading", value: "" };
        break;
      case "Paragraph":
        fieldObject = { optionType: "paragraph", value: "" };
        break;
      case "Image":
        fieldObject = { optionType: "image", value: "" };
        break;
      default:
        fieldObject = { optionType: "heading", value: "" };
        break;
    }

    fieldObject = { ...fieldObject, id: generatedId };

    if (property === "editField") {
      if (label === "Add Below" || label === "Add Above") {
        // Adding a new field based on the user selection
        const newBlogContentArray = [...blog.content];
        // Based on the label add the new field above or below , the 0 represents dont delete any items and fieldObject is the new field to be added
        newBlogContentArray.splice(
          label === "Add Below" ? index + 1 : index,
          0,
          fieldObject
        );
        setBlog({ ...blog, content: newBlogContentArray });
      } else {
        // Change the field type based on the user selection without effecting the id
        const optionType =
          fieldObject["optionType" as keyof typeof fieldObject];
        const newBlogContentArray = [...blog.content];
        newBlogContentArray[index] = {
          ...newBlogContentArray[index],
          optionType,
          value: "",
        };
        setBlog({ ...blog, content: newBlogContentArray });
      }
    } else if (property === "newField") {
      // Creating a new field based on the user selection
      setBlog({ ...blog, content: [...blog.content, fieldObject] });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="p-2 text-[1.25rem] cursor-pointer">
          {property === "editField" ? <PiDotsSixVerticalBold /> : <FaPlus />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40  relative" sideOffset={-5}>
        {navDropdownItems
          .slice(0, property === "newField" ? 3 : 5)
          .map((item) => (
            <DropdownMenuItem
              className="flex items-center gap-3"
              key={item.label}
              onClick={() => handleOptionSelect(item.label)}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
