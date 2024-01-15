import React from "react";
import { Button, Skeleton, TextField, InputAdornment } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "next/link";
import MeasurmentTable from "@/components/MeasurmentTable";

const ClientDetails = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#FFF] mb-[10px]">
        <div className=" w-screen bg-[#F8F8F8] border-b-[1px] mt-[0px] rounded-t-[5px] mx-aut0">
          <div className="mt-[32px] ml-[25px]">
            <Link href="/home">
              <Button>
                <span className="text-black">
                  <ArrowBackIosNewIcon fontSize="small" />
                  Back
                </span>
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <span className="text-[18px] font-bold text-center">
              Client Name
            </span>
          </div>
          <div>
            <span className="absolute right-[30px] top-[32px] flex">
              <MoreVertIcon />
            </span>
          </div>
          <div className="flex justify-center mt-[24px] mb-[18px] ">
            <div className="text-center">
              <Skeleton
                sx={{
                  borderRadius: "100%",
                  backgroundColor: "#D9D9D9",
                }}
                animation={false}
                variant="rectangular"
                width={110}
                height={110}
              />
              <div className="mt-[7px] text-[12px] text-[#595959]">
                Client Photo
              </div>
            </div>
            <div className="text-center ml-[65px]">
              <Skeleton
                sx={{
                  borderRadius: "100%",
                  backgroundColor: "#D9D9D9",
                }}
                animation={false}
                variant="rectangular"
                width={110}
                height={110}
              />
              <div className="mt-[7px] text-[12px] text-[#595959]">
                Cloth Photo
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-[64px] w-[284px] mx-[38px]">
          <TextField label="Client Name" variant="standard" />
          <TextField
            className="!mt-[27px]"
            label="Phone No"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>
                    <AccountBoxIcon />
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
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

        <span className="text-[11px] mt-[18px] text-[#000]">
          Payment Status
        </span>
        <div className="flex flex-row w-[311px] h-[52px] bg-[#F8F8F8] rounded-[19px]">
          <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
            <span className="text-[10px] text-center text-[#000]">
              Total Amount
            </span>
            <span className="text-[10px] text-center text-[#939393]">0.0</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[100px] h-[15px] mt-[20px] ml-[15px]">
            <span className="text-[10px] text-center text-[#000]">
              Advance Payment
            </span>
            <span className="text-[10px] text-center text-[#939393]">0.0</span>
          </div>
          <div className="flex flex-col justify-center items-center w-[80px] h-[15px] mt-[20px] ml-[15px]">
            <span className="text-[10px] text-center text-[#FF0000]">
              Due Amount
            </span>
            <span className="text-[10px] text-center text-[#FF0000]">0.0</span>
          </div>
        </div>

        <span className="text-[11px] mt-[16px] text-[#000]">Measurements</span>
        <MeasurmentTable />
        <div className="w-[311px] h-[58px] rounded-[19px] mt-[7px] bg-[#F8F8F8]">
          <span className="text-[10px] mt-[3px] ml-[12px]">Notes: </span>
        </div>
        <div className="mt-[24px]">
          <Button variant="outlined" size="small">
            Invoice
          </Button>
          <Link href="/home">
            <Button
              className="!bg-primary !ml-[8px]"
              variant="contained"
              size="small"
            >
              Save
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClientDetails;
