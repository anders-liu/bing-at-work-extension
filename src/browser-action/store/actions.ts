import { Action } from "redux";
import { BrowserTab } from "./data-modules";

export type ActionType
    = "LoadTabsStart"
    | "LoadTabsDone"
    | "LoadTabsFailed"
    | "CreateTab"
    | "SwitchToTab"
    ;

export type AppAction = Action<ActionType>;

export function loadTabsStartAction(): AppAction {
    return { type: "LoadTabsStart" };
}

export interface LoadTabsDoneAction extends AppAction {
    tabs: BrowserTab[]
}

export function loadTabsDoneAction(tabs: BrowserTab[]): LoadTabsDoneAction {
    return { type: "LoadTabsDone", tabs };
}

export function loadTabsFailedAction(): AppAction {
    return { type: "LoadTabsFailed" };
}

export function createTabAction(): AppAction {
    return { type: "CreateTab" };
}

export interface SwitchToTabAction extends AppAction {
    tab: BrowserTab;
}

export function switchToTabAction(tab: BrowserTab): SwitchToTabAction {
    return { type: "SwitchToTab", tab };
}
