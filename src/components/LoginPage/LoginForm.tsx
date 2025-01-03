import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail, Loader2, AlertCircle } from "lucide-react";
import { login } from '../../services/auth/api';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login({ username: email, password });
      navigate("/upload");
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Civic Bot
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Đăng nhập tài khoản admin để tiếp tục
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div role="alert" className="flex items-center gap-2 p-3 text-sm font-medium bg-red-50 border-l-4 border-red-500 text-red-700">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                />
                <span className="text-sm text-gray-600">Nhớ tài khoản</span>
              </label>
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700 hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Không có tài khoản?</span>{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 hover:underline"
              >
                Đăng kí
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
