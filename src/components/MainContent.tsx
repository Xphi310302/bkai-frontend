import React from 'react';
import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <div className="search-content">
        <div className="search-box">
          <h1>TRA CỨU THÔNG TIN</h1>
          <h3>Nhập <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Số biên nhận</span> hoặc <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Tên thủ tục hành chính</span>  để tra cứu thông tin</h3>
          <input type="text" placeholder="Nhập Số biên nhận hoặc Mã hồ sơ..." />
          <select>
            <option value="type1">Kết quả hồ sơ</option>
            <option value="type2">Thủ tục hành chính</option>
          </select>
          <button>TRA CỨU</button>
        </div>
      </div>
      <div className="guide-content">
          <div className="header">TRA CỨU HỒ SƠ TRỰC TUYẾN</div>
          <div className="subheader">
              <font >Với 4 bước đơn giản Người dân, Doanh nghiệp và Tổ chức có thể nộp hồ sơ trực tuyến và nhận kết quả tại nhà.</font>
          </div>
          
          <div className="steps">
              <div className="step">
                  <img src="icon1.png" alt="Icon 1" />
                  <div className="step-title">1. Đăng ký tài khoản</div>
                  <div className="step-description">
                      Để nộp, tổ chức, cá nhân đăng ký tài khoản để có thể nộp hồ sơ và theo dõi kết quả.
                  </div>
              </div>
              <div className="step">
                  <img src="icon2.png" alt="Icon 2" />
                  <div className="step-title">2. Đăng nhập và Tạo hồ sơ</div>
                  <div className="step-description">
                      Người dân và tổ chức đăng nhập vào hệ thống và tạo hồ sơ cần nộp.
                  </div>
              </div>
              <div className="step">
                  <img src="icon3.png" alt="Icon 3" />
                  <div className="step-title">3. Thẩm định và Xử lý</div>
                  <div className="step-description">
                      Hồ sơ được gửi đến cơ quan chức năng để thẩm định và xử lý.
                  </div>
              </div>
              <div className="step">
                  <img src="icon4.png" alt="Icon 4" />
                  <div className="step-title">4. Nhận kết quả</div>
                  <div className="step-description">
                      Người dân và tổ chức có thể nhận kết quả tại nhà hoặc tại cơ quan.
                  </div>
              </div>
          </div>
      </div>
    </main>
  );
};

export default MainContent;