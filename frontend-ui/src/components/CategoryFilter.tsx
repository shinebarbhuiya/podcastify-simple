import React from "react";
import { Tag } from "lucide-react";

interface Category {
  name: string;
  color: string;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories: Category[] = [
    { name: "All", color: "bg-gray-200" },
    { name: "Comedy", color: "bg-yellow-200" },
    { name: "History", color: "bg-blue-200" },
    { name: "Performing Arts", color: "bg-pink-200" },
    { name: "Sexuality", color: "bg-red-200" },
    { name: "Technology", color: "bg-green-200" },
    { name: "Business", color: "bg-purple-200" },
  ];

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-2 min-w-max px-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              onCategoryChange(category.name === "All" ? "" : category.name)
            }
            className={`flex items-center px-4 py-2 rounded-full transition-all ${
              (category.name === "All" && !selectedCategory) ||
              (category.name !== "All" && selectedCategory === category.name)
                ? "bg-teal-600 text-white"
                : `${category.color} text-gray-800 hover:bg-teal-100`
            }`}
          >
            <Tag className="h-4 w-4 mr-2" />
            <span className="whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
