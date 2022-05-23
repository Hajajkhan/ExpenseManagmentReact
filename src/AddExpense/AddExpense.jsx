import React, { useEffect } from "react";
import { useState } from "react";
import { ExpenseDialog } from "./ExpenseDialog";
import { ExpenseHistory } from "./ExpenseHistory";
import Button from "@mui/material/Button";
import  Box  from "@mui/material/Box";
import ExposureIcon from "@mui/icons-material/Exposure";

export function AddExpense(props) {
  let localstorageData = localStorage.getItem("expense");
  if (localstorageData) {
    localstorageData = JSON.parse(localstorageData);
  } else {
    localstorageData = [];
  }

  const [dialogState, setDialogState] = useState(false);
  const [expenseDetail, setExpenseDetail] = useState(localstorageData);
  const [totalExpense, setTotalExpense] = useState(0);

  const amountSpent = expenseDetail
    .map((x) => x.Amount)
    .reduce((a, b) => a + b, 0);
  const spentBudgetPercentage = Number(
    (amountSpent * 100) / props.budget
  ).toFixed(2);

  /**
   * a dialog will appear on the click od add expense
   */
  const openDialog = () => {
    setDialogState(true);
  };

  /**
   * comming expense detail from dialog that is child component of AddExpense component
   */

  const expenseData = (data) => {
    if (
      data.Name != null &&
      data.Amount &&
      data.Amount <= props.budget - totalExpense
    ) {
      setExpenseDetail([...expenseDetail, data]);
    } else {
      return alert(
        "Enter Expense Detail and Amount must be less than to Your Arrears Amount"
      );
    }
  };

  const deleteExpense = (index) => {
    const filteredData = expenseDetail.filter((item, i) => i !== index);
    return setExpenseDetail(filteredData);
  };

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expenseDetail));

    let expense = expenseDetail.reduce((a, b) => {
      return parseInt(a) + parseInt(b.Amount);
    }, 0);
    setTotalExpense(expense);
    props.arrearsAmount(totalExpense);
  }, [expenseDetail, props, totalExpense]);

  return (
    <div className="expenseMain">
      <Box className="expenseData">
        <Box className="left">
          <h3>Arrears</h3>
          <h4>Rs.{props.budget - totalExpense}</h4>
        </Box>
        <Box className="addExpense">
          <Button variant="outlined" color="error" onClick={openDialog}>
            <ExposureIcon /> Add Expense
          </Button>
        </Box>
        <Box className="right">
          <h3>Total Expense </h3>
          <h4>Rs.{totalExpense}</h4>
        </Box>
      </Box>
      <Box className="historyTag">
        <ExpenseHistory
          expenseDetail={expenseDetail}
          deleteExpense={deleteExpense}
        />
      </Box>
      <ExpenseDialog
        openDialog={dialogState}
        setDialogState={setDialogState}
        expenseData={expenseData}
      />
    </div>
  );
}
