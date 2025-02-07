import React, { useState } from "react";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";

const AdminPariwisata = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    facility: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setResponseMessage("Please upload an image.");
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("facility", formData.facility);
    formDataToSend.append("image", imageFile);

    try {
      const response = await axios.post("https://api-pariwisata.vercel.app/api/pariwisata", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponseMessage("Product successfully created!");
      console.log("Response:", response.data);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error submitting product:", error);
      setResponseMessage("Failed to create product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className=" text-secondary rounded-full text-2xl shadow-lg flex justify-center items-center absolute bottom-14 right-14"
      >
        <IoAddCircle className="text-7xl"/>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Tambah Pariwisata</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fasilitas</label>
                <input
                  type="text"
                  name="facility"
                  value={formData.facility}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Gambar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
            </form>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 bg-blue-500 text-white rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
            {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPariwisata;
