import { BawTenantSettings } from "./baw-api-modules";

export interface AppState {
    tenantSettings: TenantSettingsState;
}

export type TenantSettingsState = AsyncData<BawTenantSettings>;

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
