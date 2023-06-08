// import { createContext, useState, useLayoutEffect, useEffect, useReducer } from 'react';

// export const TransactionContext = createContext();

// const initialState = {
//     wallet: []
// };

// const ADD_TRANSACTION = "ADD_TRANSACTION";
// const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";

// const reducer = (state, action) => {
//     switch (action.type) {
//         case ADD_TRANSACTION:
//             const new_trans = {
//                 id: toString(Date.now()),
//                 amount: action.payload.amount,
//                 description: action.payload.description,
//                 startDate: action.payload.startDate,
//                 idCategory: action.payload.idCategory,
//                 idWallet: action.payload.idWallet
//             }
//             return {
//                 wallet: [
//                     ...state.wallet,
//                     new_trans
//                 ]
//             };
//         case REMOVE_TRANSACTION: {
//             const filteredTrans = state.wallet.filter(
//                 (trans) => trans.id !== action.payload.id
//             );
//             return { wallet: filteredTrans };
//         }
//         default:
//             return state;
//     }
// };


// export const TransProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const addTrans = (id, amount, description, startDate, idCategory, idWallet) => {
//         dispatch({
//             type: ADD_TRANSACTION, payload: {
//                 id: id,
//                 amount: amount,
//                 description: description,
//                 startDate: startDate,
//                 idCategory: idCategory,
//                 idWallet: idWallet
//             }
//         });
//     }

//     const removeTrans = (transItemId) => {
//         dispatch({
//             type: REMOVE_TRANSACTION, payload: {
//                 id: transItemId
//             }
//         });
//     }

//     const value = {
//         wallet: state.wallet,
//         addTrans,
//         removeTrans
//     }

//     return (
//         <TransactionContext.Provider value={value}>
//             {children}
//         </TransactionContext.Provider>
//     );
// };
