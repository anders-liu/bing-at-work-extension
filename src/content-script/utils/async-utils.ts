export async function sleepAsync(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export interface PollResult<T> {
    success: boolean;
    result?: T;
}

export interface PollOptions {
    retry?: number;
    retryInterval?: number;
    timeout?: number;
}

const defaultPollOptions = {
    retry: 100,
    retryInterval: 100,
    timeout: 2000
}

export async function pollAsync<T>(
    action: () => PollResult<T>,
    options?: PollOptions
): Promise<PollResult<T>> {
    const {
        retry, retryInterval, timeout
    } = Object.assign({}, defaultPollOptions, options);

    return await Promise.race([
        pollLoopAsync(action, retry, retryInterval),
        pollTimeoutAsync<T>(timeout)
    ]);
}

async function pollTimeoutAsync<T>(timeout: number): Promise<PollResult<T>> {
    await sleepAsync(timeout);
    return { success: false };
}

async function pollLoopAsync<T>(
    action: () => PollResult<T>,
    retry: number,
    retryInterval: number
): Promise<PollResult<T>> {
    let r: PollResult<T> = action();
    let n = 0;

    while (!r.success && n < retry) {
        n++;
        await sleepAsync(retryInterval);
        r = action();
    }

    return r;
}