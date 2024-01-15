import React from "react";
import {
  Button,
  Skeleton,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "next/link";
import MeasurmentTable from "@/components/MeasurmentTable";

const ClientInfo = () => {
  return (
    <>
      <div className=" flex flex-col justify-center mb-[10px]">
        <div className="h-[114px] w-screen flex justify-center bg-[#F8F8F8] absolute top-0">
          <div className=" absolute top-[27px] left-[25px]">
            <Link href="/home">
              <Button>
                <span className="text-black">
                  <ArrowBackIosNewIcon fontSize="small" />
                  Back
                </span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-row">
            <div className="text-center mt-[87px] mr-[27px]">
              <Avatar sx={{ bgcolor: "#939393", width: 42, height: 42 }}>
                <span>
                  <ChatBubbleIcon fontSize="small" />
                </span>
              </Avatar>
              <span className="text-[10px] text-[#6C6C6C]">Message</span>
            </div>
            <div className="mt-[63px] flex flex-col text-center">
              <Avatar sx={{ bgcolor: "#6C6C6C", width: 87, height: 87 }}>
                HK
              </Avatar>
              <span className="text-[15px] font-bold text-[#000000] mt-[7px] ">
                Hassan
              </span>
              <span className="text-[12px] text-[#5E8EDA]">0900-1782683</span>
            </div>
            <div className="text-center mt-[87px] ml-[27px]">
              <Avatar sx={{ bgcolor: "#939393", width: 42, height: 42 }}>
                <span>
                  <PhoneIcon fontSize="small" />
                </span>
              </Avatar>
              <span className="text-[10px] text-[#6C6C6C]">Call</span>
            </div>
          </div>
          <div>
            <span className="absolute right-[30px] top-[32px] flex">
              <MoreVertIcon />
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[209px]">
          <div className="w-[300px] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
            <span className="text-[11px] text-[#000] ml-[15px]">
              Client Address
            </span>
          </div>
          <div className="w-[300px] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
            <span className="text-[11px] text-[#000] ml-[15px]">
              Delivery Date
            </span>
            <span className="text-[10px] ml-[170px] text-[#5E8EDA]">
              Set Date
            </span>
          </div>
          <div className="w-[300px] h-[36px] rounded-[19px] bg-[#F8F8F8] mt-[18px] items-center flex">
            <span className="text-[11px] text-[#000] ml-[15px]">
              Remind Date
            </span>
            <span className="text-[10px] ml-[170px] text-[#5E8EDA]">
              Set Date
            </span>
          </div>
        </div>
        <div className="flex items-center flex-col justify-center">
          <span className="text-[11px] mt-[18px] text-[#000]">
            Payment Status
          </span>
          <div className="flex flex-row w-[311px] h-[52px] bg-[#F8F8F8] rounded-[19px]">
            <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
              <span className="text-[10px] text-center text-[#000]">
                Total Amount
              </span>
              <span className="text-[10px] text-center text-[#939393]">
                0.0
              </span>
            </div>
            <div className="flex flex-col justify-center items-center w-[100px] h-[15px] mt-[20px] ml-[15px]">
              <span className="text-[10px] text-center text-[#000]">
                Advance Payment{" "}
              </span>
              <span className="text-[10px] text-center text-[#939393]">
                0.0
              </span>
            </div>
            <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
              <span className="text-[10px] text-center text-[#FF0000]">
                Due Amount
              </span>
              <span className="text-[10px] text-center text-[#FF0000]">
                0.0
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[11px] mt-[16px] text-[#000]">
            Measurements
          </span>
          <MeasurmentTable />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[311px] h-[58px] rounded-[19px] mt-[7px] bg-[#F8F8F8]">
            <span className="text-[10px] mt-[3px] ml-[12px]">Notes: </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientInfo;
