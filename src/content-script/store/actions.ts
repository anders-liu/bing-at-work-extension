import { Action } from "redux";
import { BawTenantSettings } from "./baw-api-modules";

export type ActionType
    = "TenantSettingsStart"
    | "TenantSettingsDone"
    | "TenantSettingsFailed"
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
