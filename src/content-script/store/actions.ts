import { Action } from "redux";
import { BawTenant, BawPerson } from "../api-client/baw-api-models";

export type ActionType
    = "TenantStart"
    | "TenantDone"
    | "TenantFailed"
    | "MeStart"
    | "MeDone"
    | "MeFailed"
    ;

export type AppAction = Action<ActionType>;

export function tenantStartAction(): AppAction {
    return { type: "TenantStart" };
}

export interface TenantDoneAction extends AppAction {
    tenant: BawTenant;
}

export function tenantDoneAction(tenant: BawTenant): TenantDoneAction {
    return { type: "TenantDone", tenant };
}

export function tenantFailedAction(): AppAction {
    return { type: "TenantFailed" };
}

export function meStartAction(): AppAction {
    return { type: "MeStart" };
}

export interface MeDoneAction extends AppAction {
    data: BawPerson;
}

export function meDoneAction(data: BawPerson): MeDoneAction {
    return { type: "MeDone", data };
}

export function meFailedAction(): AppAction {
    return { type: "MeFailed" };
}
