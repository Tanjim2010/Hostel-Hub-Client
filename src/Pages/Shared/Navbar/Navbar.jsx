import { Link } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../Routes/AuthProvider";

const Navbar = () => {
  const { user, singOutUser } = useContext(AuthContext);
  const links = <>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/meals">Meals</Link>
    </li>
    <li>
      <Link to="/upcomingMeals">Upcoming Meals</Link>
    </li>
  </>
  return (
    <div className="navbar  bg-background-color text-primary-color">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Hamburger Menu for Mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBars className="text-xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            {links}
          </ul>
        </div>
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          HostelHub
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            links
          }
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? <div className="hidden lg:block">
          <Link to="/login" className="btn btn-accent-color">
            Join Us
          </Link>
        </div>
          :
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="Profile" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-30 text-primary"
            >
              <li>
                <a className="flex items-center">
                  <FaUserCircle className="mr-2" /> {user?.displayName}
                </a>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={singOutUser}>Logout</button>
              </li>
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;
