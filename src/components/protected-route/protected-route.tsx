/* eslint-disable prettier/prettier */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getIsAuth, getUser } from "../../services/slices/authSlice";
import { Preloader } from "@ui";

/* eslint-disable prettier/prettier */
export function ProtectedRoute({ children, forNotAuth }: { children: JSX.Element, forNotAuth?: boolean }) {
    const location = useLocation();
    const user = useSelector(getUser);
    if (!forNotAuth && !user) {
        return <Navigate to='/login' state={{from: location}} />;
      }
      if (forNotAuth && user) {
        return <Navigate to='/' state={{from: location}} />;
      }
    return children;
}