import React from "react";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { BudgetDialog } from "./BudgetDialog";
import { AddExpense } from "../AddExpense/AddExpense";

export function AddBudget() {
  let localStorageValue = localStorage.getItem("budget");
  if (localStorageValue) {
    localStorageValue = JSON.parse(localStorageValue);
  } else {
    localStorageValue = 0;
  }

  const [dialogState, setDialogState] = useState(false);
  const [progress, setProgress] = useState(0);
  const [budget, setBudget] = useState(localStorageValue);

  /**
   * on the click of add budget A dialog will appear by this function in which we have passing props to child.
   */
  const openDialog = () => {
    setDialogState(true);
  };

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const needBudget = (b) => {
    setBudget(b);
  };

  const arrearsAmount = (data) => {
    let progressorValue = ((budget - data) / budget) * 100;
    setProgress(progressorValue);
  };

  return (
    <div className="budgetMain">
      <Box className="budgetData">
        <h4>Expense Management App</h4>
        <Box className="balanceDiv">
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress variant="determinate" value={progress} />
            <Box
              sx={{
                top: 10,
                left: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {`${Math.round(progress)}%`}
              </Typography>
            </Box>
          </Box>
          <Box className="add">
            <Icon sx={{ fontSize: 20 }} onClick={openDialog} title="Add Budget">
              add_circle
            </Icon>
            <h3>Rs.{budget}</h3>
          </Box>
        </Box>
      </Box>

      <Box className="expenseSectiion">
        <AddExpense budget={budget} arrearsAmount={arrearsAmount} />
        <BudgetDialog
          openDialog={dialogState}
          setDialogState={setDialogState}
          needBudget={needBudget}
        />
      </Box>
    </div>
  );
}
