import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function BudgetDialog(props) {
  const [budget, setBudget] = useState();

  const handleClose = () => {
    props.setDialogState(false);
  };

  const addBudget = () => {
    props.needBudget(budget);
    props.setDialogState(false);
    setBudget("");
  };

  return (
    <div>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Budget"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Budget"
            variant="outlined"
            type="Number"
            value={budget || ""}
            onChange={(e) => setBudget(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={addBudget} autoFocus>
            Add Budget
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
