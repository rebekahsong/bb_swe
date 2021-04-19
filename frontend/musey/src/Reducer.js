import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { signupReducer } from "./components/signup/signup-reducer";
import { loginReducer } from "./components/login/login-reducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer
  });

export default createRootReducer;