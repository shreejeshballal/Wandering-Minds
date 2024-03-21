import BlogEditor from "./BlogEditor";
import PublishForm from "./PublishForm";
import { useEditor } from "@/context/EditorContext";

const Editor = () => {
  const { editorState } = useEditor();
  console.log(editorState);
  return editorState === "editor" ? <BlogEditor /> : <PublishForm />;
};

export default Editor;
