import {
    BawTenantSettings,
    BawTenantSettingsResponse
} from "../store/baw-api-modules";
import { pollAsync, sleepAsync } from "../utils/async-utils";
import { webGetAsync } from "../utils/web-utils";

export async function bawFetchTenantSettingsAsync(): Promise<BawTenantSettings | undefined> {
    await sleepAsync(2000);

    // Poll few more times to make sure success or really can't fetch.
    const action = async () => {
        const r = await webGetAsync<BawTenantSettingsResponse>(
            "https://business.bing.com/api/v2/tenant/my/settings"
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
