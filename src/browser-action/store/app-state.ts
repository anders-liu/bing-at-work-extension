import { BrowserTab } from "./data-modules";

export interface AppState {
    tabs: TabsState
}

export type TabsState = AsyncData<BrowserTab[]>;

export type AsyndState
    = "None"
    | "Loading"
    | "Done"
    | "Failed"
    ;

export interface AsyncData<T> {
    state: AsyndState;
    data?: T;
}

export function defaultAsyncData<T>(): AsyncData<T> {
    return { state: "None" };
}
