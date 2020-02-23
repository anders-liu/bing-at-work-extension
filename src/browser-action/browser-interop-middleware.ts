import { applyMiddleware, Dispatch, Middleware, MiddlewareAPI } from "redux";
import { AppAction } from "./store/actions";

function createTab(): void {
    chrome.tabs.create({
        url: "https://www.bing.com/work/search?q=me"
    });
}

const enhancer = (_store: MiddlewareAPI<Dispatch<AppAction>>) =>
    (_next: Dispatch<AppAction>) => (action: AppAction) => {
        switch (action.type) {
            case "CreateTab": createTab(); break;
        }
    };

export const browserInteropMiddleware = applyMiddleware(enhancer);
