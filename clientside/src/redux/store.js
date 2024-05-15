import { applyMiddleware } from "redux";
import { legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


// const persistConfig = {
//     key: 'root',
//     storage,
//   };
// const persistedReducer= persistReducer(persistConfig,reducer)

export const ReduxStore=legacy_createStore(reducer, applyMiddleware(thunk))

// export const ReduxStore = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// // Create persisted store
// export const persistor = persistStore(ReduxStore);
