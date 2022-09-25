import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const auth = useSelector((state) => state.auth);

  return auth?.accessToken ? children : <Navigate to="/" />;
}
