import { OptionsDropdown } from "./OptionsDropdown";

const TextEditor = () => {
  return (
    <div className="h-[3rem] smooth-transition mb-40  items-center justify-end flex  text-grey-500  ">
      Click the icon to add content
      <OptionsDropdown property="newField" />
    </div>
  );
};

export default TextEditor;
