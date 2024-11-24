import { LineChart } from "lucide-react";

export function ActivityChart() {
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const chartData = [2, 3, 4, 4, 5, 8, 8, 8, 8, 10, 10, 11];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Hoạt động người dùng
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Người dùng hoạt động hàng tháng (người)
          </span>
          <LineChart className="w-5 h-5 text-green-500" />
        </div>
      </div>
      <div className="relative h-80">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[20, 15, 10, 5, 0].map((tick) => (
            <div key={tick} className="w-full h-px bg-gray-100 relative">
              <span className="absolute -left-6 -top-2 text-xs text-gray-400">
                {tick}
              </span>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-between px-2 pt-6">
          {chartData.map((value, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative">
                <div
                  className="w-8 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                  style={{ height: `${(value / 20) * 240}px` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white px-2 py-1 rounded text-xs">
                    {value}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs font-medium text-gray-600">
                {value}
              </div>
              <div className="mt-1 text-xs text-gray-400">{months[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
