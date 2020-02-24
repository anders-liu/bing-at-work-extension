export interface WebResult<T> {
    ok: boolean;
    statusCode?: number;
    exception?: any;
    data?: T;
}

export async function webGetAsync<T>(url: string): Promise<WebResult<T>> {
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const { ok, status: statusCode } = response;

        if (ok) {
            const data = await response.json();
            return { ok, statusCode, data };
        } else {
            return { ok, statusCode };
        }
    } catch (exception) {
        return { ok: false, exception };
    }
}
