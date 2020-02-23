import { applyMiddleware, Dispatch, MiddlewareAPI } from "redux";
import { AppAction, loadTabsDoneAction, SwitchToTabAction } from "./store/actions";
import { BrowserTab } from "./store/data-modules";

function createTab(): void {
    chrome.tabs.create({
        url: "https://www.bing.com/work/search?q=me"
    });
}

function loadTabs(dispatch: Dispatch<AppAction>): void {
    chrome.tabs.query({
        url: [
            "https://www.bing.com/work/search?*",
            "https://www.bing.com/search?*"
        ]
    }, tabs => {
        dispatch(loadTabsDoneAction(tabs));
    });
}

function switchToTab(tab: BrowserTab): void {
    if (tab && tab.id) {
        chrome.windows.update(tab.windowId, { focused: true });
        chrome.tabs.update(tab.id, { active: true });
    }
}

const enhancer = (_store: MiddlewareAPI<Dispatch<AppAction>>) =>
    (next: Dispatch<AppAction>) => (action: AppAction) => {
        switch (action.type) {
            case "CreateTab": createTab(); break;
            case "LoadTabsStart": loadTabs(next); break;
            case "SwitchToTab": {
                const { tab } = action as SwitchToTabAction;
                switchToTab(tab);
            }
        }
    };

export const browserInteropMiddleware = applyMiddleware(enhancer);
