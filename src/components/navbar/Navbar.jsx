import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();
  const redirect = (direction) => {
    if (direction === "login") return navigate("/login");
    if (direction === "signup") return navigate("/signup");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          <span>Booking Website</span>
        </Link>
        <div className="navItems">
          {!user && (
            <>
              <button className="navButton" onClick={() => redirect("signup")}>
                Register
              </button>
              <button className="navButton" onClick={() => redirect("login")}>
                Login
              </button>
            </>
          )}
          {user && (
            <div className="navItems">
              <p>{user.username}</p>
              <button
                className="navButton"
                onClick={() => {
                  navigate("/transactions");
                }}
              >
                Transaction
              </button>
              <button className="navButton" onClick={() => dispatch({ type: "LOGOUT" })}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
