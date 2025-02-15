import React, { useState, useEffect } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AdminUmkm from "../components/Admin/Umkm";
import AdminPariwisata from "../components/Admin/AdminPariwisata";
import AdminGaleri from "../components/Admin/AdminGaleri";

function Admin() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <div>Ini adalah halaman Dashboard</div>;
      case "Manage-umkm":
        return <AdminUmkm />;
      case "Pariwisata":
        return <AdminPariwisata />;
      case "Galeri":
        return <AdminGaleri />;
      default:
        return <div>Halaman tidak ditemukan</div>;
    }
  };

  return (
    <div className="flex h-screen relative overflow-auto">
      {/* Overlay for closing sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <div
        className={`fixed z-20 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform bg-gray-800 text-white w-64 flex flex-col lg:relative lg:translate-x-0 h-screen`}
      >
        <div className="flex py-2 items-center gap-4">
          <div className="p-4 text-2xl font-bold border-gray-700 border-b">
            Admin Panel
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden bg-gray-300 hover:bg-gray-600 p-2 h-10 flex items-center justify-center rounded-xl"
          >
            <IoCloseOutline size={24} className="text-gray-800" />
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <button
                onClick={() => setActivePage("Dashboard")}
                className={`block w-full text-left py-2 px-4 rounded ${
                  activePage === "Dashboard"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                } transition`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("Manage-umkm")}
                className={`block w-full text-left py-2 px-4 rounded ${
                  activePage === "Manage-umkm"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                } transition`}
              >
                Manage UMKM
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("Pariwisata")}
                className={`block w-full text-left py-2 px-4 rounded ${
                  activePage === "Pariwisata"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                } transition`}
              >
                Pariwisata
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("Galeri")}
                className={`block w-full text-left py-2 px-4 rounded ${
                  activePage === "Galeri"
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                } transition`}
              >
                Galeri
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 transition rounded"
            onClick={() => {
              localStorage.removeItem("token"); // Remove token
              navigate("/login"); // Redirect to login
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 px-4 py-4 overflow-y-auto">
        {/* Header for Mobile */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-800 bg-gray-200 p-2 rounded-md"
          >
            <IoMenuOutline size={24} />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <h1 className="text-3xl font-bold mb-6">{activePage}</h1>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}

export default Admin;
