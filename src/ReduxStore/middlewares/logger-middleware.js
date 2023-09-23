import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addExpense, setIncome } from "ReduxStore/expense/expense-slice";
export const loggerMiddleware = createListenerMiddleware();

loggerMiddleware.startListening({
  //sert à indiquer quelles actions ont veut écouter
  /*predicate: (action) => {
    return action.type === "expenseSlice/addExpense";
  }*/
  //façon plus concise d'écrire le predicate, surtout si on veux écouter beaucoup d'action
  //Ne pas oublier d'importer les fonctions que l'on veut écouter
  matcher: isAnyOf(addExpense, setIncome),
  //ce qu'on veut faire de notre écoute
  effect: async (action, listnerAPI) => {
    console.log(action);
    console.log(listnerAPI.getState()); //getState permet de récupérer tous le store
  },
});
