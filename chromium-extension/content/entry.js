console.log(`BAW.EXT: ${"content/entry.js"} loaded`);

async function timeoutAsync(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getRootAsync() {
    const getRoot = () => document.getElementById("b_content");

    let retry = 200;
    let root = getRoot();
    while (!root && retry > 0) {
        await timeoutAsync(20);
        root = getRoot();
        retry--;
    }

    return root ? Promise.resolve(root) : Promise.reject(
        { where: "getRootAsync", reason: "TIME_OUT" }
    );
}

async function ajaxGetAsync(url) {
    const response = await fetch(url, {
        method: "GET",
        credentials: "include"
    });

    if (response.ok) {
        return response.json();
    } else {
        return undefined;
    }
}

async function entryAsync() {
    try {
        const root = await getRootAsync();
        console.log(root);

        const settings = await ajaxGetAsync("https://business.bing.com/api/v2/tenant/my/settings");
        console.log(settings);
    } catch(ex) {
        console.log(ex);
    }
}

entryAsync().then();
