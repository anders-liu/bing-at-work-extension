export interface BawRequestBase {
    // Indicates this request is from this browser extension.
    "$baw-ext": true;
}

export function makeBawRequest<T extends BawRequestBase>(
    request: Omit<T, "$baw-ext">
): T {
    return Object.assign({ "$baw-ext": true }, request) as T;
}

export interface BawTenantSettingsRequest extends BawRequestBase {
}

export interface BawTenantSettings {
    tenantObjectId: string;
    tenantId: string;
    tenantDisplayName: string;
    iconLarge?: string;
    iconLargeChecksum?: string;
    theme: string;
}

export interface BawTenantSettingsResponse {
    tenantSettings: BawTenantSettings;
}
