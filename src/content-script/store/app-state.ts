import { BawTenant, BawPerson } from "../api-client/baw-api-models";

export interface AppState {
    tenant: TenantState;
    me: MeState;
}

export type TenantState = AsyncData<BawTenant>;
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
