import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoAddOutline, IoTrash } from "react-icons/io5";
import Card from "../Umkm/Card/Card";

function AdminUmkm() {
  const [umkmData, setUmkmData] = useState([]); // State to store fetched UMKM data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: null,
  });
  const [selectedUmkm, setSelectedUmkm] = useState(null); 
  const [loading, setLoading] = useState(false)
  
  const modalRef = useRef(null); 
  const modaleditRef = useRef(null); 

  useEffect(() => {
    setLoading(true)
    axios
      .get("https://api-umkm.vercel.app/api/umkm")
      .then((response) => {
        setUmkmData(response.data.data)
        setLoading(false)
        console.log(response.data.data)
    }
    )
      
      .catch((error) => console.error("Error fetching UMKM data:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && value.length > 30) return;
    if (name === "description" && value.length > 65) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("images", formData.images);
  
    try {
      await axios.post("https://api-umkm.vercel.app/api/umkm", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setIsModalOpen(false);
      setFormData({ name: "", description: "", images: null });
      alert("UMKM berhasil ditambahkan!");
  
      // Fetch ulang data setelah submit
      const response = await axios.get("https://api-umkm.vercel.app/api/umkm");
      setUmkmData(response.data.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Gagal menambahkan UMKM.");
    }
  };
  

  const handleEditClick = (umkm) => {
    setSelectedUmkm(umkm); 
    setFormData({
      name: umkm.name,
      description: umkm.description,
      images: umkm.images,
    });
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.images) {
      formDataToSend.append("images", formData.images);
    }

    try {
      const response = await axios.put(
        `https://api-umkm.vercel.app/api/umkm/${selectedUmkm._id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUmkmData((prev) =>
        prev.map((umkm) =>
          umkm._id === selectedUmkm._id ? response.data : umkm
        )
      ); // Update the edited UMKM in the list
      setIsEditModalOpen(false);
      alert("UMKM berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating UMKM:", error);
      alert("Gagal memperbarui UMKM.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus UMKM ini?")) return;
  
    const prevUmkmData = [...umkmData]; // Simpan data sebelum dihapus
    setUmkmData((prev) => prev.filter((umkm) => umkm._id !== id));
  
    try {
      await axios.delete(`https://api-umkm.vercel.app/api/umkm/${id}`);
      alert("UMKM berhasil dihapus!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error deleting UMKM:", error);
      alert("Gagal menghapus UMKM.");
      setUmkmData(prevUmkmData); 
      setIsEditModalOpen(false);
    }
  };
  

  // Close the modal when clicking outside of it
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  const handleEditClickOutside = (e) => {
    if (modaleditRef.current && !modaleditRef.current.contains(e.target)) {
      setIsEditModalOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
      if (isEditModalOpen && modaleditRef.current && !modaleditRef.current.contains(e.target)) {
        setIsEditModalOpen(false);
      }
    };
  
    if (isModalOpen || isEditModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isEditModalOpen]);
  

  useEffect(() => {
    if (isEditModalOpen) {
      document.addEventListener("mousedown", handleEditClickOutside);
    } else {
      document.removeEventListener("mousedown", handleEditClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleEditClickOutside);
    };
  }, [isEditModalOpen]);

  return (
    <div className="mt-8">
      <h1 className="text-xl mb-4">Daftar UMKM</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
          <span className="ml-4 text-blue-500">Loading data...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {umkmData.map((umkm) => (
            <Card
              key={umkm._id}
              title={umkm.name}
              image={umkm.images}
              desc={umkm.description}
              onEditClick={() => handleEditClick(umkm)}
            />
          ))}
        </div>
      )}

      {/* Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-14 right-14 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition"
      >
        <IoAddOutline className="font-bold text-2xl"/>
      </button>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Tambah UMKM</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  name <span className="text-gray-500">(max 30 characters)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                  required
                />
                <p className="text-sm text-gray-500">{formData.name.length}/30</p>
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description{" "}
                  <span className="text-gray-500">(max 65 characters)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  required
                ></textarea>
                <p className="text-sm text-gray-500">
                  {formData.description.length}/65
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.images && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {formData.images.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>

            {/* Close Modal */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modaleditRef}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">Edit UMKM</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name <span className="text-gray-500">(max 30 characters)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                  required
                />
                <p className="text-sm text-gray-500">{formData.name.length}/30</p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description{" "}
                  <span className="text-gray-500">(max 65 characters)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  required
                ></textarea>
                <p className="text-sm text-gray-500">
                  {formData.description.length}/65
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image (Optional)
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.images && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {formData.images.name}
                  </p>
                )}
              </div>

              <div className="flex flex-row-reverse gap-4">
                <button

                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                  Update
                </button>
                <button className="bg-red-500 px-4 rounded-md text-white"
                    type="button"
                    onClick={() => handleDelete(selectedUmkm._id)}>
                  <IoTrash />
                </button>
              </div>
            </form>
            

            {/* Close Modal */}
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUmkm;
