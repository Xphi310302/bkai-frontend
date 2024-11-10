import React from "react";
import "./MainContent.css";

const MainContent: React.FC = () => {
  return (
    <main className="main-content">
      <div className="search-content">
        <div className="search-box">
          <h1>TRA CỨU THÔNG TIN</h1>
          <h3>
            Nhập{" "}
            <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              Số biên nhận
            </span>{" "}
            hoặc{" "}
            <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
              Tên thủ tục hành chính
            </span>{" "}
            để tra cứu thông tin
          </h3>
          <input type="text" placeholder="Nhập Số biên nhận hoặc Mã hồ sơ..." />
          <select>
            <option value="type1">Kết quả hồ sơ</option>
            <option value="type2">Thủ tục hành chính</option>
          </select>
          <button>TRA CỨU</button>
        </div>
      </div>
      <div className="guide-content">
        <div className="my-14">
          <div className="text-lime-600 text-3xl font-bold">
            TRA CỨU HỒ SƠ TRỰC TUYẾN
          </div>
          <div className="subheader">
            Với 4 bước đơn giản Người dân, Doanh nghiệp và Tổ chức có thể nộp hồ
            sơ trực tuyến và nhận kết quả tại nhà.
          </div>
        </div>
        <div className="">
          <div className="flex items-stretch pb-24">
            <div className="step">
              <div className="bg-lime-600 w-16 h-16 flex items-center justify-center mx-auto">
                <img src="/images/dang-ki-tai-khoan.png" className="mx-auto" />
              </div>
              <h3 className="inline-flex items-center">
                <div className="text-6xl text-slate-500/20 ">1.</div>
                <div className="step-title ml-2 font-bold text-lg">
                  Đăng ký tài khoản
                </div>
              </h3>
              <h4 className="text-balance py-3 mx-20">
                Tổ chức, Cá nhân đăng ký tài khoản để có thể nộp hồ sơ trực
                tuyến và theo dõi quy trình xử lý hồ sơ của mình.
              </h4>
            </div>

            <div className="step">
              <div className="bg-lime-600 w-16 h-16 flex items-center justify-center mx-auto">
                <img
                  src="/images/dang-nhap-va-tra-cuu.png"
                  className="mx-auto"
                />
              </div>
              <h3 className="inline-flex items-center">
                <div className="text-6xl text-slate-500/20 ">2.</div>
                <div className="step-title ml-2 font-bold text-lg">
                  Đăng nhập và Tra Cứu
                </div>
              </h3>
              <h4 className="text-balance py-3 mx-20">
                Đăng nhập vào hệ thống để nộp hồ sơ trực tuyến và sử dụng dụng
                nhiều tiện ích hệ thống cung cấp.
              </h4>
            </div>

            <div className="step">
              <div className="bg-lime-600 w-16 h-16 flex items-center justify-center mx-auto">
                <img src="/images/tham-dinh-va-xu-ly.png" className="mx-auto" />
              </div>
              <h3 className="inline-flex items-center">
                <div className="text-6xl text-slate-500/20 ">3.</div>
                <div className="step-title ml-2 font-bold text-lg">
                  Thẩm định và Xử lý
                </div>
              </h3>
              <h4 className="text-balance py-3 mx-20">
                Đăng nhập vào hệ thống để nộp hồ sơ trực tuyến và sử dụng dụng
                nhiều tiện ích hệ thống cung cấp.
              </h4>
            </div>

            <div className="step">
              <div className="bg-lime-600 w-16 h-16 flex items-center justify-center mx-auto">
                <img src="/images/nhan-ket-qua.png" className="mx-auto" />
              </div>
              <h3 className="inline-flex items-center">
                <div className="text-6xl text-slate-500/20 ">4.</div>
                <div className="step-title ml-2 font-bold text-lg">
                  Nhận kết quả
                </div>
              </h3>
              <h4 className="text-balance py-3 mx-20">
                Mang giấy hẹn trả kết quả tới bộ phận tiếp nhận và trả kết quả
                để nhận kết quả xử lý hồ sơ của mình.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
