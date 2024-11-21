import {
  BarChart,
  Activity,
  Users,
  MessageSquare,
  Clock,
  ThumbsUp,
  ThumbsDown,
  FileQuestion,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "../components/Dashboard/StatCard";
import { PerformanceMetric } from "../components/Dashboard/PerformanceMetric";
import { ProgressBar } from "../components/Dashboard/ProgressBar";
import { ActivityChart } from "../components/Dashboard/ActivityChart"; // Import the ActivityChart component

function App() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">BẢNG ĐIỀU KHIỂN</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Xuất dữ liệu
            </button>
          </div>
        </div>

        {/* Thống kê chính */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tổng người dùng"
            value="1,234"
            unit="người dùng"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Phiên hoạt động"
            value="423"
            unit="phiên"
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Tin nhắn"
            value="8,549"
            unit="tổng"
            icon={MessageSquare}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Thời gian phản hồi"
            value="2.3"
            unit="giây"
            icon={Clock}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Chỉ số hiệu suất, Chỉ số thời gian thực, Thống kê sự tham gia */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chỉ số hiệu suất */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Các chỉ số hiệu suất chính
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <PerformanceMetric
                label="Tỷ lệ thành công"
                value="95%"
                color="text-green-600"
                subtext="+2.5% tuần này"
              />
              <PerformanceMetric
                label="Thời gian phản hồi trung bình"
                value="1.8s"
                color="text-green-500"
                subtext="Mục tiêu: 2.0s"
              />
              <PerformanceMetric
                label="Mức độ hài lòng"
                value="4.8/5"
                color="text-green-600"
                subtext="Dựa trên 1.2k đánh giá"
              />
            </div>
            <div className="space-y-4">
              <ProgressBar
                value={85}
                label="Sự tham gia của người dùng"
                color="bg-green-500"
              />
              <ProgressBar
                value={92}
                label="Hoàn thành nhiệm vụ"
                color="bg-green-600"
              />
              <ProgressBar
                value={78}
                label="Sử dụng tài nguyên"
                color="bg-green-400"
              />
            </div>
          </div>

          {/* Chỉ số thời gian thực */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Chỉ số thời gian thực
              </h2>
              <Zap className="w-5 h-5 text-green-500" />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 text-base">
                    Người dùng hoạt động
                  </span>
                </div>
                <span className="text-md font-semibold flex items-center">
                  247
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 text-base">Sử dụng CPU</span>
                </div>
                <span className="text-md font-semibold flex items-center">
                  42%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 text-base">
                    Tin nhắn/phút
                  </span>
                </div>
                <span className="text-md font-semibold flex items-center">
                  89
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600 text-base">
                    Thời gian hoạt động
                  </span>
                </div>
                <span className="text-md font-semibold flex items-center">
                  99.9%
                </span>
              </div>
            </div>
          </div>

          {/*  Thống kê về phản hổi người dùng */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Thống kê về phản hổi người dùng
              </h2>
              <BarChart className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsUp className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-600">Phản hồi tích cực</span>
                </div>
                <span className="font-semibold">82%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsDown className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-gray-600">Phản hồi tiêu cực</span>
                </div>
                <span className="font-semibold">18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileQuestion className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">Câu hỏi đang chờ</span>
                </div>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phần biểu đồ */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Biểu đồ hoạt động người dùng
          </h2>
          <ActivityChart />
        </div>
      </div>
    </div>
  );
}

export default App;
