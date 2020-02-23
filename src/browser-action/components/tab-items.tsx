import _ from "lodash";
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
            {_.map(tabs, (tab, i) => (
                <TabItem key={i} tab={tab} onTabClick={onTabClick} />
            ))}
        </>
    );
}
