import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
const StartPage = () => {
  return (
    <>
      <div className="items-center flex flex-col mx-auto">
        <div className="mt-[195px]">
          <Skeleton
            sx={{
              borderRadius: "24px",
              backgroundColor: "#F1F1F1",
              // marginTop: "195px",
            }}
            animation={false}
            variant="rectangular"
            width={139}
            height={139}
          />
          <div className="flex flex-col text-center">
            <span className="text-[24px] font-bold mt-[15px] ">Name</span>
            <span className="text-[17px]">Tagline</span>
          </div>
        </div>
        <div className="bg-[#F0F0F0] mt-[105px] h-[297px] w-full ]">
          <div className="flex flex-col mt-[30px] ml-[42px] mr-[42px] text-justify">
            <span className="font-bold text-[24px]">Welcome!</span>
            <span className="mt-[10px] text-[10px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit fuga
              obcaecati in iure, quos perspiciatis ab commodi enim rem?
              Dignissimos magni maxime labore officiis maiores amet repellat ut
              possimus unde.
            </span>
          </div>
          <div className="flex justify-center items-center md:mx-[580px] mx-[120px] p-1 bg-white mt-[70px] width-[174px]">
            <Link href="/login">
              <Button className="bg-primary" size="small" variant="contained">
                LOG IN
              </Button>
            </Link>
            <Button className="ml-[10px]" size="small" variant="outlined">
              REGISTER
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default StartPage;
