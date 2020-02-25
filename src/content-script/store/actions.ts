import { Action } from "redux";
import { BawTenantSettings, BawPerson } from "../api-client/baw-api-models";

export type ActionType
    = "TenantSettingsStart"
    | "TenantSettingsDone"
    | "TenantSettingsFailed"
    | "MeStart"
    | "MeDone"
    | "MeFailed"
    ;

export type AppAction = Action<ActionType>;

export function tenantSettingsStartAction(): AppAction {
    return { type: "TenantSettingsStart" };
}

export interface TenantSettingsDoneAction extends AppAction {
    tenantSettings: BawTenantSettings;
}

export function tenantSettingsDoneAction(tenantSettings: BawTenantSettings): TenantSettingsDoneAction {
    return { type: "TenantSettingsDone", tenantSettings };
}

export function tenantSettingsFailedAction(): AppAction {
    return { type: "TenantSettingsFailed" };
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
