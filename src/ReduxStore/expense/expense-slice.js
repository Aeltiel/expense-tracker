import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState: {
    income: 1000,
    expenseList: [],
  },
  //le reducers est là où on créer nos actions. pour la plupart des fonctions
  reducers: {
    //addExpense est le nom de la clé de l'action
    addExpense: (currentSlice, action) => {
      currentSlice.expenseList.push({
        ...action.payload,
        price: Number.parseFloat(action.payload.price),
      });
    },
    setIncome: (currentSlice, action) => {
      currentSlice.income = Number.parseFloat(action.payload);
    },
  },
});

//permet d'enregristrer l'action avant de l'exporter
const { addExpense, setIncome } = expenseSlice.actions;

export { addExpense, setIncome };
