import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BawTenant, BawPerson } from "../../api-client/baw-api-models";
import { AppState } from "../../store/app-state";
import { getTenant, getMe, isTenantLoading, isMeLoading } from "../../store/selectors";

type StateProps = {
    isLoading: boolean;
    tenant?: BawTenant;
    me?: BawPerson;
}

function mapState(state: AppState): StateProps {
    return {
        isLoading: isTenantLoading(state) || isMeLoading(state),
        tenant: getTenant(state),
        me: getMe(state)
    };
}

type Props = StateProps;

const AppHeadImpl: React.FunctionComponent<Props> = props => {
    const { isLoading, tenant, me } = props;

    const [shouldShowLoading, setShouldShowLoading] = React.useState(false);

    useEffect(() => {
        setTimeout(() => setShouldShowLoading(true), 500);
    }, []);

    if (isLoading) {
        return shouldShowLoading
            ? <AppHeadLoadingPart />
            : null;
    } else if (!tenant) {
        return <AppHeadNoTenantPart />;
    } else if (!me) {
        return <AppHeadNoMePart tenant={tenant} />;
    } else {
        return <AppHeadPart tenant={tenant} me={me} />;
    }
};

const AppHeadLoadingPart: React.FunctionComponent = () => {
    return <div>Loading...</div>;
};

const AppHeadNoTenantPart: React.FunctionComponent = () => {
    return <div>No tenant</div>;
};

const AppHeadNoMePart: React.FunctionComponent<{
    tenant: BawTenant;
}> = props => {
    const { tenant } = props;
    return <div>Hello, {tenant.tenantDisplayName} user!</div>;
};

const AppHeadPart: React.FunctionComponent<{
    tenant: BawTenant;
    me: BawPerson;
}> = props => {
    const { tenant, me } = props;
    return <div>Welcom, {me.fullName} from {tenant.tenantDisplayName}!</div>;
};

export const AppHead = connect(mapState)(AppHeadImpl);
