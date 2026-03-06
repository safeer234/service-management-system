import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../../../features/auth/authSlice";

function AuthLoader({ children }) {

  const dispatch = useDispatch();

  useEffect(() => {

    const loadUser = async () => {

      try {

        const res = await axios.get(
          "https://service-management-system-hj06.onrender.com/api/auth/me",
          { withCredentials: true }
        );

        dispatch(setUser(res.data.data));

      } catch {
        dispatch(logout());
      }

    };

    loadUser();

  }, [dispatch]);

  return children;
}

export default AuthLoader;