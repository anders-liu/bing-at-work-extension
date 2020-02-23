import React from "react";
import { BrowserTab } from "../store/data-modules";

export type TabItemProps = {
    tab: BrowserTab;
    onTabClick: (tab: BrowserTab) => void;
}

export const TabItem: React.FunctionComponent<TabItemProps> = props => {
    const { tab, onTabClick } = props;
    const { title, url } = tab;
    const clickCallback = React.useCallback(() => {
        onTabClick(tab);
    }, [tab, onTabClick]);

    return (
        <div role="botton" className="tab-list-item" onClick={clickCallback}>
            <div className="tab-list-item-title">{title}</div>
            <div className="tab-list-item-desc">{url}</div>
        </div>
    );
}
