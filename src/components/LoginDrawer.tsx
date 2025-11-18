import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { Input } from "~/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { login, verifyOtp } from "~/api/auth.api";

type LoginDrawerProps = {
  trigger?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const LoginDrawer = ({ trigger, isOpen, onOpenChange }: LoginDrawerProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isControlled = isOpen !== undefined && onOpenChange !== undefined;
  const drawerOpen = isControlled ? isOpen : open;
  const setDrawerOpen = isControlled ? onOpenChange : setOpen;

  useEffect(() => {
    if (drawerOpen) {
      setStep("phone");
      setPhoneNumber("");
      setOtp("");
    }
  }, [drawerOpen]);

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
    setDrawerOpen(false);
    router.navigate({ to: "/profile" });
  };

  const handleBack = () => {
    setStep("phone");
    setOtp("");
  };

  const handleClose = () => {
    setDrawerOpen(false);
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
  };

  return (
    <>
      {trigger && (
        <button onClick={() => setDrawerOpen(true)}>{trigger}</button>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#0f1117]">
          {/* Header with close button */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center border-b border-zinc-800 bg-[#0f1117]/80 backdrop-blur-sm z-10">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="font-afacad font-semibold text-lg text-white">
              {step === "phone" ? "Login" : "Verify OTP"}
            </h3>
            <div className="w-10"></div>
          </div>

          {/* Content */}
          <div className="h-full flex flex-col items-center justify-center p-6 pt-20">
            <div className="w-full max-w-md">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl items-center justify-center mb-4 shadow-lg shadow-primary-500/30">
                  <svg
                    className="w-12 h-12 text-white"
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
                <h1 className="font-afacad text-3xl font-bold text-white mb-2">
                  Edu Assist AI
                </h1>
                <p className="font-afacad text-gray-400">
                  {step === "phone"
                    ? "Enter your phone number to get started"
                    : `We sent a code to +91 ${phoneNumber}`}
                </p>
              </div>

              {/* Form */}
              {step === "phone" ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="font-afacad text-sm font-semibold text-gray-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="font-afacad text-gray-400 font-medium">
                          +91
                        </span>
                      </div>
                      <Input
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={phoneNumber}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        className="pl-14 py-6 text-lg bg-zinc-800 border-2 border-zinc-700 text-white placeholder:text-gray-500 focus:border-amber-500 rounded-xl"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={phoneNumber.length < 10 || isLoading}
                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
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
                      "Send OTP"
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="font-afacad text-sm font-semibold text-gray-300 block text-center">
                      Enter 6-digit OTP
                    </label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot
                            index={0}
                            className="text-xl font-semibold w-12 h-14 bg-zinc-800 border-2 border-zinc-700 text-white rounded-xl focus:border-amber-500"
                          />
                          <InputOTPSlot
                            index={1}
                            className="text-xl font-semibold w-12 h-14 bg-zinc-800 border-2 border-zinc-700 text-white rounded-xl focus:border-amber-500"
                          />
                          <InputOTPSlot
                            index={2}
                            className="text-xl font-semibold w-12 h-14 bg-zinc-800 border-2 border-zinc-700 text-white rounded-xl focus:border-amber-500"
                          />
                          <InputOTPSlot
                            index={3}
                            className="text-xl font-semibold w-12 h-14 bg-zinc-800 border-2 border-zinc-700 text-white rounded-xl focus:border-amber-500"
                          />
                          <InputOTPSlot
                            index={4}
                            className="text-xl font-semibold w-12 h-14 bg-zinc-800 border-2 border-zinc-700 text-white rounded-xl focus:border-amber-500"
                          />
                          <InputOTPSlot
                            index={5}
                            className="text-xl font-semibold w-12 h-14 bg-zinc-800 border-2 border-zinc-700 text-white rounded-xl focus:border-amber-500"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 6 || isLoading}
                      className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]"
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
                      className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-afacad font-semibold text-lg rounded-xl border border-zinc-700 transition-all duration-300"
                    >
                      Back
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="text-amber-500 hover:text-amber-400 font-semibold underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
            <p className="text-center mt-8 text-sm text-gray-400">
              By continuing, you agree to our{" "}
              <a href="#" className="text-amber-500 hover:text-amber-400 font-semibold">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-amber-500 hover:text-amber-400 font-semibold">
                Privacy Policy
              </a>
            </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginDrawer;
