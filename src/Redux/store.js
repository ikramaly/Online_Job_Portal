// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";
// import jobSlice from "./jobSlice";
// // import userSlice from "../Redux/userSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'
// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// }

// const rootReducer = combineReducers({
//   user:userSlice,
//   job:jobSlice
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)
// // import jobSlice from "./jobSlice";
// export const store = configureStore({
//    reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// import storage from "redux-persist/lib/storage"; // ✅ correct
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

// ✅ persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ✅ combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  job: jobSlice,
  company:companySlice,
  application:applicationSlice,
});

// ✅ wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ IMPORTANT (you missed this)
export const persistor = persistStore(store);