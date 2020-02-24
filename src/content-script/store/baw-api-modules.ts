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
