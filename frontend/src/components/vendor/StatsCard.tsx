import { TrendingUp } from "lucide-react"
import type { StatsCardProps } from "./types"

const StatsCard = ({ title, value, subtitle, icon: Icon, color = "bg-blue-500", trend }: StatsCardProps) => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {trend && (
          <p className="text-sm text-green-600 mt-1 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className={`${color} rounded-full p-3`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
)

export default StatsCard 