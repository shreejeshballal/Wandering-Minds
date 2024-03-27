import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import AuthRedirect from "./components/custom/AuthRedirect";
import Editor from "./pages/editor/Editor";
import { EditorContextProvider } from "./context/EditorContext";
import Error from "./components/custom/Error";
function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "/editor",
      element: (
        <AuthRedirect>
          <Editor />
        </AuthRedirect>
      ),
    },
    {
      path: "*",
      element: <Error />,
    },
  ];

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <EditorContextProvider>
          <Navbar />

          <Routes>
            {routes.map((route) => (
              <Route {...route} />
            ))}
          </Routes>
        </EditorContextProvider>
      </AuthContextProvider>
      <Toaster richColors />
    </BrowserRouter>
  );
}

export default App;
