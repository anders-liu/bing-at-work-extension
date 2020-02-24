import { AppAction, TenantSettingsDoneAction } from "./actions";
import { TenantSettingsState, defaultAsyncData } from "./app-state";

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
