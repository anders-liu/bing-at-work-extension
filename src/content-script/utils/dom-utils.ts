import { pollAsync } from "./async-utils";

export async function waitElementAsync(id: string, timeout: number): Promise<HTMLElement | undefined> {
    const action = () => {
        const result = document.getElementById(id);
        return { success: result != null, result };
    };
    const r = await pollAsync(action, { timeout });
    return (r.success && r.result) || undefined;
}
