import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <Icon className="w-5 h-5 text-green-600" />
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="ml-2 text-gray-600">{unit}</span>
      </div>
      {trend && (
        <div
          className={`mt-2 text-sm ${
            trend.isPositive ? "text-green-600" : "text-red-500"
          }`}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% so với tháng trước
        </div>
      )}
    </div>
  );
}
