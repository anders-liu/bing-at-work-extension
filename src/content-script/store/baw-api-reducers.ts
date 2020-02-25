import {
    AppAction,
    TenantSettingsDoneAction,
    MeDoneAction
} from "./actions";
import {
    TenantSettingsState,
    MeState,
    defaultAsyncData
} from "./app-state";

export function tenantSettingsReducer(
    state: TenantSettingsState | undefined, action: AppAction
): TenantSettingsState {
    switch (action.type) {
        case "TenantSettingsStart": return { state: "Loading" };
        case "TenantSettingsDone": {
            const { tenantSettings: data } = action as TenantSettingsDoneAction;
            return { state: "Done", data };
        }
        case "TenantSettingsFailed": {
            return { state: "Failed" };
        }
        default: return state || defaultAsyncData();
    }
}

export function meReducer(
    state: MeState | undefined, action: AppAction
): MeState {
    switch (action.type) {
        case "MeStart": return { state: "Loading" };
        case "MeDone": {
            const { data } = action as MeDoneAction;
            return { state: "Done", data };
        }
        case "MeFailed": {
            return { state: "Failed" };
        }
        default: return state || defaultAsyncData();
    }
}
