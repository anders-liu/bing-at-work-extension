export interface WebResult<T> {
    ok: boolean;
    statusCode?: number;
    exception?: any;
    data?: T;
}

export async function webPostAsync<T>(url: string, requestBody?: any): Promise<WebResult<T>> {
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            body: requestBody ? JSON.stringify(requestBody) : ""
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
