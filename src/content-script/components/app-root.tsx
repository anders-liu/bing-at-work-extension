import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction, tenantSettingsStartAction } from "../store/actions";

type DispatchProps = {
    loadTenantSettings: () => void;
}

function mapDispatch(dispatch: Dispatch<AppAction>): DispatchProps {
    return {
        loadTenantSettings: () => dispatch(tenantSettingsStartAction())
    }
}

type Props = DispatchProps;

const AppRootImpl: React.FunctionComponent<Props> = props => {
    const { loadTenantSettings } = props;

    React.useEffect(() => {
        loadTenantSettings();
    }, []);

    return (
        <>
            <div>Hi there, BAW!</div>
        </>
    );
}

export const AppRoot = connect(null, mapDispatch)(AppRootImpl);
