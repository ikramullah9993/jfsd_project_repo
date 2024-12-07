import React, { useState } from "react";
import { Search, Globe, Info } from "lucide-react";

const CulturalHandicraftDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handicraftData = [
    {
      id: 1,
      name: "Traditional Pottery",
      category: "Ceramics",
      origin: "Global",
      description:
        "Hand-crafted vessels and decorative items made from clay, often featuring distinctive regional patterns and techniques.",
      culturalSignificance:
        "Pottery represents one of humanity's oldest crafts, serving both practical and ceremonial purposes across cultures.",
      techniques: ["Coiling", "Wheel throwing", "Hand building"],
      materials: ["Clay", "Glazes", "Natural pigments"],
      imageUrl: "/static/pot.jpg", // Image specific to this item
    },
    {
      id: 2,
      name: "Handwoven Textiles",
      category: "Textiles",
      origin: "Worldwide",
      description:
        "Intricately woven fabrics created using traditional looms and techniques, often incorporating cultural motifs and patterns.",
      culturalSignificance:
        "Textile weaving often tells stories of community identity and historical events through patterns and symbols.",
      techniques: [
        "Backstrap weaving",
        "Floor loom weaving",
        "Tapestry weaving",
      ],
      materials: ["Cotton", "Wool", "Silk", "Natural dyes"],
      imageUrl: "/static/eww.jpg", // Image specific to this item
    },
    {
      id: 3,
      name: "Wood Carving",
      category: "Woodwork",
      origin: "Global",
      description:
        "Sculptural and functional items carved from various types of wood, showcasing local artistic traditions.",
      culturalSignificance:
        "Wood carving often represents spiritual beliefs and cultural narratives through masks, totems, and decorative items.",
      techniques: ["Relief carving", "Whittling", "Chip carving"],
      materials: ["Hardwoods", "Softwoods", "Traditional tools"],
      imageUrl: "/static/woodcarving.jpg", // Image specific to this item
    },
    {
      id: 4,
      name: "Metalwork",
      category: "Metal Crafts",
      origin: "Various Regions",
      description:
        "Decorative and functional metal objects created through traditional smithing and casting techniques.",
      culturalSignificance:
        "Metalwork often symbolizes wealth, status, and technological advancement in many societies.",
      techniques: ["Forging", "Casting", "Filigree"],
      materials: ["Copper", "Bronze", "Silver", "Gold"],
      imageUrl: "/static/metalwork.jpg", // Image specific to this item
    },
  ];

  const categories = [
    "All",
    ...new Set(handicraftData.map((item) => item.category)),
  ];

  const filteredData = handicraftData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Cultural Handicraft Explorer
        </h1>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search handicrafts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <Globe className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-gray-500 text-sm">
                {item.category} • {item.origin}
              </p>
            </div>
            <div className="px-6 pb-6">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Description
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Cultural Significance</h3>
                  <p className="text-gray-600">{item.culturalSignificance}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Traditional Techniques</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.techniques.map((technique) => (
                      <span
                        key={technique}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Materials Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.materials.map((material) => (
                      <span
                        key={material}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulturalHandicraftDashboard;
