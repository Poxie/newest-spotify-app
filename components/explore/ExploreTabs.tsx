import ParamTabs from "../param-tabs"

const TABS = ['Songs', 'Artists']
export const ExploreTabs = () => {
    return(
        <ParamTabs 
            defaultActive={TABS[0]}
            tabs={TABS}
        />
    )
}