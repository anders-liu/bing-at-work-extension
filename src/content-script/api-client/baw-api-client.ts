import { pollAsync } from "../utils/async-utils";
import { webPostAsync } from "../utils/web-utils";
import {
    makeBawRequest,
    BawTenant,
    BawTenantRequest,
    BawTenantResponse,
    BawPerson,
    BawSearchResponse,
    makeBawSearchRequest
} from "./baw-api-models";

export async function bawFetchTenantAsync(): Promise<BawTenant | undefined> {
    // Poll few more times to make sure success or really can't fetch.
    const action = async () => {
        const r = await webPostAsync<BawTenantResponse>(
            "https://business.bing.com/api/v2/tenant/my/settings",
            makeBawRequest<BawTenantRequest>({})
        );
        return { success: r.ok, result: r.data };
    };
    const r = await pollAsync(action, {
        retry: 5, retryInterval: 1000, timeout: 5000
    });
    if (r.success) {
        return r.result!.tenantSettings;
    } else {
        return undefined;
    }
}

export async function bawFetchMeAsync(): Promise<BawPerson | undefined> {
    const r = await webPostAsync<BawSearchResponse>(
        "https://business.bing.com/api/v3/search",
        makeBawSearchRequest("me", "Person")
    );
    const domainResult = r.data && r.data.results && r.data.results[0];
    if (r.ok && domainResult
        && domainResult.domain === "Person"
        && domainResult.results
    ) {
        return domainResult.results[0] as BawPerson;
    } else {
        return undefined;
    }
}