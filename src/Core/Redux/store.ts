import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";

const configureStore = () => {
  const middleware = [thunk];
  return createStore(rootReducer, applyMiddleware(...middleware));
};

export { configureStore };