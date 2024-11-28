import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-white">
      {/* Top Section */}
      <div className="bg-white flex flex-col md:flex-row justify-around items-center text-center p-4 md:p-6 border-y gap-6 md:gap-4">
        {[
          {
            image: "/images/footer1.png",
            title: "BIỂU PHÍ DỊCH VỤ",
            description: "Khi nộp hồ sơ qua đường Bưu điện",
            titleColor: "text-[#2fac45]"
          },
          {
            image: "/images/footer2.png",
            title: "HỘP THƯ GÓP Ý",
            description: "Tiếp nhận ý kiến của tổ chức, cá nhân",
            titleColor: "text-yellow-500"
          },
          {
            image: "/images/footer3.png",
            title: "CÂU HỎI THƯỜNG GẶP",
            description: "Trả lời cho các câu hỏi mà bạn cần biết",
            titleColor: "text-red-500"
          }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={item.image} alt={item.title} className="w-12 h-12" />
            <div>
              <h3 className={`${item.titleColor} font-bold text-left text-lg md:text-xl`}>
                {item.title}
              </h3>
              <p className="text-black text-sm md:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Section */}
      <div className="bg-[#4a5a50] text-white py-2 border-gray-400 border-y">
        <nav className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-sm md:text-base">
          {[
            "Trang chủ",
            "Thủ tục hành chính",
            "Tra cứu kết quả hồ sơ",
            "Thống kê"
          ].map((item, index) => (
            <React.Fragment key={index}>
              <a href="#" className="hover:underline">
                {item}
              </a>
              {index < 3 && <span className="hidden md:inline">|</span>}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#4a5a50] flex flex-col md:flex-row justify-between items-center md:items-start px-4 md:px-60 pt-6 pb-16 md:pb-28 gap-8 md:gap-4">
        {/* Left Side */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4 my-6 md:my-10">
            <img
              src="/images/layout_set_logo.png"
              alt="Thủ Đức Logo"
              className="max-w-[200px] md:max-w-none"
            />
          </div>
          <div className="space-y-3 md:space-y-4 text-sm">
            <p>
              Địa chỉ: 168 Trương Văn Bang, Phường Thạnh Mỹ Lợi, TP Thủ Đức, Tp.
              Hồ Chí Minh
            </p>
            <p>Điện thoại: (028) 3740 0509</p>
            <p>Email: tphuthuduc@tphcm.gov.vn</p>
          </div>
        </div>

        {/* Center Section */}
        <div className="text-center md:text-left space-y-4 my-6 md:my-10">
          <h3 className="font-semibold text-lg">Dịch vụ</h3>
          <ul className="space-y-2 text-sm">
            <li>Thủ tục hành chính</li>
            <li>Tra cứu kết quả hồ sơ</li>
            <li>Thống kê</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
