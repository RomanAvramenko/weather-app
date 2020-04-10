import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["search", "expand"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: any = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
