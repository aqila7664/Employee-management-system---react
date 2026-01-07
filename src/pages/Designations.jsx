import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Designations() {
  return (
    <div className={`flex h-full `}>
      <Sidebar />
      <div className="flex-1 ml-60">
        <Navbar />
        <div className="w-full p-8 bg-gray-50">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-medium text-gray-900 mb-12">
              Designations
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Designations;
