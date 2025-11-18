import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { login, verifyOtp } from "~/api/auth.api";
import { getAuthToken } from "~/utils/auth";

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: ({ location }) => {
    // Redirect to dashboard if already logged in
    if (getAuthToken()) {
      throw new Error("Redirect to dashboard");
    }
  },
  head: () => ({
    meta: [
      {
        title: "Login | Edu Assist AI",
        description: "Login to your Edu Assist AI account",
      },
    ],
  }),
});

function Login() {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return;

    setIsLoading(true);

    const response = await login(phoneNumber)
      .then((res) => res)
      .catch(() => null);

    if (!response) {
      setIsLoading(false);
      toast.error("Failed to send OTP");
      return;
    }

    setIsLoading(false);
    toast.success("OTP sent successfully");
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;

    setIsLoading(true);
    const response = await verifyOtp(phoneNumber, otp)
      .then((res) => res.message.data)
      .catch(() => null);

    if (!response) {
      setIsLoading(false);
      toast.error("Failed to verify OTP");
      return;
    }

    toast.success("Logged in successfully");
    document.cookie = `auth-token=${response.access_token}; path=/; max-age=86400`;
    setIsLoading(false);
    router.navigate({ to: "/profile" });
  };

  const handleBack = () => {
    setStep("phone");
    setOtp("");
  };

  return (
    <div className="min-h-screen flex bg-[#0f1117]">
      {/* Left Side - Desktop Only - Illustration/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600/20 via-primary-700/10 to-primary-900/5 relative overflow-hidden border-r border-zinc-800">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="max-w-md">
            <div className="mb-8">
              <button
                onClick={() => router.navigate({ to: "/" })}
                className="inline-block mb-6 hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <svg
                    className="w-10 h-10 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
              </button>
              <h1 className="font-heading text-5xl font-bold mb-4 leading-tight">
                Welcome to
                <br />
                Edu Assist AI
              </h1>
              <p className="font-afacad text-xl text-white/80 leading-relaxed">
                Your intelligent companion for NCERT textbooks. Learn smarter,
                faster, and better with AI-powered assistance.
              </p>
            </div>

            <div className="space-y-4 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-afacad text-lg">Instant answers from textbooks</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-afacad text-lg">Track your learning progress</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-afacad text-lg">Personalized learning experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#0f1117]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-12">
            <button
              onClick={() => router.navigate({ to: "/" })}
              className="inline-flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
                <svg
                  className="w-10 h-10 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">
                Edu Assist AI
              </h2>
            </button>
          </div>

          {/* Login Form - No Card, Direct on Background */}
          <div className="animate-fade-in">
            <div className="mb-10">
              <h2 className="font-afacad text-4xl font-bold text-white mb-3">
                {step === "phone" ? "Login" : "Verify OTP"}
              </h2>
              <p className="font-afacad text-gray-400 text-base">
                {step === "phone"
                  ? "Enter your credentials to access your account"
                  : `Enter the 6-digit code sent to +91 ${phoneNumber}`}
              </p>
            </div>

            {step === "phone" ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="font-afacad text-sm font-medium text-gray-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="font-afacad text-gray-500 font-medium">
                        +91
                      </span>
                    </div>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="pl-14 py-6 text-base bg-[#1a1a24] border border-zinc-800 text-white placeholder:text-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg transition-all"
                      maxLength={10}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length < 10 || isLoading}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-base rounded-lg hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                <button
                  onClick={() => router.navigate({ to: "/" })}
                  className="w-full py-4 text-gray-400 hover:text-white font-afacad font-medium text-base transition-colors"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-5">
                  <label className="font-afacad text-sm font-medium text-gray-400 block text-center">
                    Enter 6-digit OTP
                  </label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="gap-3">
                        <InputOTPSlot
                          index={0}
                          className="text-xl font-semibold w-14 h-14 bg-[#1a1a24] border border-zinc-800 text-white rounded-lg focus:border-amber-500"
                        />
                        <InputOTPSlot
                          index={1}
                          className="text-xl font-semibold w-14 h-14 bg-[#1a1a24] border border-zinc-800 text-white rounded-lg focus:border-amber-500"
                        />
                        <InputOTPSlot
                          index={2}
                          className="text-xl font-semibold w-14 h-14 bg-[#1a1a24] border border-zinc-800 text-white rounded-lg focus:border-amber-500"
                        />
                        <InputOTPSlot
                          index={3}
                          className="text-xl font-semibold w-14 h-14 bg-[#1a1a24] border border-zinc-800 text-white rounded-lg focus:border-amber-500"
                        />
                        <InputOTPSlot
                          index={4}
                          className="text-xl font-semibold w-14 h-14 bg-[#1a1a24] border border-zinc-800 text-white rounded-lg focus:border-amber-500"
                        />
                        <InputOTPSlot
                          index={5}
                          className="text-xl font-semibold w-14 h-14 bg-[#1a1a24] border border-zinc-800 text-white rounded-lg focus:border-amber-500"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={otp.length < 6 || isLoading}
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-base rounded-lg hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify & Login"
                    )}
                  </button>

                  <button
                    onClick={handleBack}
                    className="w-full py-4 text-gray-400 hover:text-white font-afacad font-medium text-base transition-colors"
                  >
                    Back
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="font-afacad text-gray-500 hover:text-primary-400 font-medium text-sm underline disabled:opacity-50 transition-colors"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
              )}

            {/* Footer */}
            <div className="mt-8 space-y-4">
              {step === "phone" && (
                <p className="text-center font-afacad text-sm text-gray-400">
                  Not a member?{" "}
                  <a href="#" className="text-amber-500 hover:text-amber-400 font-semibold">
                    Create an account
                  </a>
                </p>
              )}
              <p className="text-center font-afacad text-xs text-gray-600">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-gray-500 hover:text-amber-400 underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-gray-500 hover:text-amber-400 underline">
                    Privacy Policy
                  </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

