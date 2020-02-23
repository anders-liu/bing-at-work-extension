import { AppState, AsyncData } from "./app-state";
import { BrowserTab } from "./data-modules";

export function getTabs(state: AppState): BrowserTab[] | undefined {
    return getAsyncData(state.tabs);
}

export function isTabsLoading(state: AppState): boolean {
    return isAsyncDataLoading(state.tabs);
}

function getAsyncData<T>(dataState: AsyncData<T>): T | undefined {
    return dataState.data;
}

function isAsyncDataLoading<T>(dataState: AsyncData<T>): boolean {
    return dataState.state === "Loading";
}