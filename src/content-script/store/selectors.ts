import { AppState, AsyncData } from "./app-state";
import { BawTenant, BawPerson } from "../api-client/baw-api-models";

export function getTenant(state: AppState): BawTenant | undefined {
    return state.tenant.data;
}

export function isTenantNotStarted(state: AppState): boolean {
    return notStarted(state.tenant);
}

export function isTenantLoading(state: AppState): boolean {
    return isLoading(state.tenant);
}

export function getMe(state: AppState): BawPerson | undefined {
    return state.me.data;
}

export function isMeLoading(state: AppState): boolean {
    return isLoading(state.me);
}

function notStarted<T>(data: AsyncData<T>): boolean {
    return data.state === "None";
}

function isLoading<T>(data: AsyncData<T>): boolean {
    return data.state === "Loading";
}