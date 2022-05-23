import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { ExpenseDialog } from "./ExpenseDialog";
import { Box } from "@mui/material";
import { useState } from "react";

export function ExpenseHistory(props) {
  const [dialogState, setDialogState] = useState(false);

  const deleteExpense = (i) => {
    props.deleteExpense(i);
  };

  return (
    <div className="historyMain">
      <Box className="historyData">
        <h4>Expense History</h4>
      </Box>
      <Box className="table">
        <TableContainer>
          <Table aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell>Expense Name</TableCell>
                <TableCell>Expense</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.expenseDetail.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>
                    <h4>Rs.{row.Amount}</h4>
                  </TableCell>
                  <TableCell>
                    <DeleteForeverSharpIcon
                      onClick={() => deleteExpense(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ExpenseDialog
        openDialog={dialogState}
        setDialogState={setDialogState}
        dialogStateByEdit={dialogState}
      />
    </div>
  );
}
