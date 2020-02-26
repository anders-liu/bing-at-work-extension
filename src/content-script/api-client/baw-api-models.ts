export interface BawRequestBase {
    // Indicates this request is from this browser extension.
    "$baw-ext": true;
}

export function makeBawRequest<T extends BawRequestBase>(
    request: Omit<T, "$baw-ext">
): T {
    return Object.assign({ "$baw-ext": true }, request) as T;
}

export interface BawTenantRequest extends BawRequestBase {
}

export interface BawTenantResponse {
    tenantSettings: BawTenant;
}

export interface BawSearchRequest extends BawRequestBase {
    query: string;
    clientContext: BawClientContext;
    requestContext: BawRequestContext;
}

export function makeBawSearchRequest(
    query: string, intent?: BawDomain
): BawSearchRequest {
    return makeBawRequest<BawSearchRequest>({
        query,
        clientContext: {
            clientType: "Bing",
            timeZoneOffsetInMinutes: -new Date().getTimezoneOffset()
        },
        requestContext: {
            clientSize: "Large",
            queryIntent: intent
        }
    });
}

export interface BawSearchResponse {
    results?: BawDomainResult[];
}

export type BawDomain
    = "None"
    | "Person"
    | "Bookmark"
    ;

export interface BawClientContext {
    clientType: "Bing";
    timeZoneOffsetInMinutes: number;
}

export interface BawRequestContext {
    clientSize: "Large",
    queryIntent?: BawDomain;
}

export interface BawTenant {
    tenantObjectId: string;
    tenantId: string;
    tenantDisplayName: string;
    iconLarge?: string;
    iconLargeChecksum?: string;
    theme: string;
}

export interface BawDomainResult {
    domain: BawDomain;
    results: BawResult[];
}

export interface BawResult {
    domain: BawDomain;
    id: string;
}

export interface BawPerson extends BawResult {
    userPrincipalName: string;
    fullName: string;
    email: string;
    alias: string;
    department: string;
    jobTitle: string;
    officeLocation: string;
    phoneNumbers: string[];
}
