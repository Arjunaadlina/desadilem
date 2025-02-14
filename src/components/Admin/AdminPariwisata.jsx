import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";
import Card from "../Pariwisata/Card";

const AdminPariwisata = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    facility: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [pariwisataData, setPariwisataData] = useState([]);
  const [selectedPariwisata, setSelectedPariwisata] = useState(null);
  const [fetchedPariwisata, setFetchedPariwisata] = useState(null);

  useEffect(() => {
    setFetchedPariwisata(true);
    axios
      .get("https://api-pariwisata.vercel.app/api/pariwisata")
      .then((response) => {
        setPariwisataData(response.data.data);
        setFetchedPariwisata(false);
      })
      .catch((error) => {
        console.error("Error fetching pariwisata data:", error);
        setFetchedPariwisata(false);
      });
    
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus Pariwisata ini?")) return;
  
    const prevPariwisataData = [...pariwisataData]; // Simpan data sebelum dihapus
    setPariwisataData((prev) => prev.filter((pariwisata) => pariwisata._id !== id));
  
    try {
      await axios.delete(`https://api-pariwisata.vercel.app/api/pariwisata/${id}`);
      alert("Pariwisata berhasil dihapus!");
      setIsEditMode(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting UMKM:", error);
      alert("Gagal menghapus UMKM.");
      setPariwisataData(prevPariwisataData); 
      setIsEditMode(false);
    }
  };

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
    if (!imageFile && !isEditMode) {
      setResponseMessage("Please upload an image.");
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("facility", formData.facility);
    if (imageFile) formDataToSend.append("images", imageFile);

    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`https://api-pariwisata.vercel.app/api/pariwisata/${currentId}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPariwisataData((prevData) => prevData.map((item) => (item._id === currentId ? response.data.data : item)));
      } else {
        response = await axios.post("https://api-pariwisata.vercel.app/api/pariwisata", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPariwisataData((prevData) => [...prevData, response.data.data]);
      }

      setResponseMessage(isEditMode ? "Product successfully updated!" : "Product successfully created!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting product:", error);
      setResponseMessage("Failed to process request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pariwisata) => {
    setIsEditMode(true);
    setCurrentId(pariwisata._id);
    setSelectedPariwisata(pariwisata)
    setFormData({
      name: pariwisata.name,
      description: pariwisata.description,
      price: pariwisata.price,
      facility: pariwisata.facility,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="">
      {
        fetchedPariwisata ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
            <span className="ml-4 text-blue-500">Loading data...</span>
          </div>
        ) : (
          <div className="flex gap-4 flex-col">
            {pariwisataData.map((pariwisata) => (
              <Card
                key={pariwisata._id}
                title={pariwisata.name}
                image={pariwisata.images}
                desc={pariwisata.description}
                price={pariwisata.price}
                facility={pariwisata.facility}
                onEdit={() => handleEdit(pariwisata)}
              />
            ))}
          </div>
        )
      }
      

      <button
        onClick={() => {
          setIsModalOpen(true);
          setIsEditMode(false);
          setFormData({ name: "", description: "", price: "", facility: "" });
          setImageFile(null);
        }}
        className="text-secondary rounded-full text-2xl shadow-lg flex justify-center items-center absolute bottom-14 right-14"
      >
        <IoAddCircle className="text-7xl" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit" : "Tambah"} Pariwisata</h2>
            <form className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama" className="w-full p-2 border rounded" />
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi" className="w-full p-2 border rounded" />
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Harga" className="w-full p-2 border rounded" />
              <input type="text" name="facility" value={formData.facility} onChange={handleInputChange} placeholder="Fasilitas" className="w-full p-2 border rounded" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
            </form>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2">Cancel</button>
              <button onClick={() => handleDelete(selectedPariwisata._id)} className="px-4 py-2 bg-red-600 text-white rounded mr-2">Delete</button>
              <button onClick={handleSubmit} className={`px-4 py-2 bg-blue-500 text-white rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>{isLoading ? "Processing..." : isEditMode ? "Update" : "Submit"}</button>
            </div>
            {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPariwisata;
