// import PRODUCTS from '../../data/dummy-data';
// import { createSlice } from '@reduxjs/toolkit';
// import Product from '../../models/product'
// export const initialState = {
//     transactions: []
//   };
  
//   const transSlice = createSlice({
//     name: 'transaction',
//     initialState,
//     reducers: {
//       addTransaction(state,action) {
//         const trans = {}
//         trans.id = action.payload.id;
//         trans.amount = action.payload.amount;
//         trans.idCategory = action.payload.idCategory;
//         trans.description = action.payload.description;
//         trans.date = action.payload.date;
//         trans.idWallet = action.payload.idWallet;
//         state.transactions.concat(trans)
//       }
//     }
//   })
  
//   export const { addTransaction } = transSlice.actions
//   export default transSlice.reducer