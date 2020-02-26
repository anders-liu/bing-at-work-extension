import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction, tenantStartAction } from "../store/actions";
import { AppContainer } from "./container/app-container";
import { AppState } from "../store/app-state";
import { isTenantNotStarted } from "../store/selectors";

type StateProps = {
    isTenantNotStarted: boolean;
}

function mapState(state: AppState): StateProps {
    return {
        isTenantNotStarted: isTenantNotStarted(state)
    };
}

type DispatchProps = {
    loadTenant: () => void;
}

function mapDispatch(dispatch: Dispatch<AppAction>): DispatchProps {
    return {
        loadTenant: () => dispatch(tenantStartAction())
    }
}

type Props = StateProps & DispatchProps;

const AppRootImpl: React.FunctionComponent<Props> = props => {
    const { isTenantNotStarted, loadTenant } = props;

    React.useEffect(() => {
        loadTenant();
    }, []);

    return isTenantNotStarted ? null : (
        <AppContainer />
    );
}

export const AppRoot = connect(mapState, mapDispatch)(AppRootImpl);
