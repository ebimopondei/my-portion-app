import { useState } from "react"
import { ProductCategory } from "@shared/enums"

interface CategoriesProps {
  onCategoryChange?: (category: string) => void;
}

// Map categories to icons and default counts
const categoryData = [
  { name: "All", icon: "🏪", count: 0 },
  { name: ProductCategory.GrainsAndCereals, icon: "🌾", count: 0 },
  { name: ProductCategory.TubersAndRootCrops, icon: "🍠", count: 0 },
  { name: ProductCategory.LegumesAndBeans, icon: "🫘", count: 0 },
  { name: ProductCategory.Vegetables, icon: "🥬", count: 0 },
  { name: ProductCategory.Fruits, icon: "🍎", count: 0 },
  { name: ProductCategory.SpicesAndHerbs, icon: "🌶️", count: 0 },
  { name: ProductCategory.NutsAndSeeds, icon: "🥜", count: 0 },
  { name: ProductCategory.LivestockAndPoultry, icon: "🐔", count: 0 },
  { name: ProductCategory.FishAndSeafood, icon: "🐟", count: 0 },
  { name: ProductCategory.DairyProducts, icon: "🥛", count: 0 },
  { name: ProductCategory.ProcessedFoods, icon: "🍞", count: 0 },
  { name: ProductCategory.OrganicProducts, icon: "🌱", count: 0 },
  { name: ProductCategory.FertilizersAndInputs, icon: "🌿", count: 0 },
  { name: ProductCategory.AgriculturalEquipment, icon: "🚜", count: 0 },
]

export function Categories({ onCategoryChange }: CategoriesProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    onCategoryChange?.(categoryName);
  };

  return (
    <div className="mb-8">
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {categoryData.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
              activeCategory === category.name
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                activeCategory === category.name ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
