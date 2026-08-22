import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div>
        <h2>Dayflow</h2>
      </div>

      <div className="user-area">

        <span>
          {user?.name}
        </span>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </header>
  );
}
