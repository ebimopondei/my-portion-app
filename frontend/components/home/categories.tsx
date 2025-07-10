"use client"

import { useState } from "react"

const categories = [
  { name: "All", icon: "🏪", count: 250 },
  { name: "Rice", icon: "🌾", count: 45 },
  { name: "Beans", icon: "🫘", count: 32 },
  { name: "Yam", icon: "🍠", count: 28 },
  { name: "Plantain", icon: "🍌", count: 22 },
  { name: "Tomatoes", icon: "🍅", count: 38 },
  { name: "Onions", icon: "🧅", count: 25 },
  { name: "Pepper", icon: "🌶️", count: 19 },
  { name: "Garri", icon: "🥣", count: 15 },
]

export function Categories() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="mb-8">
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
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
