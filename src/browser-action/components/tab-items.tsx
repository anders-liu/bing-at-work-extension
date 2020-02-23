import React from "react";
import { BrowserTab } from "../store/data-modules";
import { TabItem } from "./tab-item";

type Props = {
    tabs: BrowserTab[];
    onTabClick: (tab: BrowserTab) => void;
}

export const TabItems: React.FunctionComponent<Props> = props => {
    const { tabs, onTabClick } = props;

    return (
        <>
            {tabs.map(tab => <TabItem tab={tab} onTabClick={onTabClick} />)}
        </>
    );
}
