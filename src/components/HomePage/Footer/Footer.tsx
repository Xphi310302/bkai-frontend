import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-white py-8">
      {/* Top Section */}
      <div className="bg-white flex justify-around items-center text-center p-6 border-y">
        <div className="flex items-center gap-2">
          <img src="/images/footer1.png" alt="Biểu phí dịch vụ" />

          <div>
            <h3 className="text-[#2fac45] font-bold text-left text-xl">
              BIỂU PHÍ DỊCH VỤ
            </h3>
            <p className="text-black">Khi nộp hồ sơ qua đường Bưu điện</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/footer2.png" alt="Biểu phí dịch vụ" />
          <div>
            <h3 className="text-yellow-500 font-bold text-left text-xl">
              HỘP THƯ GÓP Ý
            </h3>
            <p className="text-black">Tiếp nhận ý kiến của tổ chức, cá nhân</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="/images/footer3.png" alt="Biểu phí dịch vụ" />
          <div>
            <h3 className="text-red-500 font-bold text-left text-xl">
              CÂU HỎI THƯỜNG GẶP
            </h3>
            <p className="text-black">
              Trả lời cho các câu hỏi mà bạn cần biết
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#4a5a50] text-white py-2 border-gray-400 border-y">
        <nav className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">
            Trang chủ
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Thủ tục hành chính
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Tra cứu kết quả hồ sơ
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Thống kê
          </a>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#4a5a50] flex justify-between items-start px-60 pt-6 pb-28">
        {" "}
        {/* Increased bottom padding */}
        {/* Left Side */}
        <div>
          <div className="flex items-center gap-3 mb-4 my-10">
            <img
              src="/images/layout_set_logo.png" // Placeholder logo
              alt="Thủ Đức Logo"
            />
          </div>
          <p className="text-sm mb-4 ">
            {" "}
            {/* Increased vertical spacing */}
            Địa chỉ: 168 Trương Văn Bang, Phường Thạnh Mỹ Lợi, TP Thủ Đức, Tp.
            Hồ Chí Minh
          </p>
          <p className="text-sm mb-4">
            {" "}
            {/* Increased vertical spacing */}
            Điện thoại: (028) 3740 0509
          </p>
          <p className="text-sm mb-4">
            {" "}
            {/* Increased vertical spacing */}
            Email: tphuthuduc@tphcm.gov.vn
          </p>
        </div>
        {/* Center Section */}
        <div className="text-base space-y-4 my-10">
          {" "}
          {/* Increased vertical spacing */}
          <h3 className="font-semibold mb-2">Dịch vụ</h3>{" "}
          {/* Increased vertical spacing */}
          <ul className="space-y-2 text-sm">
            {" "}
            {/* Increased spacing */}
            <li>Thủ tục hành chính</li>
            <li>Tra cứu kết quả hồ sơ</li>
            <li>Thống kê</li>
          </ul>
        </div>
        {/* Right Section */}
        <div className="text-base space-y-4 my-10">
          {" "}
          {/* Increased vertical spacing */}
          <h3 className="font-semibold mb-2">Hướng dẫn</h3>{" "}
          {/* Increased vertical spacing */}
          <ul className="space-y-2 text-sm">
            {" "}
            {/* Increased spacing */}
            <li>Đăng ký tài khoản</li>
            <li>Góp ý kiến</li>
          </ul>
        </div>
        {/* Support Section */}
        <div className="text-base space-y-4 my-10">
          {" "}
          {/* Increased vertical spacing */}
          <h3 className="font-semibold mb-2">Hỗ trợ trực tuyến</h3>{" "}
          {/* Increased vertical spacing */}
          <p className="text-sm">Bộ phận tiếp nhận</p>
          <p className="text-yellow-400 font-bold">(028) 3740 0509</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
