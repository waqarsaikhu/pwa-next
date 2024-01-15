import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "next/link";

import {
  TextField,
  InputAdornment,
  MenuItem,
  Skeleton,
  Button,
} from "@mui/material";
const NewClient = () => {
  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center mb-[20px]">
        <div className="absolute top-0 w-screen  h-[105px] bg-[#F8F8F8] border-b-[1px] rounded-t-[5px] mx-aut0">
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
              New Client
            </span>
          </div>
          <div>
            <span className="absolute right-[30px] flex top-[32px]">
              <MoreVertIcon />
            </span>
          </div>
        </div>
        <div className="flex flex-col md:mt-[175px] mt-[1px] w-[284px] mx-[38px]">
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
          <TextField
            className="!mt-[27px]"
            id="standard-select-gender"
            select
            // label="Select"
            defaultValue="Male"
            helperText="Please select your Gender"
            variant="standard"
          >
            {gender.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="bg-[#F8F8F8] rounded-[19px] w-[314px] h-[172px] flex flex-row mt-[29px]">
          <div className="flex flex-col justify-center items-center ml-[18px] mt-[35px]">
            <span className="text-[10px] text-[#5E8EDA] text-center">
              Set Price
            </span>
            <Skeleton
              sx={{
                borderRadius: "100%",
                backgroundColor: "#D9D9D9",
              }}
              animation={false}
              variant="rectangular"
              width={65}
              height={65}
            />
            <span className="text-[12px] text-[#595959]">Shirt</span>
          </div>
          <div className="flex flex-col justify-center items-center ml-[18px] mt-[35px]">
            <span className="text-[10px] text-[#5E8EDA] text-center">
              Set Price
            </span>
            <Skeleton
              sx={{
                borderRadius: "100%",
                backgroundColor: "#D9D9D9",
              }}
              animation={false}
              variant="rectangular"
              width={65}
              height={65}
            />
            <span className="text-[12px] text-[#595959]">Pants</span>
          </div>
          <div className="flex flex-col justify-center items-center ml-[18px] mt-[35px]">
            <span className="text-[10px] text-[#5E8EDA] text-center">
              Set Price
            </span>
            <Skeleton
              sx={{
                borderRadius: "100%",
                backgroundColor: "#D9D9D9",
              }}
              animation={false}
              variant="rectangular"
              width={65}
              height={65}
            />
            <span className="text-[12px] text-[#595959]">Coats</span>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[34px]">
          <Link href="/client-details">
            <Button className="!bg-black !hover:bg-black !w-[224px] !h-[34px] !text-white">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewClient;
