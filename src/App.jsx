import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { authService } from "./appwrite/auth";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const currentUser = async () => {
    try {
      const user = await authService.currentUser();
      console.log(user);
      if (user !== null) {
        dispatch(login(user));
      } else {
        console.log("logout");
        dispatch(logout());
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>{/* TODO: <Outlet /> */}</main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
