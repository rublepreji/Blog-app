import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {

    await logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/blogs">
        BlogHub
      </Link>

      {user && (
        <>
          <Link to="/blogs/new">
            Add Blog
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;