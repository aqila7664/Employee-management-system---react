import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="bg-blue-950 text-white fixed left-0 top-0 h-screen flex flex-col w-60 p-4 z-10">
      <h2 className="text-slate-300 text-2xl font-bold mb-8">Admin</h2>
      <nav className="flex flex-col px-2 gap-3">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/departments">Departments</Link>
        {/* <Link to="/designations">Designations</Link> */}
      </nav>
    </aside>
  );
}
export default Sidebar;
