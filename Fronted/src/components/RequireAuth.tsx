import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from './NavBar';
import MarvelSVG from "../icons/marvel.svg";
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.username) {
    return (
      <>
      <div className='container'>
      <img src={MarvelSVG} alt="My SVG" />
        <h1 className='my-4'>Marvel Comics characters</h1>
        <NavBar />
        <Outlet />
      </div>
        
      </>
    );
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
