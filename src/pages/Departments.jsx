import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect, useCallback } from "react";

function Departments() {
  const [departmentFormData, setDepartmentFormData] = useState({
    id: "",
    dept_name: "",
    dept_desc: "",
    dept_manager: "",
  });

  const [depts, setDepts] = useState([]);
  const [deptEditingId, setDeptEditingId] = useState(null);
  const [showDeptForm, setShowDeptForm] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/departments`;

  const fetchDepts = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDepts(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDepts();
  }, [fetchDepts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentFormData({ ...departmentFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deptEditingId) {
      try {
        await fetch(`${API_URL}/${deptEditingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(departmentFormData),
        });
        fetchDepts();
        setDeptEditingId(null);
      } catch (error) {
        console.error("Error updating department:", error);
      }
    } else {
      try {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(departmentFormData),
        });
        fetchDepts();
      } catch (error) {
        console.error("Error adding department:", error);
      }
    }

    setDepartmentFormData({
      id: "",
      dept_name: "",
      dept_desc: "",
      dept_manager: "",
    });
    setShowDeptForm(false);
  };

  const handleCloseForm = () => {
    setShowDeptForm(false);
    setDeptEditingId(null);

    setDepartmentFormData({
      id: "",
      dept_name: "",
      dept_desc: "",
      dept_manager: "",
    });
  };

  const handleEdit = (dept) => {
    setDeptEditingId(dept.id);
    setDepartmentFormData(dept);
    setShowDeptForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      setDepts(depts.filter((dept) => dept.id !== id));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <>
      <div
        className={`flex h-full ${showDeptForm ? "blur-sm pointer-events-none" : ""
          }`}
      >
        <Sidebar />
        <div className="flex-1 ml-60">
          <Navbar />
          <div className="w-full p-8 bg-gray-50">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-medium text-gray-900 mb-12">
                Departments
              </h2>
              <button
                onClick={() => setShowDeptForm(true)}
                className="bg-blue-950 text-white text-md font-medium px-12 py-2 rounded-md"
              >
                Add Department
              </button>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 overflow-hidden mb-12">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Department ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Department Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Department Description
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Department Manager
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depts.map((dept) => (
                    <tr
                      key={dept.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {dept.id}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {dept.dept_name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {dept.dept_desc}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {dept.dept_manager}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(dept)}
                            className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleDelete(dept.id)}
                            className="text-xs text-gray-600 hover:text-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showDeptForm && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={handleCloseForm}
        >
          <div
            className="bg-white rounded-sm border border-gray-200 p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {deptEditingId ? "Edit Department" : "Add New Department"}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="id"
                  placeholder="Department ID"
                  value={departmentFormData.id}
                  onChange={handleInputChange}
                  required
                  disabled={deptEditingId !== null}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />

                <input
                  name="dept_name"
                  placeholder="Department Name"
                  value={departmentFormData.dept_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />

                <input
                  name="dept_desc"
                  type="text"
                  placeholder="Department Description"
                  value={departmentFormData.dept_desc}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />

                <input
                  name="dept_manager"
                  type="text"
                  placeholder="Department Manager"
                  value={departmentFormData.dept_manager}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-6 py-2 text-sm text-gray-600 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 text-sm text-gray-900 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors focus:outline-none focus:border-gray-400"
                >
                  {deptEditingId ? "Update Department" : "Add Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default Departments;
