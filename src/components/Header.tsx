import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src="/assets/images/layout_set_logo.png" alt="UBND Thành Phố Thủ Đức" /> {/* Add your logo image */}
          {/* <span>UBND THÀNH PHỐ THỦ ĐỨC</span> */}
        </div>
        <div className='top-right-content'>
          <div className="contact-info">
            <span>📞 (028) 3740 0509</span>
            <span>✉️ tpthuduc@tphcm.gov.vn</span>
          </div>
          <div className="auth-buttons">
            <button className="create-account">Tạo tài khoản</button>
            <button className="login">Đăng nhập</button>
          </div>
        </div>
      </div>

      <div className="header-main">
        <nav>
          <ul className="menu">
            <li className='homepage'>
              <button >
                <img src="/assets/images/icHome-hv.png" alt="Home"/>
              </button>
            </li>
            <li><button>THỦ TỤC HÀNH CHÍNH</button></li>
            <li><button>TRA CỨU KẾT QUẢ HỒ SƠ</button></li>
            <li><button>THỐNG KÊ</button></li>
            <li><button>ĐĂNG KÝ THI ĐUA GIA ĐÌNH VĂN HÓA</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
