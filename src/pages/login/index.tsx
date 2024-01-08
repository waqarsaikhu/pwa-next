import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { TextField, Skeleton, InputAdornment } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();

  const handlePhoneNumberChange = (event: any) => {
    const value = event.target.value;
    setPh(value);
  };

  const isValidPhoneNumber = () => {
    return /^3\d{9}$/.test(ph);
  };

  const handleOtpChange = (event: any) => {
    const value = event.target.value.replace(/\D/g, "");
    setOtp(value.slice(0, 6));
  };

  function onCaptchVerify() {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            onSignUp();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  function onSignUp() {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = (window as any).recaptchaVerifier;

    const formatPh = "+92" + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        (window as any).confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        console.log("OTP Sent Successfully");
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error sending OTP:", error.message);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    (window as any).confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        setLoading(false);
        console.log("Response:", res);
        router.push("/home");
        alert("OTP verification successful!");
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <div id="recaptcha-container"></div>
      <div className="items-center flex flex-col w-[360px] h-[800px] mx-auto">
        <div className="flex flex-col mt-[32px]">
          <Skeleton
            sx={{
              borderRadius: "24px",
              backgroundColor: "#F1F1F1",
            }}
            animation={false}
            variant="rectangular"
            width={139}
            height={139}
          />
        </div>
        {showOTP ? (
          <>
            {" "}
            <div className="flex flex-col items-center">
              <span className="font-bold text-[24px] mt-[10px] text-center">
                Log In
              </span>
              <label className="!mt-[50px] text-[12px] !text-left">
                Enter the OTP sent to
                <span className="font-bold"> Phone No</span>
              </label>
              <TextField
                className="mt-[10px]"
                type="text"
                variant="standard"
                label="OTP"
                inputProps={{
                  inputMode: "numeric", // Show numeric keyboard on mobile devices
                  pattern: "[0-9]*", // Allow only numeric input
                  maxLength: 6,
                }}
                value={otp}
                onChange={handleOtpChange}
              />

              <Button
                onClick={onOTPVerify}
                size="small"
                // variant="contained"
                className="w-full !bg-black !hover:bg-black !mt-[10px] !text-white"
              >
                Verify OTP
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[24px] mt-[10px] text-center">
                Log In
              </span>
              <TextField
                className="!mt-[150px]"
                type="tel"
                variant="standard"
                label="Phone No"
                value={ph}
                onChange={handlePhoneNumberChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {ph.length !== 0 &&
                        (isValidPhoneNumber() ? (
                          <span style={{ color: "green" }}>
                            <CheckCircleIcon />
                          </span>
                        ) : (
                          <span style={{ color: "red" }}>
                            <ErrorIcon />
                          </span>
                        ))}
                    </InputAdornment>
                  ),
                }}
              />
              <span className="!mt-[25px]">
                <Button
                  onClick={onSignUp}
                  size="small"
                  variant="contained"
                  className="bg-primary"
                  disabled={!isValidPhoneNumber() || loading}
                >
                  Get OTP
                </Button>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
