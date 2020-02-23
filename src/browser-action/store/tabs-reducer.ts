import { TabsState, defaultAsyncData } from "./app-state";
import { AppAction, LoadTabsDoneAction } from "./actions";

export function tabsReducer(state: TabsState | undefined, action: AppAction): TabsState {
    switch (action.type) {
        case "LoadTabsStart": return { state: "Loading" };
        case "LoadTabsDone": {
            const { tabs: data } = action as LoadTabsDoneAction;
            return { state: "Done", data };
        }
        default: return state || defaultAsyncData();
    }
}
