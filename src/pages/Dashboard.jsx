// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// function Dashboard() {
//   return (
//     <div className="flex h-full">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <div className="w-full p-8 bg-gray-50">
//           <h2 className="text-2xl font-medium text-gray-900">Dashboard</h2>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Dashboard;


import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const EMPLOYEES_API = `${import.meta.env.VITE_API_BASE_URL}/employees`;
const DEPARTMENTS_API = `${import.meta.env.VITE_API_BASE_URL}/departments`;

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Fetch dashboard data
  // -----------------------------
  useEffect(() => {
    Promise.all([
      fetch(EMPLOYEES_API).then((res) => res.json()),
      fetch(DEPARTMENTS_API).then((res) => res.json()),
    ])
      .then(([employeesData, departmentsData]) => {
        setEmployees(employeesData);
        setDepartments(departmentsData);
      })
      .finally(() => setLoading(false));
  }, []);

  // -----------------------------
  // Dashboard metrics
  // -----------------------------
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (e) => e.status && String(e.status).toLowerCase() === "active"
  ).length;
  const inactiveEmployees = totalEmployees - activeEmployees;
  const totalDepartments = departments.length;

  const recentEmployees = [...employees].slice(0, 5);

  if (loading) {
    return (
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <div className="p-8">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Navbar />

        <div className="p-8 bg-gray-50 min-h-screen">
          {/* ---------------- Stats Cards ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <DashboardCard title="Total Employees" value={totalEmployees} />
            {/* <DashboardCard
              title="Active Employees"
              value={activeEmployees}
              color="text-green-600"
            />
            <DashboardCard
              title="Inactive Employees"
              value={inactiveEmployees}
              color="text-red-600"
            /> */}
            <DashboardCard
              title="Departments"
              value={totalDepartments}
            />
          </div>

          {/* ---------------- Recent Employees ---------------- */}
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Employees
              </h3>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-6 text-sm text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-gray-600">
                    Department
                  </th>
                  <th className="text-left py-3 px-6 text-sm text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100">
                    <td className="py-3 px-6 text-sm text-gray-900">
                      {emp.fullName}
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">
                      {emp.department}
                    </td>
                    <td
                      className={`py-3 px-6 text-sm ${emp.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {emp.status}
                    </td>
                  </tr>
                ))}
                {recentEmployees.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-6 text-gray-500"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Reusable card component
// -----------------------------
function DashboardCard({ title, value, color = "text-gray-900" }) {
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6">
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className={`text-3xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}

export default Dashboard;
