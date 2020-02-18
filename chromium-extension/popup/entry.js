chrome.tabs.query({
    url: [
        "https://www.bing.com/work/search?*",
        "https://www.bing.com/search?*"
    ]
}, tabs => {
    renderTabList(tabs);
});

function renderTabList(tabs) {
    const root = document.getElementById("root");

    const ul = document.createElement("ul");
    const liOpenNew = document.createElement("li");
    const aOpenNew = document.createElement("a");
    aOpenNew.text = "Open new Bing At Work search page";
    aOpenNew.addEventListener("click", () => {
        chrome.tabs.create({
            url: "https://www.bing.com/work/search?q=me"
        });
    });
    liOpenNew.appendChild(aOpenNew);
    ul.appendChild(liOpenNew);

    for (const tab of tabs) {
        liTab = document.createElement("li");
        const aTab = document.createElement("a");
        aTab.text = `Goto ${tab.title} - ${tab.url}`;
        aTab.addEventListener("click", () => {
            chrome.windows.update(tab.windowId, { focused: true });
            chrome.tabs.update(tab.id, { active: true });
        });
        liTab.appendChild(aTab);
        ul.appendChild(liTab);
    }

    root.appendChild(ul);
}