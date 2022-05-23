import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function ExpenseDialog(props) {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState();

  const handleClose = () => {
    props.setDialogState(false);
  };

  const addExpense = () => {
    props.setDialogState(false);
    const expenseObject = {
      Name: expenseName,
      Amount: expenseAmount,
    };
    props.expenseData(expenseObject);
    setExpenseAmount("");
    setExpenseName("");
  };

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Expense"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Expense Name"
            variant="outlined"
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Expense Amount"
            variant="outlined"
            type="Number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addExpense} autoFocus>
            Add Expense
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
