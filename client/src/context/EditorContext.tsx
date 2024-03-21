import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

interface Blog {
  banner: string;
  title: string;
  content: object[];
  tags: string[];
  des: string;
  author: string;
}

interface EditorContextValue {
  editorState: string;
  setEditorState: (editor: string) => void;
  blog: Blog;
  setBlog: (blog: Blog) => void;
}

const EditorContext = createContext<EditorContextValue>({
  setEditorState: () => {},
  editorState: "",
  blog: {
    banner: "",
    title: "",
    content: [],
    tags: [],
    des: "",
    author: "",
  },
  setBlog: () => {},
});

export const useEditor = () => {
  return useContext(EditorContext);
};

export const EditorContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAuth();

  const [blog, setBlog] = useState<Blog>({
    banner: "",
    title: "",
    content: [],
    tags: [],
    des: "",
    author: user?.id || "",
  });

  const [editorState, setEditorState] = useState<string>("editor");

  const value = useMemo(
    () => ({ blog, setBlog, editorState, setEditorState }),
    [blog, editorState]
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
};
