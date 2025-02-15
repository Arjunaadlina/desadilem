import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoAddCircle } from "react-icons/io5";

const AdminGaleri = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [galeriData, setGaleriData] = useState([]);
  const [fetchedGaleri, setFetchedGaleri] = useState(false);

  useEffect(() => {
    setFetchedGaleri(true);
    axios
      .get("https://api-galerys.vercel.app/api/galery")
      .then((response) => {
        setGaleriData(response.data.data);
        setFetchedGaleri(false);
      })
      .catch((error) => {
        console.error("Error fetching galeri data:", error);
        setFetchedGaleri(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus gambar ini?")) return;

    const prevGaleriData = [...galeriData];
    setGaleriData((prev) => prev.filter((galeri) => galeri._id !== id));

    try {
      await axios.delete(`https://api-galerys.vercel.app/api/galery/${id}`);
      alert("Gambar berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting galeri:", error);
      alert("Gagal menghapus gambar.");
      setGaleriData(prevGaleriData);
    }
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
    formDataToSend.append("images", imageFile);

    try {
      const response = await axios.post("https://api-galerys.vercel.app/api/galery", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setGaleriData((prevData) => [...prevData, response.data.data]);
      setResponseMessage("Image successfully added!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting image:", error);
      setResponseMessage("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {fetchedGaleri ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
          <span className="ml-4 text-blue-500">Loading data...</span>
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap">
          {galeriData.map((galeri) => (
            <div key={galeri._id} className="relative w-48 border rounded-lg overflow-hidden">
              <img src={galeri.images} alt="Galeri" className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(galeri._id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className="text-secondary rounded-full text-2xl shadow-lg flex justify-center items-center fixed bottom-14 right-14"
      >
        <IoAddCircle className="text-7xl" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Tambah Gambar</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full mb-4 p-2 border rounded" />
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2">Cancel</button>
              <button onClick={handleSubmit} className={`px-4 py-2 bg-blue-500 text-white rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>
                {isLoading ? "Processing..." : "Upload"}
              </button>
            </div>
            {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGaleri;