import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowLeft, Shield, Zap, Users } from "lucide-react";
import LoginButton from "@/components/auth/LoginButton";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </nav>

      <div className="relative z-10 flex min-h-[calc(100vh-120px)] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <Logo size="lg" />
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              Real-time messaging platform
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-white">
                Welcome back
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Sign in to continue to your account
              </p>
            </div>

            {/* Login Button */}
            <LoginButton />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  Secure authentication
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center">
                <Shield className="mr-3 h-4 w-4 text-green-600" />
                <span>Secure Google OAuth authentication</span>
              </div>
              <div className="flex items-center">
                <Zap className="mr-3 h-4 w-4 text-blue-600" />
                <span>Real-time messaging with WebSocket</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-3 h-4 w-4 text-purple-600" />
                <span>Connect with friends instantly</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              By signing in, you agree to our{" "}
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-400/10 blur-3xl" />
    </div>
  );
}

export default LoginPage;
