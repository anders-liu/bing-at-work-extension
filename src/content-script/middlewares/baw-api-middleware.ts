import { applyMiddleware, Dispatch, MiddlewareAPI } from "redux";
import {
    AppAction,
    tenantSettingsDoneAction,
    tenantSettingsFailedAction,
    meStartAction,
    meDoneAction,
    meFailedAction
} from "../store/actions";
import {
    bawFetchTenantSettingsAsync,
    bawFetchMeAsync
} from "../api-client/baw-api-client";

async function tenantSettingsStartAsync(dispatch: Dispatch<AppAction>): Promise<void> {
    const result = await bawFetchTenantSettingsAsync();
    if (result) {
        dispatch(tenantSettingsDoneAction(result));
        dispatch(meStartAction());
    } else {
        dispatch(tenantSettingsFailedAction());
    }
}

async function meStartAsync(dispatch: Dispatch<AppAction>): Promise<void> {
    const result = await bawFetchMeAsync();
    if (result) {
        dispatch(meDoneAction(result));
    } else {
        dispatch(meFailedAction());
    }
}

const enhancer = (store: MiddlewareAPI<Dispatch<AppAction>>) =>
    (next: Dispatch<AppAction>) => (action: AppAction) => {
        const result = next(action);
        switch (action.type) {
            case "TenantSettingsStart": tenantSettingsStartAsync(store.dispatch); break;
            case "MeStart": meStartAsync(store.dispatch); break;
        }
        return result;
    };

export const bawApiMiddleware = applyMiddleware(enhancer);
