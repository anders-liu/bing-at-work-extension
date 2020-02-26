import React from "react";
import { AppHead } from "./app-head";
import { AppBody } from "./app-body";

export const AppContainer: React.FunctionComponent = () => {
    return (
        <>
            <AppHead />
            <AppBody />
        </>
    );
}
