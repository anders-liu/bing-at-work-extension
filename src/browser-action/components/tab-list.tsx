import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction, createTabAction, switchToTabAction } from "../store/actions";
import { BrowserTab } from "../store/data-modules";
import { AppState } from "../store/app-state";
import { getTabs, isTabsLoading } from "../store/selectors";
import { TabItems } from "./tab-items";

type ConnectedProps = {
    tabs?: BrowserTab[];
    isTabsLoading: boolean;
}

function mapState(state: AppState): ConnectedProps {
    return {
        tabs: getTabs(state),
        isTabsLoading: isTabsLoading(state)
    };
}

type DispatchProps = {
    createTab: () => void;
    switchToTab: (tab: BrowserTab) => void;
}

function mapDispatch(dispatch: Dispatch<AppAction>): DispatchProps {
    return {
        createTab: () => dispatch(createTabAction()),
        switchToTab: (tab: BrowserTab) => dispatch(switchToTabAction(tab))
    };
}

type Props = ConnectedProps & DispatchProps;

const TabListImpl: React.FunctionComponent<Props> = props => {
    const { tabs, isTabsLoading, createTab, switchToTab } = props;

    const tabItemsPart = tabs && (
        <TabItems tabs={tabs} onTabClick={switchToTab} />
    );
    const loadingPart = isTabsLoading && (
        <div>loading...</div>
    );

    return (
        <div>
            <div>
                <div onClick={createTab}>Create new tab</div>
            </div>
            {tabItemsPart}
            {loadingPart}
        </div>
    );
}

export const TabList = connect(mapState, mapDispatch)(TabListImpl);
