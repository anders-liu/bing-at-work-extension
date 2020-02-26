import {
    AppAction,
    TenantDoneAction,
    MeDoneAction
} from "./actions";
import {
    TenantState,
    MeState,
    defaultAsyncData
} from "./app-state";

export function tenantReducer(
    state: TenantState | undefined, action: AppAction
): TenantState {
    switch (action.type) {
        case "TenantStart": return { state: "Loading" };
        case "TenantDone": {
            const { tenant: data } = action as TenantDoneAction;
            return { state: "Done", data };
        }
        case "TenantFailed": {
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
