import React from "react";

const MainContent: React.FC = () => {
  return (
    <main className="text-center">
      <div 
        className="flex items-center justify-center min-h-[500px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/slide-tpthuduc.jpg')" }}
      >
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-bold text-white text-shadow-lg [-webkit-text-stroke:0.8px_black] mb-4">
            TRA CỨU THÔNG TIN
          </h1>
          <h3 className="text-lg md:text-xl text-white text-shadow-md [-webkit-text-stroke:0.2px_black] mb-6">
            Nhập{" "}
            <span className="text-xl md:text-2xl font-bold">Số biên nhận</span>{" "}
            hoặc{" "}
            <span className="text-xl md:text-2xl font-bold">
              Tên thủ tục hành chính
            </span>{" "}
            để tra cứu thông tin
          </h3>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              placeholder="Nhập Số biên nhận hoặc Mã hồ sơ..."
              className="w-full md:w-[300px] p-2.5 border border-gray-300 rounded text-black bg-white"
            />
            <select className="w-full md:w-[200px] p-2.5 border border-gray-300 rounded text-black bg-white font-bold">
              <option value="type1">Kết quả hồ sơ</option>
              <option value="type2">Thủ tục hành chính</option>
            </select>
            <button className="w-full md:w-auto px-5 py-2.5 bg-[#dda01c] hover:bg-[#ee720c] text-white rounded transition-colors">
              TRA CỨU
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8">
        <div className="my-8 md:my-14 py-4 md:py-6">
          <div className="text-lime-600 text-2xl md:text-3xl font-bold">
            TRA CỨU HỒ SƠ TRỰC TUYẾN
          </div>
          <div className="text-base md:text-lg mt-4">
            Với 4 bước đơn giản Người dân, Doanh nghiệp và Tổ chức có thể nộp hồ
            sơ trực tuyến và nhận kết quả tại nhà.
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-4 pb-12 md:pb-24">
          {[
            {
              image: "/images/dang-ki-tai-khoan.png",
              number: "1",
              title: "Đăng ký tài khoản",
              description:
                "Tổ chức, Cá nhân đăng ký tài khoản để có thể nộp hồ sơ trực tuyến và theo dõi quy trình xử lý hồ sơ của mình.",
            },
            {
              image: "/images/dang-nhap-va-tra-cuu.png",
              number: "2",
              title: "Đăng nhập và Tra Cứu",
              description:
                "Đăng nhập vào hệ thống để nộp hồ sơ trực tuyến và sử dụng dụng nhiều tiện ích hệ thống cung cấp.",
            },
            {
              image: "/images/tham-dinh-va-xu-ly.png",
              number: "3",
              title: "Thẩm định và Xử lý",
              description:
                "Đăng nhập vào hệ thống để nộp hồ sơ trực tuyến và sử dụng dụng nhiều tiện ích hệ thống cung cấp.",
            },
            {
              image: "/images/nhan-ket-qua.png",
              number: "4",
              title: "Nhận kết quả",
              description:
                "Nhận kết quả trực tiếp tại bộ phận một cửa hoặc qua đường bưu điện.",
            },
          ].map((step, index) => (
            <div key={index} className="flex-1 px-4">
              <div className="bg-lime-600 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img src={step.image} className="mx-auto" alt={step.title} />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="text-4xl md:text-6xl text-slate-500/20">{step.number}.</div>
                <div className="font-bold text-base md:text-lg">{step.title}</div>
              </div>
              <p className="text-sm md:text-base text-balance py-3 px-4 md:px-8">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
