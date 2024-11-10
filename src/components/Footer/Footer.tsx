import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white py-8">
      {/* Top Section */}
      <div className="flex justify-around items-center text-center pb-6 border-b border-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-2xl">💲</span>
          <div>
            <h3 className="text-green-500 font-bold">BIỂU PHÍ DỊCH VỤ</h3>
            <p className="text-gray-300">Khi nộp hồ sơ qua đường Bưu điện</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-2xl">📬</span>
          <div>
            <h3 className="text-yellow-500 font-bold">HỘP THƯ GÓP Ý</h3>
            <p className="text-gray-300">
              Tiếp nhận ý kiến của tổ chức, cá nhân
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-500 text-2xl">❓</span>
          <div>
            <h3 className="text-red-500 font-bold">CÂU HỎI THƯỜNG GẶP</h3>
            <p className="text-gray-300">
              Trả lời cho các câu hỏi mà bạn cần biết
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-start px-8 pt-6">
        {/* Left Side */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Emblem_of_Ho_Chi_Minh_City.svg/1024px-Emblem_of_Ho_Chi_Minh_City.svg.png" // Placeholder logo
              alt="Thủ Đức Logo"
              className="w-16 h-16"
            />
            <div>
              <h3 className="font-semibold">Thủ tục hành chính</h3>
              <h2 className="text-2xl font-bold">UBND TP THỦ ĐỨC</h2>
            </div>
          </div>
          <p className="text-sm">
            Địa chỉ: 168 Trương Văn Bang, Phường Thạnh Mỹ Lợi, TP Thủ Đức, Tp.
            Hồ Chí Minh
          </p>
          <p className="text-sm">Điện thoại: (028) 3740 0509</p>
          <p className="text-sm">Email: tphuthuduc@tphcm.gov.vn</p>
        </div>

        {/* Center Section */}
        <div className="text-sm space-y-2">
          <h3 className="font-semibold">Dịch vụ</h3>
          <ul className="space-y-1">
            <li>Thủ tục hành chính</li>
            <li>Tra cứu kết quả hồ sơ</li>
            <li>Thống kê</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="text-sm space-y-2">
          <h3 className="font-semibold">Hướng dẫn</h3>
          <ul className="space-y-1">
            <li>Đăng ký tài khoản</li>
            <li>Góp ý kiến</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="text-sm">
          <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
          <p>Bộ phận tiếp nhận</p>
          <p className="text-yellow-400 font-bold">(028) 3740 0509</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
