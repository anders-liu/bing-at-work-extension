import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store, combineReducers, createStore } from "redux";
import { AppRoot } from "./components/app-root";
import { bawApiMiddleware } from "./middlewares/baw-api-middleware";
import { AppState } from "./store/app-state";
import { AppAction } from "./store/actions";
import { tenantReducer, meReducer } from "./store/baw-api-reducers";
import { waitElementAsync } from "./utils/dom-utils";

declare var window: Window & {
    bawext: any;
};

window.bawext = window.bawext || {};

async function initAsync(): Promise<void> {
    if (!await hasBingElementsAsync()) {
        return;
    }

    const store = createAppStore();
    renderRoot(store);
}

async function hasBingElementsAsync(): Promise<boolean> {
    const [header, content] = await Promise.all([
        waitElementAsync("b_header", 2000),
        waitElementAsync("b_content", 2000)
    ]);

    return header != null && content != null;
}

function createAppStore(): Store<AppState, AppAction> {
    const reducer = combineReducers<AppState>({
        tenant: tenantReducer,
        me: meReducer
    });
    const store = createStore(reducer, bawApiMiddleware);
    window.bawext.store = store;
    return store;
}

function renderRoot(store: Store<AppState, AppAction>): void {
    const rootElement = document.createElement("div");
    rootElement.id = "baw-ext-root";

    document.body.insertBefore(
        rootElement,
        document.body.firstElementChild
    );

    ReactDOM.render(
        <Provider store={store}>
            <AppRoot />
        </Provider>,
        rootElement
    );
}

initAsync().then();
