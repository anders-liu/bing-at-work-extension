import { applyMiddleware, Dispatch, MiddlewareAPI } from "redux";
import {
    AppAction,
    tenantSettingsDoneAction,
    tenantSettingsFailedAction
} from "../store/actions";
import { bawFetchTenantSettingsAsync } from "../api-client/baw-api-client";

async function tenantSettingsStartAsync(dispatch: Dispatch<AppAction>): Promise<void> {
    const result = await bawFetchTenantSettingsAsync();
    if (result) {
        dispatch(tenantSettingsDoneAction(result));
    } else {
        dispatch(tenantSettingsFailedAction());
    }
}

const enhancer = (_store: MiddlewareAPI<Dispatch<AppAction>>) =>
    (next: Dispatch<AppAction>) => (action: AppAction) => {
        switch (action.type) {
            case "TenantSettingsStart": tenantSettingsStartAsync(next); break;
        }
    };

export const bawApiMiddleware = applyMiddleware(enhancer);
