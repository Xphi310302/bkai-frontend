import React from "react";
import LoginForm from "../components/LoginPage/LoginForm"; // Ensure the path is correct

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 min-h-screen font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        {/* <h2 className="text-center text-4xl font-bold">UBND TP THỦ ĐỨC</h2> */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
