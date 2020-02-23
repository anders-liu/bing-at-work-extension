import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { browserInteropMiddleware } from "./browser-interop-middleware";
import { AppRoot } from "./components/app-root";
import { tabsReducer } from "./store/tabs-reducer";
import { AppState } from "./store/app-state";
import "./styles/index.scss";

const reducer = combineReducers<AppState>({
    tabs: tabsReducer
});
const store = createStore(reducer, browserInteropMiddleware);

ReactDOM.render(
    <Provider store={store}>
        <AppRoot />
    </Provider>,
    document.getElementById("app-root")
);
