import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import word from "./modules/word";

// 적용할 미드웨어 모음
const middlewares = [thunk];
// 리듀서모음
const rootReducer = combineReducers({ word });
// 리듀서 말고 옵셔널하게 만드는 애들의 모음
const enhancer = applyMiddleware(...middlewares);

// 리듀서를 모아서 스토어를 만들어줌
const store = createStore(rootReducer, enhancer);

export default store;

// 컴포넌트에 주입을 해줘여함
