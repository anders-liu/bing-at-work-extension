import React from "react";

export const AppHead: React.FunctionComponent = () => {
    // Status:
    // 1) Not a valid tenant, show BAW upsell.
    // 2) Valid tenant, not signed in, show tenant logo, promopt to sign in.
    // 3) Valid tenant, signed in, show tenant info, show user info.
    return <div id="baw-ext-head">Hi #baw-ext-head</div>;
};
