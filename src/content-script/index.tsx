import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { AppRoot } from "./components/app-root";
import { waitElementAsync } from "./utils/dom-utils";

async function initAsync(): Promise<void> {
    if (!await hasBingElementsAsync()) {
        return;
    }

    renderRoot();
}

async function hasBingElementsAsync(): Promise<boolean> {
    const [header, content] = await Promise.all([
        waitElementAsync("b_header", 2000),
        waitElementAsync("b_content", 2000)
    ]);

    return header != null && content != null;
}

function renderRoot(): void {
    const rootElement = document.createElement("div");
    rootElement.id = "baw-ext-root";

    document.body.insertBefore(
        rootElement,
        document.body.firstElementChild
    );

    ReactDOM.render(
        <AppRoot />,
        rootElement
    );
}

initAsync().then();
