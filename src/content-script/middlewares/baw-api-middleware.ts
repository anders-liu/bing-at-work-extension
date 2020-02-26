import { applyMiddleware, Dispatch, MiddlewareAPI } from "redux";
import {
    AppAction,
    tenantDoneAction,
    tenantFailedAction,
    meStartAction,
    meDoneAction,
    meFailedAction
} from "../store/actions";
import {
    bawFetchTenantAsync,
    bawFetchMeAsync
} from "../api-client/baw-api-client";

async function tenantStartAsync(dispatch: Dispatch<AppAction>): Promise<void> {
    const result = await bawFetchTenantAsync();
    if (result) {
        dispatch(tenantDoneAction(result));
        dispatch(meStartAction());
    } else {
        dispatch(tenantFailedAction());
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
            case "TenantStart": tenantStartAsync(store.dispatch); break;
            case "MeStart": meStartAsync(store.dispatch); break;
        }
        return result;
    };

export const bawApiMiddleware = applyMiddleware(enhancer);
