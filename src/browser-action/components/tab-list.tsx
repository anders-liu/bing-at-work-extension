import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    AppAction,
    createTabAction,
    switchToTabAction,
    loadTabsStartAction
} from "../store/actions";
import { AppState } from "../store/app-state";
import { BrowserTab } from "../store/data-modules";
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
    loadTabs: () => void;
    createTab: () => void;
    switchToTab: (tab: BrowserTab) => void;
}

function mapDispatch(dispatch: Dispatch<AppAction>): DispatchProps {
    return {
        loadTabs: () => dispatch(loadTabsStartAction()),
        createTab: () => dispatch(createTabAction()),
        switchToTab: (tab: BrowserTab) => dispatch(switchToTabAction(tab))
    };
}

type Props = ConnectedProps & DispatchProps;

const TabListImpl: React.FunctionComponent<Props> = props => {
    const { tabs, isTabsLoading, loadTabs, createTab, switchToTab } = props;

    const tabItemsPart = tabs && (
        <TabItems tabs={tabs} onTabClick={switchToTab} />
    );
    const loadingPart = isTabsLoading && (
        <div>loading...</div>
    );

    React.useEffect(() => {
        loadTabs();
    }, []);

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
