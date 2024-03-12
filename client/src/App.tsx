import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./layout/Navbar";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import AuthRedirect from "./components/custom/AuthRedirect";
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
      path: "/",
      element: <Home />,
    },

    {
      path: "/about",
      element: (
        <AuthRedirect>
          <div className="bg-ascent-100 h-screen w-full text-7xl">
            About Found
          </div>
        </AuthRedirect>
      ),
    },

    {
      path: "*",
      element: <div className="bg-black h-screen w-full">Not Found</div>,
    },
  ];

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Navbar />

        <Routes>
          {routes.map((route) => (
            <Route {...route} />
          ))}
        </Routes>
      </AuthContextProvider>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
