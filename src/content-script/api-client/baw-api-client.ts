import { pollAsync } from "../utils/async-utils";
import { webPostAsync } from "../utils/web-utils";
import {
    BawTenantSettings,
    BawTenantSettingsResponse,
    makeBawRequest,
    BawTenantSettingsRequest
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
