import { pollAsync } from "../utils/async-utils";
import { webPostAsync } from "../utils/web-utils";
import {
    makeBawRequest,
    BawTenantSettings,
    BawTenantSettingsRequest,
    BawTenantSettingsResponse,
    BawPerson,
    BawSearchResponse,
    makeBawSearchRequest
} from "./baw-api-models";

export async function bawFetchTenantSettingsAsync(): Promise<BawTenantSettings | undefined> {
    // Poll few more times to make sure success or really can't fetch.
    const action = async () => {
        const r = await webPostAsync<BawTenantSettingsResponse>(
            "https://business.bing.com/api/v2/tenant/my/settings",
            makeBawRequest<BawTenantSettingsRequest>({})
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
    const bawResult = r.data && r.data.results && r.data.results[0];
    if (r.ok && bawResult && bawResult.domain === "Person") {
        return bawResult as BawPerson;
    } else {
        return undefined;
    }
}