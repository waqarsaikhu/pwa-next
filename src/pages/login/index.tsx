import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { TextField, Skeleton, InputAdornment } from "@mui/material";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase.config";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

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
          "expired-callback": () => { },
        }
      );
    }
  }

  const onSignUp = async () => {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = (window as any).recaptchaVerifier;
    const formatPh = "+92" + ph;
    await signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        (window as any).confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        alert("OTP sent successfullly!");
        console.log("OTP Sent Successfully");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error.message);
        setLoading(false);
      });
  };

  function onOTPVerify() {
    setLoading(true);
    (window as any).confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        setLoading(false);
        const usersCollection = doc(firestore, "users", res.user.uid);
        const userDocSnapshot = await getDoc(usersCollection);
        const userExists = userDocSnapshot.exists();
        if (!userExists) {
          await setDoc(usersCollection, {
            id: res.user.uid,
            phoneNumber: "+92" + ph,
          });
        }
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
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 6,
                }}
                value={otp}
                onChange={handleOtpChange}
              />

              <Button
                onClick={onOTPVerify}
                size="small"
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
                placeholder="3211234567"
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
