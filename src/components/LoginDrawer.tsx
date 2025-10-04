import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Input } from "~/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { login, verifyOtp } from "~/api/auth";

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
    router.navigate({ to: "/chat" });
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
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="bottom">
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className="!inset-y-auto !inset-x-0 !bottom-0 !top-auto !h-auto !w-full rounded-t-[10px]">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-2 mt-4" />

        <DrawerHeader className="text-center pb-6">
          <DrawerTitle className="font-afacad text-2xl font-medium">
            {step === "phone" ? "LOGIN" : "Enter OTP"}
          </DrawerTitle>
          <p className="text-base font-afacad text-gray-600 mt-2">
            {step === "phone"
              ? "Enter your phone number to continue"
              : `We sent a 6-digit code to ${phoneNumber}`}
          </p>
        </DrawerHeader>

        <div className="px-6 pb-6">
          {step === "phone" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-afacad text-base font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="font-afacad text-gray-500 text-lg">
                      +91
                    </span>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="py-6 pl-12 font-afacad text-lg"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSendOtp}
                  disabled={phoneNumber.length < 10 || isLoading}
                  className="w-full py-3 bg-[#2B2A47] text-white font-afacad text-lg rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>

                <DrawerClose asChild>
                  <button
                    onClick={handleClose}
                    className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-lg font-afacad rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </DrawerClose>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="font-afacad text-lg font-medium text-gray-700 block text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="font-afacad text-lg p-6"
                      />
                      <InputOTPSlot
                        index={1}
                        className="font-afacad text-lg p-6"
                      />
                      <InputOTPSlot
                        index={2}
                        className="font-afacad text-lg p-6"
                      />
                      <InputOTPSlot
                        index={3}
                        className="font-afacad text-lg p-6"
                      />
                      <InputOTPSlot
                        index={4}
                        className="font-afacad text-lg p-6"
                      />
                      <InputOTPSlot
                        index={5}
                        className="font-afacad text-lg p-6"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.length < 6 || isLoading}
                  className="w-full py-3 bg-[#2B2A47] text-white font-afacad text-lg rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {isLoading ? "Verifying..." : "Verify & Sign In"}
                </button>

                <button
                  onClick={handleBack}
                  className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-afacad text-lg rounded-xl transition-colors"
                >
                  Back
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSendOtp}
                  className="font-afacad text-blue-600 hover:text-blue-700 text-lg underline"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginDrawer;
