chrome.tabs.query({
    url: [
        "https://www.bing.com/work/search?*",
        "https://www.bing.com/search?*"
    ]
}, tabs => {
    console.log(JSON.stringify(tabs));
});