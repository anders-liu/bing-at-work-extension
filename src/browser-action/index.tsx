import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { AppRoot } from "./components/app-root";
import { tabsReducer } from "./store/tabs-reducer";
import { AppState } from "./store/app-state";
import { Provider } from "react-redux";

const reducer = combineReducers<AppState>({
    tabs: tabsReducer
});
const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <AppRoot />
    </Provider>,
    document.getElementById("app-root")
);
