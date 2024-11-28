import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#08261d] to-[#114032] text-white w-screen box-border font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center py-2.5 w-full px-4 md:px-0 md:w-[1200px] mx-auto text-[0.9rem]">
        <div className="logo w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0">
          <img src="images/layout_set_logo.png" alt="UBND Thành Phố Thủ Đức" className="max-w-[200px] md:max-w-none" />
        </div>
        <div className="flex flex-col items-center md:items-end gap-4 md:gap-6 w-full md:w-auto">
          <div className="contact-info text-center md:text-right">
            <span className="block md:inline mr-0 md:mr-4 mb-2 md:mb-0"> (028) 3740 0509</span>
            <span className="block md:inline"> tpthuduc@tphcm.gov.vn</span>
          </div>
          <div className="flex gap-2.5 ml-0 md:ml-[108px]">
            <button className="bg-[#004d40] text-white border border-white px-2.5 py-1.5 cursor-pointer transition-colors hover:bg-white/20 text-sm md:text-base">
              Tạo tài khoản
            </button>
            <button className="bg-[#004d40] text-white border border-white px-2.5 py-1.5 cursor-pointer transition-colors hover:bg-white/20 text-sm md:text-base">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>

      <div className="block w-full m-0 text-center relative bg-white px-2.5">
        <nav className="relative">
          {/* Mobile menu button */}
          <button 
            className="md:hidden w-full py-2 bg-white text-black flex items-center justify-center gap-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="block w-6 h-px bg-black mb-1"></span>
            <span className="block w-6 h-px bg-black mb-1"></span>
            <span className="block w-6 h-px bg-black"></span>
          </button>

          <ul className={`list-none flex-col md:flex-row md:flex gap-2 md:gap-10 m-0 py-2.5 justify-center ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}>
            <li>
              <button className="relative w-full md:w-auto">
                <img src="images/icHome-hv.png" alt="Home" className="w-[18px] h-[18px] relative top-[1px] mx-auto" />
              </button>
            </li>
            {[
              'THỦ TỤC HÀNH CHÍNH',
              'TRA CỨU KẾT QUẢ HỒ SƠ',
              'THỐNG KÊ',
              'ĐĂNG KÝ THI ĐUA GIA ĐÌNH VĂN HÓA'
            ].map((text, index) => (
              <li key={index} className="w-full md:w-auto">
                <button className="w-full md:w-auto bg-transparent text-black border-none text-sm md:text-base cursor-pointer transition-all font-bold hover:bg-white/20 hover:text-green-600 py-2 md:py-0 px-2 md:px-0">
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
