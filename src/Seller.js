import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Save, Plus, List, LogOut } from "lucide-react";

const Seller = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [gmail, setGmail] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemSummary, setItemSummary] = useState("");
  const [activeSection, setActiveSection] = useState("addItem");

  const [editingImageId, setEditingImageId] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");
  const [editItemSummary, setEditItemSummary] = useState("");

  useEffect(() => {
    const storedGmail = localStorage.getItem("sellerGmail");
    if (storedGmail) {
      setGmail(storedGmail);
      fetchImages(storedGmail);
    }
  }, []);

  const fetchImages = async (sellerGmail) => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/seller/images/seller/${sellerGmail}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Error fetching images: " + error.message);
    }
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("sellerGmail", gmail);
      formData.append("itemName", itemName);
      formData.append("itemPrice", itemPrice);
      formData.append("itemSummary", itemSummary);

      const response = await fetch(
        "http://localhost:8090/api/seller/images/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      alert("File uploaded successfully");
      fetchImages(gmail);
      setImage(null);
      setItemName("");
      setItemPrice("");
      setItemSummary("");
    } catch (error) {
      alert("Error uploading file: " + error.message);
    }
  };

  const handleEdit = (id, itemName, itemPrice, itemSummary) => {
    setEditingImageId(id);
    setEditItemName(itemName);
    setEditItemPrice(itemPrice);
    setEditItemSummary(itemSummary);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/seller/images/${editingImageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemName: editItemName,
            itemPrice: editItemPrice,
            itemSummary: editItemSummary,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      alert("Image updated successfully");
      fetchImages(gmail);
      setEditingImageId(null);
    } catch (error) {
      alert("Error updating image: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/seller/images/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      alert("Image deleted successfully");
      fetchImages(gmail);
    } catch (error) {
      alert("Error deleting image: " + error.message);
    }
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("sellerGmail");
    // Redirect to login page (you'll need to implement this based on your routing)
    window.location.href = "/login"; // Adjust the path as needed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Seller Dashboard
                </h1>
              </div>
              <div className="ml-6 flex space-x-4">
                <button
                  onClick={() => setActiveSection("addItem")}
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === "addItem"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Plus className="mr-2" size={20} /> Add New Item
                </button>
                <button
                  onClick={() => setActiveSection("viewItems")}
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === "viewItems"
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="mr-2" size={20} /> View All Items
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <span className="mr-4 text-gray-600">
                  Logged in as: {gmail}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600"
                >
                  <LogOut className="mr-2" size={20} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Upload Section - Shown only when "Add New Item" is active */}
        {activeSection === "addItem" && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Upload New Item
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Item Price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Item Summary"
                value={itemSummary}
                onChange={(e) => setItemSummary(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-full"
                rows="3"
              ></textarea>
              <button
                onClick={handleImageUpload}
                className="col-span-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
              >
                Upload Item
              </button>
            </div>
          </div>
        )}

        {/* Items Grid - Shown only when "View All Items" is active */}
        {activeSection === "viewItems" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img
                  src={`http://localhost:8090/api/seller/images/${img.name}`}
                  alt={img.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {editingImageId === img.id ? (
                    <>
                      <input
                        type="text"
                        value={editItemName}
                        onChange={(e) => setEditItemName(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                      />
                      <input
                        type="number"
                        value={editItemPrice}
                        onChange={(e) => setEditItemPrice(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                      />
                      <textarea
                        value={editItemSummary}
                        onChange={(e) => setEditItemSummary(e.target.value)}
                        className="w-full mb-2 p-2 border rounded"
                        rows="3"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-gray-800">
                        {img.itemName}
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        ${img.itemPrice}
                      </p>
                      <p className="text-gray-500 mt-2">{img.itemSummary}</p>
                    </>
                  )}
                  <div className="flex justify-between mt-4">
                    {editingImageId === img.id ? (
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center"
                      >
                        <Save className="mr-2" size={20} /> Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEdit(
                            img.id,
                            img.itemName,
                            img.itemPrice,
                            img.itemSummary
                          )
                        }
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center"
                      >
                        <Edit2 className="mr-2" size={20} /> Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center"
                    >
                      <Trash2 className="mr-2" size={20} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Seller;
