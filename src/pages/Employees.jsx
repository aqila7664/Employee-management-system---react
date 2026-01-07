import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Employees() {
  // const [formData, setFormData] = useState({
  //   id: "",
  //   fullName: "",
  //   email: "",
  //   phone: "",
  //   department: "",
  //   designation: "",
  //   employmentType: "",
  //   status: "",
  // });

  // const [employees, setEmployees] = useState(employeesMock);
  // const [editingId, setEditingId] = useState(null);
  // const [showForm, setShowForm] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (editingId) {
  //     const updatedEmployees = employees.map((employee) =>
  //       employee.id === editingId
  //         ? {
  //             ...employee,
  //             ...formData,
  //             id: formData.id || editingId,
  //           }
  //         : employee
  //     );

  //     setEmployees(updatedEmployees);
  //     setEditingId(null);
  //   } else {
  //     const newEmployee = {
  //       id: formData.id || Date.now().toString(),
  //       ...formData,
  //     };

  //     setEmployees([...employees, newEmployee]);
  //   }

  //   setFormData({
  //     id: "",
  //     fullName: "",
  //     email: "",
  //     phone: "",
  //     department: "",
  //     designation: "",
  //     employmentType: "",
  //     status: "",
  //   });
  //   setShowForm(false);
  // };

  // const handleCloseForm = () => {
  //   setShowForm(false);
  //   setEditingId(null);
  //   setFormData({
  //     id: "",
  //     fullName: "",
  //     email: "",
  //     phone: "",
  //     department: "",
  //     designation: "",
  //     employmentType: "",
  //     status: "",
  //   });
  // };

  // const handleEdit = (employee) => {
  //   setEditingId(employee.id);
  //   setFormData(employee);
  //   setShowForm(true);
  // };

  // const handleDelete = (id) => {
  //   setEmployees(employees.filter((employee) => employee.id !== id));
  // };

  // -------------------------------
  // STATE: Form input values
  // -------------------------------
  // This object stores all values typed into the form inputs.
  // Each key matches an input's "name" attribute.
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    employmentType: "",
    status: "",
  });

  // -------------------------------
  // STATE: Employee list (table data)
  // -------------------------------
  // This stores all employees displayed in the table.
  // Initially loaded from mock data.
  const [employees, setEmployees] = useState([]);

  // -------------------------------
  // STATE: Edit mode tracker
  // -------------------------------
  // null  → Add Employee mode
  // value → Edit Employee mode (stores employee ID)
  const [editingId, setEditingId] = useState(null);

  // -------------------------------
  // STATE: Show / Hide form modal
  // -------------------------------
  // false → form hidden
  // true  → form visible
  const [showForm, setShowForm] = useState(false);

  // -------------------------------
  // STATE: Loading state
  // -------------------------------
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/employees`;

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees when component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // -------------------------------
  // HANDLE INPUT CHANGE
  // -------------------------------
  // Runs whenever user types in any input field.
  // Updates the corresponding field inside formData.
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Copy old formData and update only the changed field
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // -------------------------------
  // HANDLE FORM SUBMIT (Add or Edit)
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // -------- EDIT EXISTING EMPLOYEE --------
    if (editingId) {
      try {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        fetchEmployees();
        setEditingId(null);
      } catch (error) {
        console.error("Update failed", error);
      }
    }

    // -------- ADD NEW EMPLOYEE --------
    else {
      // const newEmployee = {
      //   id: formData.id || Date.now().toString(), // generate ID if empty
      //   ...formData,
      // };

      // // Add new employee to the list
      // setEmployees([...employees, newEmployee]);
      try {
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        fetchEmployees(); // reload table
      } catch (error) {
        console.error("Add employee failed", error);
      }
    }

    // -------- RESET FORM AFTER SUBMIT --------
    setFormData({
      id: "",
      fullName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      employmentType: "",
      status: "",
    });

    setShowForm(false); // close modal
  };

  // -------------------------------
  // HANDLE FORM CLOSE / CANCEL
  // -------------------------------
  // Runs when clicking Cancel or outside the modal
  const handleCloseForm = () => {
    setShowForm(false); // hide form
    setEditingId(null); // reset edit mode

    // Clear form inputs
    setFormData({
      id: "",
      fullName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      employmentType: "",
      status: "",
    });
  };

  // -------------------------------
  // HANDLE EDIT BUTTON CLICK
  // -------------------------------
  // Loads selected employee data into the form
  const handleEdit = (employee) => {
    setEditingId(employee.id); // mark edit mode
    setFormData(employee); // fill form with existing data
    setShowForm(true); // open modal
  };

  // -------------------------------
  // HANDLE DELETE BUTTON CLICK
  // -------------------------------
  // Removes employee from the list
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchEmployees();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-60">
          <Navbar />
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex h-screen ${showForm ? "blur-sm pointer-events-none" : ""
          }`}
      >
        <Sidebar />
        <div className="flex-1 ml-60">
          <Navbar />
          <div className="w-full p-8 bg-gray-50">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-medium text-gray-900 mb-12">
                Employees
              </h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-950 text-white text-md font-medium px-12 py-2 rounded-md"
              >
                Add Employee
              </button>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 overflow-hidden mb-12">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Employee ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Full Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Email
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Phone
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Department
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Designation
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Employment Type
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-normal text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {employee.id}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {employee.fullName}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {employee.email}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {employee.phone}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {employee.department}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {employee.designation}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs px-2 py-1 rounded-sm`}>
                          {employee.employmentType}
                        </span>
                      </td>
                      <td
                        className={`py-4 px-6 text-sm text-gray-900 ${employee.status === "Present"
                          ? "text-green-600"
                          : "text-red-600"
                          }`}
                      >
                        {employee.status}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleDelete(employee.id)}
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

      {showForm && (
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
                {editingId ? "Edit Employee" : "Add New Employee"}
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
                  placeholder="Employee ID"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  disabled={editingId !== null}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />

                <input
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />
                <input
                  name="department"
                  type="text"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />
                <input
                  name="designation"
                  type="text"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />
                <input
                  name="employmentType"
                  type="text"
                  placeholder="Employment Type"
                  value={formData.employmentType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 transition-colors bg-white text-gray-900 placeholder-gray-400"
                />
                <input
                  name="status"
                  type="text"
                  placeholder="Status"
                  value={formData.status}
                  onChange={handleChange}
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
                  {editingId ? "Update Employee" : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default Employees;
