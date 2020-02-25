import { BawTenantSettings, BawPerson } from "../api-client/baw-api-models";

export interface AppState {
    tenantSettings: TenantSettingsState;
    me: MeState;
}

export type TenantSettingsState = AsyncData<BawTenantSettings>;
export type MeState = AsyncData<BawPerson>;

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
