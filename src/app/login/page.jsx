"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (type) => {
    if (type === "user") {
      setEmail("alex@gmail.com");
      setPassword("123");
    } else if (type === "admin") {
      setEmail("admin@gmail.com");
      setPassword("456");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-light-gray py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray/5">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-blue">Welcome Back</h2>
          <p className="text-gray mt-2">Login to your QuickHire account</p>
        </div>

        {/* Quick Login Buttons */}
        <div className="flex gap-2 mb-4">
          <button 
            type="button"
            onClick={() => handleQuickLogin("user")}
            className="flex-1 text-xs font-bold py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all"
          >
            User Login (Quick)
          </button>
          <button 
            type="button"
            onClick={() => handleQuickLogin("admin")}
            className="flex-1 text-xs font-bold py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-all"
          >
            Admin Login (Quick)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-dark-blue mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-semibold text-dark-blue">Password</label>
              <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot Password?</Link>
            </div>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray/20 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray">Or continue with</span>
          </div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 border border-gray/20 py-3 rounded-lg hover:bg-gray/5 transition-all font-semibold text-dark-blue"
        >
          <FcGoogle size={24} />
          Login with Google
        </button>

        <p className="text-center text-gray">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
