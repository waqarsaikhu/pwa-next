import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const MeasurmentTable = (measurements: any) => {
  return (
    <>
      {" "}
      <div className="w-[311px] text-center flex justify-center font-bold rounded-[19px] bg-[#F8F8F8]">
        <TableContainer
          className="!bg-[#F8F8F8]"
          component={Paper}
          sx={{ maxWidth: 311, overflow: "auto" }}
        >
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ height: "20px" }}>
                <TableCell
                  className="!font-bold"
                  sx={{ borderBottom: "none" }}
                  align="right"
                >
                  Pants
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                "Length",
                "Waist",
                "Hip",
                "Around Leg",
                "Around Knee",
                "Mori",
              ].map((text, index) => (
                <TableRow key={index} sx={{ height: "20px" }}>
                  <TableCell component="th" scope="row">
                    <span className="text-[10px]">{text}</span>
                  </TableCell>
                  <TableCell align="left" sx={{ minHeight: 27 }}>
                    <span className="text-[10px]">0</span>
                  </TableCell>
                  <TableCell align="left" sx={{ minHeight: 27 }}>
                    <span className="text-[10px]">0</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MeasurmentTable;
