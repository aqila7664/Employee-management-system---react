import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="w-full flex flex-row items-center justify-end bg-slate-200 text-blue-950 p-4">
        <button
          onClick={handleLogout}
          className="bg-blue-950 text-white text-md font-medium px-12 py-2 rounded-md hover:bg-blue-900 transition-colors"
        >
          Logout
        </button>
      </div>
    </>
  );
}
export default Navbar;
